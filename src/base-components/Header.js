import { Nav, Navbar, Button } from 'react-bootstrap';
import styled from 'styled-components';
import "../styles/App.css";
import "../styles/Navbar.css";
import React, { useState } from "react";
import { Switch, Route, NavLink, Redirect } from "react-router-dom";
import { Login } from "./Login";
import Funny from "../components/Funny";
import Admin from "./Admin";
import Register from "./Register";
import { Modal } from "react-bootstrap";
import NoMatch from "./NoMatch";
import Cat from "../components/Cat";
import YesOrNo from "../components/YesOrNo"
import PrivateRoute from "./PrivateRoute";
import BornGag from "../images/BornGag.png";
import apiFacade from "../base-facades/apiFacade";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../components/GlobalStyles";
import { lightTheme, darkTheme } from "../components/Theme"
import Dog from '../components/Dog';
import EditUser from "../components/EditUser"
import Hot from "../components/Hot";
import Cold from "../components/Cold";
import Favorite from "../components/Favorite";
import Comment from "../components/Comment"
import PostMeme from '../components/PostMeme';
import Submissions from "../components/Submissions"
import ReportedMemes from "../components/ReportedMemes"

const Styles = styled.div`
 
  .navbar { background-color: #333;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    mim-height: 78px;
    max-height: 78px;
   }
  a, .navbar-nav, .navbar-light .nav-link {
    color: white;
    &:hover { color: grey; }
  }
  .navbar-brand {
    font-size: 1.4em;
    color: white;
    &:hover { color: grey; }
  }
  .form-center {
    position: absolute !important;
    left: 25%;
    right: 25%;
  }

`;


export default function Header({ isLoggedIn, setLoginStatus, loginMsg, blacklistedMemes }) {
  let user = isLoggedIn ? localStorage.getItem("user") : "";
  let roles = isLoggedIn ? localStorage.getItem("roles") : "";
  const [profilePicture, setProfilePicture] = useState(localStorage.getItem("profilePicture"));
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const handleShowLogin = () => setShowLogin(!showLogin);
  const handleShowRegister = () => setShowRegister(!showRegister);
  const handleShowEdit = () => setShowEdit(!showEdit);
  const [theme, setTheme] = useState('light');
  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }

  const logout = () => {
    apiFacade.logout();
    setLoginStatus(false);
    setShowLogin(false);
    setShowEdit(false);
  }

  const toggleUserOptions = () => {
    handleShowEdit();
  }

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <React.Fragment>
        <Styles>
          <Navbar expand="lg">
            <Navbar.Brand as={NavLink} to="/"><img src={BornGag} className="img-fluid" alt="logo" /></Navbar.Brand>
            {isLoggedIn ? (
              <NavLink to="/post" style={{ position: "fixed", left: 160 }}>
                Post meme
              </NavLink>
            ) : ""}
            <Nav className="auto">
              {!isLoggedIn ? (
                <React.Fragment>
                  <Nav.Item>
                    <Button style={{
                      background: "#333333",
                      border: "none",
                      outline: "none",
                      position: 'fixed',
                      right: 0
                    }}
                      onClick={handleShowLogin}>{loginMsg}</Button>
                    <Login handleShowLogin={handleShowLogin} showLogin={showLogin} isLoggedIn={isLoggedIn} setLoginStatus={setLoginStatus} /></Nav.Item>
                  <Nav.Item>
                    <Button style={{
                      background: "#333333",
                      border: "none",
                      outline: "none",
                      position: 'fixed',
                      right: 75
                    }}
                      onClick={handleShowRegister}>Register</Button>
                    <Register handleShowRegister={handleShowRegister} showRegister={showRegister} /></Nav.Item>
                </React.Fragment>
              ) : ""}
              <Nav.Item style={{ position: 'fixed', right: 0, marginRight: "15px" }}>
                {isLoggedIn &&
                  <img src={profilePicture}
                    alt=""
                    onClick={toggleUserOptions}
                    style={{
                      height: "30px",
                      width: "30px",
                      marginTop: "-40px",
                      cursor: "pointer"
                    }}>
                  </img>
                }
                <p style={{ marginTop: "-15px" }}>{user}</p>
              </Nav.Item>
            </Nav>
          </Navbar>
          <Button style={{ position: 'fixed', right: 10, bottom: 10, background: "#333333", border: "none" }} onClick={themeToggler}>Switch Theme</Button>
        </Styles>
      </React.Fragment>

      <Switch>
        {/* for deployment */}
        <Route path="/borngag">
          <Redirect to="/" />
        </Route>
        <PrivateRoute path="/admin" isLoggedIn={isLoggedIn} component={Admin} />
        <PrivateRoute path="/reports" isLoggedIn={isLoggedIn} component={ReportedMemes} />

        <Route exact path="/">
          <Funny isLoggedIn={isLoggedIn} blacklistedMemes={blacklistedMemes} />
        </Route>
        <Route path="/cat">
          <Cat isLoggedIn={isLoggedIn} blacklistedMemes={blacklistedMemes}/>
        </Route>
        <Route path="/yesorno">
          <YesOrNo isLoggedIn={isLoggedIn} blacklistedMemes={blacklistedMemes}/>
        </Route>
        <Route path="/dog">
          <Dog isLoggedIn={isLoggedIn} blacklistedMemes={blacklistedMemes}/>
        </Route>
        <Route path="/hot">
          <Hot isLoggedIn={isLoggedIn} blacklistedMemes={blacklistedMemes}/>
        </Route>
        <Route path="/cold">
          <Cold isLoggedIn={isLoggedIn} blacklistedMemes={blacklistedMemes}/>
        </Route>
        <Route path="/favorite">
          <Favorite isLoggedIn={isLoggedIn} user={user} blacklistedMemes={blacklistedMemes}/>
        </Route>
        <Route path="/submissions">
          <Submissions isLoggedIn={isLoggedIn} blacklistedMemes={blacklistedMemes}/>
        </Route>
        <Route path={`/comment/:meme_id`} >
          <Comment isLoggedIn={isLoggedIn} />
        </Route>

        <Route path="/post" component={PostMeme} />

        <Route component={NoMatch} />


      </Switch>

      <Modal show={showEdit} onHide={handleShowEdit}>
        <Modal.Header closeButton>
          <img src={profilePicture} className="img-fluid" style={{ maxWidth: 55, marginRight: 5 }} alt=""></img>
          <Modal.Title style={{ marginTop: 10 }}>{user}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditUser username={user} profilePicture={profilePicture} setProfilePicture={setProfilePicture} roles={roles} />
        </Modal.Body>
        <Modal.Footer><button className="btn btn-secondary" onClick={logout}>Log out</button></Modal.Footer>
      </Modal>

    </ThemeProvider>
  )
}