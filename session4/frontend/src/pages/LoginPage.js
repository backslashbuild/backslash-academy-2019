import React from "react";
import { useHistory } from "react-router-dom";

function LoginPage() {
  const history = useHistory();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);

        if (res.success == false) {
          setErrorMessage(res.message);
        } else {
          setErrorMessage("");
          localStorage.setItem("token", res.token);
          history.push("/");
        }
      });
  }

  return (
    <div>
      <h1>Welcome.</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        ></input>
        <input
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        ></input>
        <button>Send.</button>
        <br />
        {errorMessage}
      </form>
    </div>
  );
}

export default LoginPage;
