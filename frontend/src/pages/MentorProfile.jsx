import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MentorProfile(){
  const { id } = useParams();
  const [mentor,setMentor] = useState(null);

  useEffect(()=>{
    fetch(`/api/mentor/${id}`).then(r=>r.json()).then(setMentor);
  },[id]);

  async function agendar() {
    const res = await fetch(`/api/mentor/${id}/book`,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ studentId: 2, datetime: new Date().toISOString() })
    });
    await res.json();
    alert("Agendamento feito!");
  }

  if(!mentor) return <p>Carregando...</p>;
  return (
    <div>
      <h2>Mentor #{mentor.userId}</h2>
      <p>{mentor.bio}</p>
      <p><b>Área:</b> {mentor.area}</p>
      <p><b>Disponível:</b> {mentor.availableSlots}</p>
      <button onClick={agendar}>Agendar</button>
    </div>
  );
}
