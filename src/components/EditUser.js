import { useState } from "react";
import { Link } from "react-router-dom";
import userFacade from "../facades/userFacade";


export default function EditUser({ username, profilePicture, roles }) {
    const [changePic, setChangePic] = useState(false);
    const [changePw, setChangePw] = useState(false);
    const [doReturn, setDoReturn] = useState(false);
    const [passwords, setPasswords] = useState({ oldPw: "", newPw: "" })
    const [newProfilePic, setNewProfilePic] = useState({ profilePic: profilePicture })
    const [checkPw, setCheckPw] = useState("");
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");
    let user = { username: username, profilePicture: newProfilePic.profilePic };

    const openProfilePic = () => {
        setDoReturn(true);
        setChangePic(true);
    }

    const openPw = () => {
        setDoReturn(true);
        setChangePw(true);
    }

    const handlePicChange = (e) => {
        setNewProfilePic({ ...newProfilePic, [e.target.name]: e.target.value });
    }

    const handlePicSubmit = (e) => {
        e.preventDefault();
        userFacade.changeProfilePicture(user)
            .then(res => {
                setMsg("Profile picture has been changed.")
                localStorage.setItem("profilePicture", newProfilePic.profilePic);
            });

    }

    const handlePwChange = (e) => {
        if (e.target.name === "checkPw") {
            setCheckPw(e.target.value);
        } else {
            setPasswords({ ...passwords, [e.target.name]: e.target.value });
        }
    }

    const handlePwSubmit = (e) => {
        e.preventDefault();
        setMsg("");
        setError("");
        if (passwords.newPw !== checkPw) {
            setError("New password doesn't match confirmed password. Try again.")
        } else {
            userFacade.changePassword(passwords, user)
                .then(res => setMsg(res.message))
                .catch(err => printError(err, setError))
        }
    }

    const goBack = () => {
        setDoReturn(false);
        setChangePic(false);
        setChangePw(false);
    }

    return (
        <div>
            {!doReturn &&
                <div>
                    <button className="btn btn-secondary" style={{ marginBottom: 5 }} onClick={openProfilePic}>Change profile picture</button>
                    <br />
                    <button className="btn btn-secondary" onClick={openPw}>Change password</button><br />
                    {roles.includes("admin") ? (
                        <Link to="/admin"><button className="btn btn-secondary" style={{ marginTop: 5 }}>Manage users</button></Link>
                    ) : ""}
                </div>
            }

            {changePic ? (
                <div>
                    <h2>Change profile picture</h2>
                    <form onSubmit={handlePicSubmit}>
                        <input
                            onChange={handlePicChange}
                            value={newProfilePic.profilePic}
                            name="profilePic"
                            placeholder="Picture URL"
                            style={{ width: 240 }}
                        /><br />
                        <input className="btn btn-secondary" style={{ marginTop: 7 }} type="submit" value="Change picture" />
                        <p style={{ color: "green" }}>{msg}</p>
                    </form>
                    <br />
                    <button className="btn btn-secondary btn-sm" onClick={goBack}>Back</button>
                </div>
            ) : ""}

            {changePw ? (
                <div>
                    <h2>Change password</h2>
                    <form onSubmit={handlePwSubmit}>
                        <input
                            type="password"
                            onChange={handlePwChange}
                            value={passwords.oldPw}
                            name="oldPw"
                            placeholder="Current password"
                            style={{ width: 190, marginBottom: 20 }}
                        /><br />
                        <input
                            type="password"
                            onChange={handlePwChange}
                            value={passwords.newPw}
                            name="newPw"
                            placeholder="New password"
                            style={{ width: 190, marginBottom: 3 }}
                        /><br />
                        <input
                            type="password"
                            onChange={handlePwChange}
                            value={checkPw}
                            name="checkPw"
                            placeholder="Confirm new password"
                            style={{ width: 190 }}
                        /><br />
                        <input className="btn btn-secondary" style={{ marginTop: 7 }} type="submit" value="Change password" />
                        <p style={{ color: "green" }}>{msg}</p>
                        <p style={{ color: "red" }}>{error}</p>
                    </form>
                    <button className="btn btn-secondary btn-sm" onClick={goBack}>Back</button>
                </div>
            ) : ""}
        </div>
    )
}

const printError = (promise, setError) => {
    promise.fullError.then(function (status) {
        setError(`${status.message}`);
    });
};