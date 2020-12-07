import { useState } from "react";
import "../styles/Meme.css";

export default function PostMeme() {
    const [memeImg, setMemeImg] = useState("");

    const handleChange = (e) => {
        e.preventDefault();
        setMemeImg(e.target.value);
    }

    const clear = (e) => {
        e.preventDefault();
        setMemeImg("");
    }

    return (
        <div style={{marginTop: "100px"}}>
            <h1>Post a meme</h1>
            <br />
            <form>
                {memeImg.length > 10 ? (
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
                <input className="btn btn-secondary" type="submit" value="Post meme" />
                <button className="btn btn-secondary" style={{marginLeft: "5px"}} onClick={clear}>Clear</button>
            </form>
        </div>
    )
}