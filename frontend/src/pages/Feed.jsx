import React, { useEffect, useState } from "react";

export default function Feed(){
  const [posts,setPosts]=useState([]);
  const [text,setText]=useState("");

  useEffect(()=>{ fetch("/api/feed").then(r=>r.json()).then(setPosts)},[]);

  async function publicar(){
    const res = await fetch("/api/feed",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ authorId: 1, text })
    });
    await res.json();
    // Atualiza lista
    setPosts([{authorId: 1, text, createdAt: new Date().toISOString()}, ...posts]);
    setText("");
  }

  return (
    <div>
      <h2>Feed</h2>
      <input value={text} onChange={e=>setText(e.target.value)} placeholder="Escreva algo..." />
      <button onClick={publicar}>Publicar</button>
      {posts.map((p,i)=>(
        <div key={i}>
          <strong>Autor #{p.authorId}</strong>: {p.text}
        </div>
      ))}
    </div>
  );
}
