import { useState } from "react";
import userFacade from "../facades/userFacade";


export default function EditUser({username, profilePicture}) {
    const [changePic, setChangePic] = useState(false);
    const [changePw, setChangePw] = useState(false);
    const [doReturn, setDoReturn] = useState(false);
    const [passwords, setPasswords] = useState({oldPw: "", newPw: ""})
    const [newProfilePic, setNewProfilePic] = useState({profilePic: profilePicture})
    const [checkPw, setCheckPw] = useState("");
    const [msg, setMsg] = useState("");
    let user = {username: username, profilePicture: newProfilePic.profilePic};

    const openProfilePic = () => {
        setDoReturn(true);
        setChangePic(true);
    }

    const openPw = () => {
        setDoReturn(true);
        setChangePw(true);
    }

    const handlePicChange = (e) => {
        setNewProfilePic({ ...newProfilePic, [e.target.name]: e.target.value});
    }

    const handlePicSubmit = (e)  => {
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
            setPasswords({ ...passwords, [e.target.name]: e.target.value});
        }
    }

    const handlePwSubmit = (e) => {
        e.preventDefault();
        userFacade.changePassword(passwords, user)
        .then(res => setMsg(res.message))
    }

    const goBack = () => {
        setDoReturn(false);
        setChangePic(false);
    }

    return (
        <div>
            {!doReturn &&
            <div>
            <button onClick={openProfilePic}>Change profile picture</button>
            <br />
            <button onClick={openPw}>Change password</button>
            </div>
            }

            {changePic ? (
                <div>
                    <h2>Change profile picture</h2><br />
                    <form onSubmit={handlePicSubmit}>
                    <input 
                    onChange={handlePicChange} 
                    value={newProfilePic.profilePic}
                    name="profilePic"
                    placeholder="Picture URL"
                    /><br />
                    <input type="submit" value="Change picture" />
                    <p style={{color: "green"}}>{msg}</p>
                    </form>
                    <br />
                    <button onClick={goBack}>Back</button>
                </div>
            ): ""}

            {changePw ? (
                <div>
                    <h2>Change password</h2>
                    <form onSubmit={handlePwSubmit}>
                    <input
                    onChange={handlePwChange}
                    value={passwords.oldPw}
                    name="oldPw"
                    placeholder="Current password"
                    /><br />
                    <input
                    onChange={handlePwChange}
                    value={passwords.newPw}
                    name="newPw"
                    placeholder="New password"
                    /><br />
                    <input
                    onChange={handlePwChange}
                    value={checkPw}
                    name="checkPw"
                    placeholder="Confirm new password"
                    /><br />
                    <input type="submit" value="Change password" />
                    <p style={{color: "green"}}>{msg}</p>
                    </form>
                    <button onClick={goBack}>Back</button>
                </div>
            ) : ""}
        </div>
    )
}