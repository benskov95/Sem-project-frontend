import React ,{useState} from "react"
import "../styles/Meme.css";
import { faFire, faSnowflake } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Button} from "react-bootstrap"

export default function Content({ meme, loadMore }) {
   
    const [msg, setMsg] = useState("");
    const [voteType, setVoteType] = useState("none");
  
    const vote = (e) => {
      let voteInfoArray = e.currentTarget.id.split("_");
      let type = voteInfoArray[0];
      let url = voteInfoArray[1];
      let voteCount = voteInfoArray[2];
  
      if (type === "up") {
        if (voteType === "up") {
          setMsg("");
          setVoteType("none");
        } else {
          setMsg("Upvoted");
          setVoteType(type);
        }
      } else if (type === "down") {
        if (voteType === "down") {
          setMsg("");
          setVoteType("none");
        } else {
          setMsg("Downvoted");
          setVoteType(type);
        }
      }
    }

     return (
        <div className="content">
          
          <img className="meme-img" src={meme.imageUrl} alt="" />
          <br />
          <FontAwesomeIcon
            id={"up_" + meme.imageUrl + "_" + meme.votes}
            onClick={vote}
            className="voteBtn"
            icon={faFire}
            style={voteType === "up" ? { color: "red" } : { color: "black" }}
            size="2x" />
          <FontAwesomeIcon
            id={"down_" + meme.imageUrl}
            onClick={vote}
            className="voteBtn"
            icon={faSnowflake}
            style={voteType === "down" ? { color: "lightblue" } : { color: "black" }}
            size="2x" />
          <p className="voteText">{msg}</p>
          <br />
       </div> 
      )
}