import { Nav, Navbar} from 'react-bootstrap';
import styled from 'styled-components';
import "../styles/App.css";
import "../styles/Navbar.css";
import React, { useState } from "react";
import { Switch, Route, NavLink, Redirect } from "react-router-dom";
import { Login } from "./Login";
import Home from "./Home";
import Example from "../components/Example";
import Admin from "./Admin";
import Register from "./Register";
import NoMatch from "./NoMatch";
import Funny from "../components/Funny";
import Cat from "../components/Cat";
import PrivateRoute from "./PrivateRoute";
import BornGag from "../images/BornGag.png";



const Styles = styled.div`
 
  .navbar { background-color: #333; }
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
  let user = isLoggedIn ? `Logged in as: ${localStorage.getItem("user")}` : "";
  let roles = isLoggedIn ? `Roles: ${localStorage.getItem("roles")}` : "";
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);

  return (

    <React.Fragment>
<Styles>
<Navbar expand="lg">
  <Navbar.Brand as={NavLink} to="/"><img src={BornGag} className="img-fluid" alt="logo" /></Navbar.Brand>
    <Nav className="auto"> 
      {isLoggedIn && (
      <React.Fragment>
      <Nav.Item><Nav.Link as={NavLink} to="/example">Example</Nav.Link></Nav.Item>
      </React.Fragment>
    )}
    {roles.includes("admin") && (
      <React.Fragment>
        <Nav.Item><Nav.Link as={NavLink} to="/admin">Admin</Nav.Link></Nav.Item>
      </React.Fragment>
    )}
    <Nav.Item><Nav.Link as={NavLink} to="/login">{loginMsg}</Nav.Link></Nav.Item>
    {!isLoggedIn && (
      <React.Fragment>
        <Nav.Item><Nav.Link as={NavLink} to="/register" onClick={handleShow}>
             
                <Register handleShow={handleShow} show={show} />Register</Nav.Link></Nav.Item>
      </React.Fragment>
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
    <Route exact path="/" component={Home} />
    <PrivateRoute path="/example" isLoggedIn={isLoggedIn} component={Example} />
    <PrivateRoute path="/admin" isLoggedIn={isLoggedIn} component={Admin} />
    <Route path="/login">
      <Login
        setLoginStatus={setLoginStatus}
        isLoggedIn={isLoggedIn}
        loginMsg={loginMsg}
      />
    </Route>
    <Route path="/register" component={Register} />
    <Route path="/funny" component={Funny} />
    <Route path="/cat" component={Cat} />
    <Route component={NoMatch} />
  </Switch>
  </React.Fragment>
</React.Fragment>


)
}
