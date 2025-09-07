import React, { useState } from "react";

export default function Login() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  async function handleLogin() {
    const res = await fetch("/api/auth/login",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    alert(data.token ? "Login OK!" : "Erro: " + data.error);
  }

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder="Senha" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
}
