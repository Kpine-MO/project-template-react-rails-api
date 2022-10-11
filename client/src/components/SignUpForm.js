import React, { useState } from "react";

function SignUpForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [bio, setBio] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        password_confirmation: passwordConfirmation,
        bio,
      }),
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
          <h2 className="title">Create Account</h2>
        </div>
        <form className="form-wrapper" onsubmit={handleSubmit}>
          <div className="name">
            <label className="label">Username</label>
            <input
              className="input"
              type="text"
              name="username"
              autoComplete="off"
              value={username}
              onChange = {(e) => setUsername(e.target.value)}
              />
          </div>
          <div className="password">
          <label className="label">password</label>
          <input
            className="input"
            type="password"
            name="password"
            autoComplete="off"
            value={password}
            onChange = {(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="password">
            <label className="label">Password Confirmation</label>
            <input
              className="input" 
              type="password confirmation"
              name="pasword confirmation"
              value={passwordConfirmation}
              onChange = {(e) => setPasswordConfirmation(e.target.value)}

              />
          </div>
          <div className="bio">
            <label className="lebel">Bio</label>
            <input
              className="input"
              type="bio"
              name="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <div>
            <button className="submit" type="submit">{isLoading ? "Loading.." : "Sign Up"}</button>
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

export default SignUpForm;
