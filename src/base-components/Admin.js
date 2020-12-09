import adminFacade from "../base-facades/adminFacade";
import { useEffect, useState } from "react";
import "../styles/App.css";
import "bootstrap/dist/css/bootstrap.css";

export default function Admin() {
  const [allUsers, setAllUsers] = useState([]);
  const [msg, setMsg] = useState("");
  const [filtered, setFiltered] =useState([])
 
  useEffect(() => {
    adminFacade.getUsers().then((users) =>{ 
        setAllUsers([...users])
        setFiltered([...users])});
  }, [msg]);

  filtered.forEach((user) => {
    if (user.username === localStorage.getItem("user")) {
      let excludedUser = [...allUsers];
      let index = excludedUser.indexOf(user);
      excludedUser.splice(index, 1);
      setFiltered([...excludedUser]);
    }
  });

  const handleSearch = (e) =>{
    let searchInput = e.target.value.toLowerCase()

    if (searchInput.length >= 1){
     let user = filtered.filter(function (x) {
       return x.username.includes(searchInput)
     })
     if(user.length === 0){
        setFiltered([...allUsers])
     } else{
      setFiltered([...user]) 
     } 
    }
    if (searchInput.length <= 1){
      setFiltered([...allUsers])
    }
  }

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
      <h3>List of registered users</h3>
      <p> (Currently logged-in user is excluded)</p>
      <p style={{ color: 'red' }}>{msg !== "" ? `${msg}` : ""} </p>
      <div className="containerTable">
        <table className="table table-striped" style={{ border: '2px solid lightgrey' }}>
          <thead>
            <tr>
              <th>User</th>
              <th>Role(s)</th>
              <th><input style={{float:"right"}} placeholder="Search for User..." onChange={handleSearch}></input></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((user) => {
              let roles = user.roles.join(", ");
              return (
                <tr key={user.username}>
                  <td>{user.username}</td>
                  <td>{roles}</td>
                  <td style={{ float: 'right' }}>
                    <button
                      className="btn btn-secondary"
                      onClick={banUser}
                      value={user.username}
                      style={{ marginRight: 1 }}
                    >
                      Ban
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={unbanUser}
                      value={user.username}
                      style={{ marginRight: 1 }}
                    >
                      Unban
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={deleteUser}
                      value={user.username}
                    >
                      Delete
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
