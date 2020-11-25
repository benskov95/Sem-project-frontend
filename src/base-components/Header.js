import React from "react";
import 'react-sidebar-ui/dist/index.css';
import { Nav, Navbar} from 'react-bootstrap';
import styled from 'styled-components';
import {
  Switch,
  Route,
  NavLink,
  Redirect,
} from "react-router-dom";
import { Login } from "./Login";
import Home from "./Home";
import Example from "../components/Example";
import Admin from "./Admin";
import Register from "./Register";
import NoMatch from "./NoMatch"
import PrivateRoute from "./PrivateRoute"



const Styles = styled.div`
  .navbar { background-color: #222; }
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

  return (
    <React.Fragment>
<Styles>
<Navbar expand="lg">
  <Navbar.Brand as={NavLink} to="/">BornGag Logo</Navbar.Brand>
    <Nav className="auto">
      <Nav.Item><Nav.Link as={NavLink} to="/">Home</Nav.Link></Nav.Item> 
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
        <Nav.Item><Nav.Link as={NavLink} to="/register">Register</Nav.Link></Nav.Item>
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
    <Route exact path="/" component={Home}>
      
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
    <Route path="/register" component={Register}>
      
    </Route>
    <Route>
     <NoMatch />
    </Route>
  </Switch>
  </React.Fragment>
</React.Fragment>


)
}
