import React from "react";
import { SignUpProps } from "../types/types";

export default function SignUp( {handleUserSignUp}: SignUpProps ) {
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }


  return (
    <div className="login-form-cont">
      <h2>Make an account!</h2>
      <form className="login-form" onSubmit={event => handleUserSignUp(event, username, password)}>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <input type="submit" value="Sign Up!" />
      </form>
    </div>
  )
}
