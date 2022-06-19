export function fetchList() {
  return fetch("http://localhost:8000/list").then((res) => res.json());
}

export function fetchOne({ id }) {
  return fetch(`http://localhost:8000/edit/${id}`).then((res) => res.json());
}
