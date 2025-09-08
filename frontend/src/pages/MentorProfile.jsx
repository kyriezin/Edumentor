import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MentorProfile() {
  const { id } = useParams();
  const [mentor, setMentor] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3333/api/mentors/${id}`)
      .then((res) => res.json())
      .then(setMentor);
  }, [id]);

  if (!mentor) return <p>Carregando...</p>;

  return (
    <div>
      <h2>{mentor.name}</h2>
      <p>Especialidade: {mentor.expertise}</p>
      <p>Avaliação: ⭐{mentor.rating}</p>
    </div>
  );
}
