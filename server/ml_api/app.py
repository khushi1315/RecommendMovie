from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from zipfile import ZipFile
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from pathlib import Path

app = Flask(__name__)
CORS(app)

# ===== DEMO USER DB =====
users_db = {}

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    if not email or not password:
        return jsonify({"success": False, "error": "Email and password required"})
    if email in users_db:
        return jsonify({"success": False, "error": "User already exists"})
    users_db[email] = password
    return jsonify({"success": True})

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    if not email or not password:
        return jsonify({"success": False, "error": "Email and password required"})
    if users_db.get(email) != password:
        return jsonify({"success": False, "error": "Invalid credentials"})
    return jsonify({"success": True})

# ==== MOVIELENS PREP (as before) ====
movielens_data_file_url = (
    "http://files.grouplens.org/datasets/movielens/ml-latest-small.zip"
)

movielens_zipped_file = keras.utils.get_file(
    "ml-latest-small.zip", movielens_data_file_url, extract=False
)

keras_datasets_path = Path(movielens_zipped_file).parents[0]
movielens_dir = keras_datasets_path / "ml-latest-small"
if not movielens_dir.exists():
    with ZipFile(movielens_zipped_file, "r") as zip:
        print("Extracting all files...")
        zip.extractall(path=keras_datasets_path)
        print("Done!")

ratings_file = movielens_dir / "ratings.csv"
tags_file = movielens_dir / "tags.csv"
movies_file = movielens_dir / "movies.csv"

df = pd.read_csv(ratings_file)
tags = pd.read_csv(tags_file)
movies = pd.read_csv(movies_file)

user_ids = df["userId"].unique().tolist()
user2user_encoded = {x: i for i, x in enumerate(user_ids)}
userencoded2user = {i: x for i, x in enumerate(user_ids)}
movie_ids = df["movieId"].unique().tolist()
movie2movie_encoded = {x: i for i, x in enumerate(movie_ids)}
movie_encoded2movie = {i: x for i, x in enumerate(movie_ids)}

df["user"] = df["userId"].map(user2user_encoded)
df["movie"] = df["movieId"].map(movie2movie_encoded)
num_users = len(user2user_encoded)
num_movies = len(movie_encoded2movie)
df['rating'] = df['rating'].values.astype(np.float32)

min_rating = min(df["rating"])
max_rating = max(df["rating"])

movies_df = pd.read_csv(movielens_dir / 'movies.csv')

# ==== Subclassed Model: MUST include config methods ====
class RecommenderNet(keras.Model):
    def __init__(self, num_users, num_movies, embedding_size, **kwargs):
        super().__init__(**kwargs)
        self.num_users = num_users
        self.num_movies = num_movies
        self.embedding_size = embedding_size
        self.user_embedding = layers.Embedding(
            num_users,
            embedding_size,
            embeddings_initializer="he_normal",
            embeddings_regularizer=keras.regularizers.l2(1e-6),
        )
        self.user_bias = layers.Embedding(num_users, 1)
        self.movie_embedding = layers.Embedding(
            num_movies,
            embedding_size,
            embeddings_initializer="he_normal",
            embeddings_regularizer=keras.regularizers.l2(1e-6)
        )
        self.movie_bias = layers.Embedding(num_movies, 1)

    def call(self, inputs):
        user_vector = self.user_embedding(inputs[:, 0])
        user_bias = self.user_bias(inputs[:, 0])
        movie_vector = self.movie_embedding(inputs[:, 1])
        movie_bias = self.movie_bias(inputs[:, 1])
        dot_user_movie = tf.tensordot(user_vector, movie_vector, 2)
        x = dot_user_movie + user_bias + movie_bias
        return tf.nn.sigmoid(x)

    def get_config(self):
        config = super().get_config()
        config.update({
            "num_users": self.num_users,
            "num_movies": self.num_movies,
            "embedding_size": self.embedding_size
        })
        return config

    @classmethod
    def from_config(cls, config):
        return cls(**config)

# ==== Load Pretrained Model ====
model = RecommenderNet(num_users, num_movies, embedding_size=50)
model.load_weights("my_model.weights.h5")


def get_recommendations(user_id):
    movies_watched_by_user = df[df.userId == user_id]
    movies_not_watched = movies_df[~movies_df['movieId'].isin(movies_watched_by_user.movieId.values)]['movieId']
    movies_not_watched = list(set(movies_not_watched).intersection(set(movie2movie_encoded.keys())))
    movies_not_watched = [[movie2movie_encoded.get(x)] for x in movies_not_watched]
    user_encoder = user2user_encoded.get(user_id)
    user_movie_array = np.hstack(
        ([[user_encoder]] * len(movies_not_watched), movies_not_watched)
    )
    ratings = model.predict(user_movie_array).flatten()
    top_ratings_indices = ratings.argsort()[-10:][::-1]
    recommended_movie_ids = [
        movie_encoded2movie.get(movies_not_watched[x][0]) for x in top_ratings_indices
    ]
    recommended_movies = movies_df[movies_df["movieId"].isin(recommended_movie_ids)]
    return recommended_movies

@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.json
    use_ml = data.get("use_ml", False)
    if use_ml:
        user_id = 1  # or dynamically assign as needed
        recommended_movies = get_recommendations(user_id)
        result = [
            {"title": row["title"], "genres": row["genres"], "movieId": int(row["movieId"])}
            for _, row in recommended_movies.iterrows()
        ]
        return jsonify({"recommendations": result})

    fav_genre = data.get("genre")
    fav_year = data.get("year")
    fav_movie = data.get("favMovie")
    filtered = movies

    if fav_genre and isinstance(fav_genre, str) and fav_genre.strip():
        filtered = filtered[filtered["genres"].str.contains(fav_genre, case=False, na=False)]

    found_matches = True

    if fav_year and isinstance(fav_year, str) and fav_year.strip():
        year_mask = filtered["title"].str.contains(str(fav_year), na=False)
        if year_mask.sum() == 0:
            all_years = (
                filtered["title"]
                .str.extract(r".*\((\d{4})\).*")[0]
                .dropna()
                .astype(int)
            )
            input_year = int(fav_year)
            nearest_past_years = all_years[all_years < input_year]
            if not nearest_past_years.empty:
                nearest_year = nearest_past_years.max()
                filtered = filtered[filtered["title"].str.contains(str(nearest_year), na=False)]
                found_matches = False
                msg = (
                    f"No movies found for {fav_year}. Showing closest results from {nearest_year}."
                )
            else:
                filtered = filtered
                found_matches = False
                msg = "No movies found for this or earlier years."
        else:
            filtered = filtered[year_mask]
            msg = None
    else:
        msg = None

    result = filtered.head(10)[["title", "genres", "movieId"]].to_dict("records")
    response = {
        "recommendations": result,
    }
    if not found_matches:
        response["message"] = msg
    return jsonify(response)

if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=False, host="0.0.0.0", port=port)
