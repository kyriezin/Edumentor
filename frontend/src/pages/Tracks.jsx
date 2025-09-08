import { useEffect, useState } from "react";

export default function Tracks() {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3333/api/tracks")
      .then((res) => res.json())
      .then(setTracks);
  }, []);

  return (
    <div>
      <h2>Trilhas de Estudo</h2>
      <ul>
        {tracks.map((t) => (
          <li key={t.id}><strong>{t.title}</strong> - {t.description}</li>
        ))}
      </ul>
    </div>
  );
}
