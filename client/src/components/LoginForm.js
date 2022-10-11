import React, { useState } from "react";

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((res) => {
      setIsLoading(false);
      if (res.ok) {
        res.json().then((user) => onLogin(user));
      } else {
        res.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <div className="container">
      <div className="app-wrapper">
      <div>
          <h2 className="title">Login</h2>
        </div>
      <form className="form-wrapper" onSubmit={handleSubmit}>
        <div className="name">
          <label className="label">Username</label>
          <input
            className="input"
            type="text"
            name="username"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="password">
          <label className="password">Password</label>
          <input
            className="input"
            type="password"
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button className="submit" type="submit">
            {isLoading ? "Loading..." : "Login"}
          </button>
        </div>
        <div>
          {errors.map((err) => (
            <div key={err}>{err}</div>
          ))}
        </div>
      </form>
      </div>
    </div>
  );
}

export default LoginForm;
