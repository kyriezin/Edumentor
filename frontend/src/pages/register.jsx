import React, { useState } from "react";

export default function Register() {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [role,setRole]=useState("student");

  async function handleRegister() {
    const res = await fetch("/api/auth/register",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ name,email,password,role })
    });
    const data = await res.json();
    alert(data.id ? "Conta criada!" : "Erro: " + data.error);
  }

  return (
    <div>
      <h2>Registrar</h2>
      <input placeholder="Nome" value={name} onChange={e=>setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder="Senha" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <select value={role} onChange={e=>setRole(e.target.value)}>
        <option value="student">Estudante</option>
        <option value="mentor">Mentor</option>
      </select>
      <button onClick={handleRegister}>Registrar</button>
    </div>
  );
}
