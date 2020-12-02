import adminFacade from "../base-facades/adminFacade";
import { useEffect, useState } from "react";
import "../styles/App.css";
import "bootstrap/dist/css/bootstrap.css";

export default function Admin() {
  const [allUsers, setAllUsers] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    adminFacade.getUsers().then((users) => setAllUsers([...users]));
  }, [msg]);

  allUsers.forEach((user) => {
    if (user.username === localStorage.getItem("user")) {
      let excludedUser = [...allUsers];
      let index = excludedUser.indexOf(user);
      excludedUser.splice(index, 1);
      setAllUsers([...excludedUser]);
    }
  });

  const deleteUser = (e) => {
    adminFacade
      .deleteUser(e.target.value)
      .then((res) => setMsg(res.username + " has been deleted"));
  };

  const banUser = (e) => {
    adminFacade
      .banUser(e.target.value)
      .then((res) => setMsg(res.username + " has been banned"));
  };
  const unbanUser = (e) => {
    adminFacade
      .unbanUser(e.target.value)
      .then((res) => setMsg(res.username + " has been unbanned"));
  };

  return (
    <div>
      <h1>Hello Admin</h1>
      <br />
      <p>{msg !== "" ? `${msg}` : ""} </p>
      <br />
      <h3>List of registered users</h3>
      <p> (currently logged-in user is excluded)</p>
      <div className="container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>User</th>
              <th>Roles</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user) => {
              let roles = user.roles.join(", ");
              return (
                <tr key={user.username}>
                  <td>{user.username}</td>
                  <td>{roles}</td>
                  <td>
                    <button
                      className="btn btn-secondary"
                      onClick={deleteUser}
                      value={user.username}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={banUser}
                      value={user.username}
                    >
                      Ban
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={unbanUser}
                      value={user.username}
                    >
                      unban
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
