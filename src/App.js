import Header from "./base-components/Header";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Sidebar from './base-components/Sidebar';
import memeFacade from "./facades/memeFacade";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [blacklistedMemes, setBlacklistedMemes] = useState([]);
  let history = useHistory();
  let user = isLoggedIn ? localStorage.getItem("user") : "";

  useEffect(() => {
    memeFacade.getBlacklistedMemes()
    .then(res => setBlacklistedMemes([...res]));
  }, [])

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
        blacklistedMemes={blacklistedMemes}
      />
      <Sidebar user={user} />
    </div>
  );
}
