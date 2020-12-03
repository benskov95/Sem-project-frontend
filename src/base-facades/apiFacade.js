import { URL } from "../components/Funny";

export function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

function apiFacade() {
  const setToken = (token) => {
    localStorage.setItem("jwtToken", token);
  };

  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };

  const setUserAndRoles = (data) => {
    let userFromToken = JSON.parse(atob(data.token.split(".")[1]));
    localStorage.setItem("user", userFromToken.sub);
    localStorage.setItem("roles", userFromToken.roles);
    localStorage.setItem("profilePicture", data.profilePicture);
    localStorage.setItem("upvotedMemes", JSON.stringify(data.upvotedMemes));
    localStorage.setItem("downvotedMemes", JSON.stringify(data.downvotedMemes));
  };

  const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
    localStorage.removeItem("roles");
    localStorage.removeItem("profilePicture")
    localStorage.removeItem("upvotedMemes");
    localStorage.removeItem("downvotedMemes");
  };

  const login = (user) => {
    const options = makeOptions("POST", true, {
      username: user.username,
      password: user.password,
    });
    return fetch(URL + "/api/login", options)
      .then(handleHttpErrors)
      .then((res) => {
        setUserAndRoles(res);
        setToken(res.token);
      });
  };


  const register = (user) => {
    const options = makeOptions("POST", false, {
      username: user.username,
      password: user.password,
    });
    return fetch(URL + "/api/users", options)
      .then(handleHttpErrors)
  }

  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  };
  return {
    makeOptions,
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
    register
  };
}
const facade = apiFacade();
export default facade;
