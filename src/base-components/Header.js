import { Nav, Navbar, Button } from 'react-bootstrap';
import styled from 'styled-components';
import "../styles/App.css";
import "../styles/Navbar.css";
import React, { useState, useEffect } from "react";
import { Switch, Route, NavLink, Redirect } from "react-router-dom";
import { Login } from "./Login";
import Funny from "../components/Funny";
import Example from "../components/Example";
import Admin from "./Admin";
import Register from "./Register";
import NoMatch from "./NoMatch";
import Cat from "../components/Cat";
import PrivateRoute from "./PrivateRoute";
import BornGag from "../images/BornGag.png";



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


export default function Header({ isLoggedIn, setLoginStatus, loginMsg }) {
  const [content, setContent] = useState([]);
  let user = isLoggedIn ? `Logged in as: ${localStorage.getItem("user")}` : "";
  let roles = isLoggedIn ? `Roles: ${localStorage.getItem("roles")}` : "";
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);

  useEffect(() => {
    fetch("https://meme-api.herokuapp.com/gimme/1")
    .then(res => res.json())
    .then(data => {
      let test = [...data.memes];
      test.forEach(meme => meme.votes = 0);
      setContent([...test])
    })
  }, [])

  return (

    <React.Fragment>
      <Styles>
        <Navbar expand="lg">
          <Navbar.Brand as={NavLink} to="/"><img src={BornGag} className="img-fluid" alt="logo" /></Navbar.Brand>
          <Nav className="auto">
            {roles.includes("admin") && (
              <React.Fragment>
                <Nav.Item ><Nav.Link as={NavLink} to="/admin">Admin</Nav.Link></Nav.Item>
              </React.Fragment>
            )}
            <Nav.Item><Button style={{background: "#333333",border: "none", outline: "none", marginRight: "5px" }}>{loginMsg}</Button></Nav.Item>
            {!isLoggedIn && (

              <Nav.Item><Button style={{background: "#333333",border: "none", outline: "none" }} onClick={handleShow}>Register</Button>
                <Register handleShow={handleShow} show={show} /> </Nav.Item>

            )}
            <Nav.Item style={{ float: "right", color: "white", marginRight: "20px" }}>
              {user}
              <br />
              {roles}</Nav.Item>
          </Nav>
        </Navbar>
      </Styles>

      <React.Fragment>
        <Switch>
          {/* for deployment */}
          <Route path="/ca3-startcode">
            <Redirect to="/" />
          </Route>
          <PrivateRoute path="/example" isLoggedIn={isLoggedIn} component={Example} />
          <PrivateRoute path="/admin" isLoggedIn={isLoggedIn} component={Admin} />
          <Route path="/login">
            <Login
              setLoginStatus={setLoginStatus}
              isLoggedIn={isLoggedIn}
              loginMsg={loginMsg}
            />
          </Route>


          <Route path="/" component={Funny}>
            <div><br />
              <h1>Memes</h1><br />
              {content.map(meme => <Funny meme={meme} key={meme.url}/>)}
            </div>
          </Route>
          <Route path="/cat" component={Cat} />
          <Route component={NoMatch} />

        </Switch>
      </React.Fragment>
    </React.Fragment>


  )
}
