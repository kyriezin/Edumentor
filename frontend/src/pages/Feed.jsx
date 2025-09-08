import { useEffect, useState } from "react";

export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3333/api/feed")
      .then((res) => res.json())
      .then(setPosts);
  }, []);

  return (
    <div>
      <h2>Feed de Dicas</h2>
      <ul>
        {posts.map((p) => (
          <li key={p.id}><strong>{p.title}</strong>: {p.content}</li>
        ))}
      </ul>
    </div>
  );
}
