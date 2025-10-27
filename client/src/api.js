const API_URL = process.env.REACT_APP_API_URL;

export function getRecommendations(data) {
  return fetch(`${API_URL}/api/recommend`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(res => res.json());
}