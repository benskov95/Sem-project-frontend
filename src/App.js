import Header from "./base-components/Header";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Sidebar from './base-components/Sidebar';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let history = useHistory();
  let user = isLoggedIn ? localStorage.getItem("user") : "";

  const setLoginStatus = (status) => {
    setIsLoggedIn(status);
    history.push("/");
  };

  return (
    <div className="App">
      <Header
        isLoggedIn={isLoggedIn}
        loginMsg={isLoggedIn ? "Log out" : "Log in"}
        setLoginStatus={setLoginStatus}
      />
      <Sidebar user={user} />
    </div>
  );
}
