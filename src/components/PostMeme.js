import { useState } from "react";
import "../styles/Meme.css";
import memeFacade from "../facades/memeFacade";

export default function PostMeme() {
    const [memeImg, setMemeImg] = useState("");
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");
    let user = localStorage.getItem("user");

    const handleChange = (e) => {
        e.preventDefault();
        setMemeImg(e.target.value);
    }

    const clear = (e) => {
        e.preventDefault();
        setMemeImg("");
        setMsg("");
        setError("");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setMsg("");
        setError("");
        if(memeImg.includes("https") && memeImg.length > 10) {
            if (memeImg.includes("jpg" || memeImg.includes("jpeg") || memeImg.includes("png"))) {
                memeFacade.addUserMeme({imageUrl: memeImg, postedBy: user})
                .then(res => setMsg("Meme has been posted"))
                .catch(err => printError(err, setError));
            } else {
                setError("The provided URL does not link to a picture. Make sure you have the correct URL.")
            }
        } else {
            setError("Invalid URL. Please try again.")
        }
    }

    return (
        <div style={{marginTop: "100px"}}>
            <h1>Post a meme</h1>
            <p><i>All user submissions are posted anonymously.</i></p>
            <p style={{fontSize: "16px", color: "green"}}>{msg}</p>
            <p style={{fontSize: "16px", color: "red"}}>{error}</p>
            <br />
            <form onSubmit={handleSubmit}>
                {memeImg.includes("https") ? (
                    <img src={memeImg} className="meme-img" alt="" />
                ) : ""}
                <br /><br />
                <input 
                placeholder="Enter image URL" 
                value={memeImg} 
                onChange={handleChange}
                style={{marginBottom: "10px"}}
                />
                <br />

                <input 
                className="btn btn-secondary" 
                type="submit" 
                value="Post meme" />
                
                <button 
                className="btn btn-secondary" 
                style={{marginLeft: "5px"}} 
                onClick={clear}>Clear
                </button>
            </form>
        </div>
    )
}

const printError = (promise, setError) => {
    promise.fullError.then(function (status) {
      setError(`${status.message}`);
    });
  };