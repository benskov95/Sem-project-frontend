import React, { useState } from "react";
import apiFacade from "../base-facades/apiFacade";
import { URL } from "../components/Funny";
import { Modal } from "react-bootstrap";
import Confetti from "react-confetti";

export default function Register({ handleShowRegister, showRegister }) {
  const initialState = { username: "", password: "" };
  const [user, setUser] = useState(initialState);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setError("");
  };

  const registerUser = (e) => {
    e.preventDefault();
    if (URL === "") {
      setError("Remember to select an API on the Home page.");
    } else {
      if (user.username !== "" && user.password !== "") {
        apiFacade
          .register(user)
          .then((res) => setMsg(`${res.username} has been registered.`))
          .then(setSuccess(true))
          .catch((promise) => {
            promise.fullError.then((error) => {
              setError(error.message);
            });
          });
        setUser(initialState);
      } else {
        setError("All fields must be filled out.");
      }
    }
  };

  return (
    <Modal show={showRegister} onHide={handleShowRegister}>
      {success && msg && (
        <Confetti
          width={498}
          height={290.5}
          opacity={0.7}
          numberOfPieces={125}
        />
      )}
      <Modal.Header closeButton>
        <Modal.Title style={{ marginLeft: "42.3%" }}>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={registerUser} style={{ textAlign: "center" }}>
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
            value="Register"
            className="btn btn-secondary"
          ></input>
          <br />
          <br />
          <p style={{ color: "red" }}>{error}</p>
          <p style={{ color: "green" }}>{msg}</p>
        </form>
      </Modal.Body>
    </Modal>
  );
}
