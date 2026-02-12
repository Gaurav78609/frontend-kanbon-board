import { useState } from "react";

function Login({ onLoginSuccess }) {
  const [value, setValue] = useState("");

  const handleLogin = () => {
    console.log("Login clicked, value =", value); 

    if (!value.trim()) return;

    localStorage.setItem("auth_user", value);
    onLoginSuccess(value);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Login Page</h1>

      <input
        type="text"
        placeholder="Username or Email"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
