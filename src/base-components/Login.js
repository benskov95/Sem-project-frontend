import React, { useState } from "react";
import apiFacade from "../base-facades/apiFacade";
import { URL } from "./Home";
import styled from 'styled-components';

const GridWrapper = styled.div`
  display: grid;
  grid-gap: 80px;
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 6em;
  grid-auto-rows: minmax(25px, auto);
`; 

export const Login = ({ isLoggedIn, loginMsg, setLoginStatus }) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setError("");
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (URL === "") {
      setError("Remember to select an API on the Home page.");
    } else {
      apiFacade
      .login(user)
      .then((res) => setLoginStatus(!isLoggedIn))
      .catch((promise) => {
        if (promise.fullError) {
          printError(promise, setError);
        } else {
          setError("No response from API. Make sure it is running.");
        }
      });
    }
  };

  const logout = () => {
    setLoginStatus(false);
    apiFacade.logout();
  };

  if (!isLoggedIn) {
    return (
      <GridWrapper>
        <h2>{loginMsg}</h2>
        <br />
        <form onSubmit={handleSubmit}>
        <label>Username</label><br />
          <input
            id="username"
            onChange={handleChange}
          />
          <br />
          <label>Password</label><br />
          <input
            id="password"
            type="password"
            onChange={handleChange}
          />
          <br />
          <br />
          <input type="submit" value="Log in" className="btn btn-secondary"/>
          <br />
          <p style={{ color: "red" }}>{error}</p>
        </form>
      </GridWrapper>
    );
  } else {
    return (
      <GridWrapper>
        <h2>{loginMsg}</h2>
        <br />
        <button onClick={logout} className="btn btn-secondary">Log out</button>
      </GridWrapper>
    );
  }
};;

const printError = (promise, setError) => {
  promise.fullError.then(function (status) {
    setError(`${status.message}`);
  });
};