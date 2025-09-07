import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function MentorList(){
  const [mentors,setMentors] = useState([]);

  useEffect(()=>{
    fetch("/api/mentors?area=Psicologia")
      .then(r=>r.json())
      .then(setMentors);
  },[]);

  return (
    <div>
      <h2>Mentores</h2>
      {mentors.map(m=>(
        <div key={m.id}>
          <h3>Mentor #{m.userId}</h3>
          <p>{m.bio}</p>
          <p><b>Área:</b> {m.area}</p>
          <Link to={`/mentor/${m.id}`}>Ver perfil</Link>
        </div>
      ))}
    </div>
  );
}
