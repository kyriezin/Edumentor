import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Mentors() {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3333/api/mentors")
      .then((res) => res.json())
      .then(setMentors);
  }, []);

  return (
    <div>
      <h2>Mentores Disponíveis</h2>
      <ul>
        {mentors.map((m) => (
          <li key={m.id}>
            <Link to={`/mentors/${m.id}`}>{m.name}</Link> - {m.expertise} ⭐{m.rating}
          </li>
        ))}
      </ul>
    </div>
  );
}
