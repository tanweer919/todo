import React, { useState } from "react";
import "./Login.scss";
import { loginData } from "../interface/interfaces";
import UserService from '../services/UserService';
import {useHistory} from 'react-router-dom';
const Login = (): JSX.Element => {
  const history = useHistory();
  const [loginState, setLoginState] = useState<loginData>({
    email: "",
    password: "",
  });
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    let currentState: loginData = { ...loginState };
    currentState[e.currentTarget.name as keyof loginData] =
      e.currentTarget.value;
    setLoginState(currentState);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userService = new UserService();
    const user = await userService.login(loginState);
    if(user !== null) {
      history.push('/home');
    }
    else {
      console.error("Error");
    }
  };

  return (
    <div className="login-container">
      <form className="form" method="post" onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          value={loginState["email"]}
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={loginState["password"]}
          name="password"
          onChange={handleChange}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Login;
