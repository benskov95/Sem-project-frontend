import React, { useState } from "react";
import apiFacade from "../base-facades/apiFacade";
import { URL } from "../components/Funny";
import { Modal } from "react-bootstrap";
import styled from 'styled-components';

const GridWrapper = styled.div`
  display: grid;
  grid-gap: 80px;
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 6em;
  grid-auto-rows: minmax(25px, auto);
`;

export const Login = ({ isLoggedIn, setLoginStatus, handleShowLogin, showLogin }) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setError("");
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

  return (
    <Modal show={showLogin} onHide={handleShowLogin}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <br />
          <input
            onChange={handleChange}
            value={user.username}
            name="username"
          ></input>
          <br />
          <label>Password</label>
          <br />
          <input
            onChange={handleChange}
            type="password"
            value={user.password}
            name="password"
          ></input>
          <br />
          <br />
          <input
            type="submit"
            value="Log in"
            className="btn btn-secondary"
          ></input>
          <br />
          <br />
          <p style={{ color: "red" }}>{error}</p>
        </form>
      </Modal.Body>
    </Modal>
  );
};

const printError = (promise, setError) => {
  promise.fullError.then(function (status) {
    setError(`${status.message}`);
  });
};