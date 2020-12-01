import React ,{useState} from "react";
import "../styles/Meme.css";
import { faFire, faSnowflake } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import memeFacade from "../facades/memeFacade";

export default function Content({ meme }) {
   
    const [msg, setMsg] = useState("");
    const [voteType, setVoteType] = useState("none");
    const [votes, setVotes] = useState({});
    let username = localStorage.getItem("user");
  
    const vote = (e) => {
      let voteInfoArray = e.currentTarget.id.split("_");
      let type = voteInfoArray[0];
      let url = voteInfoArray[1];
  
      if (type === "up") {
        if (voteType === "up") {
          setVoteType("none");
        } else {
          setVoteType(type);
        }

        memeFacade.upvoteMeme(username, url)
        .then(res => setVotes({ ...res}))
        .catch(err => printError(err, setMsg)); 

      } else if (type === "down") {
        if (voteType === "down") {
          setVoteType("none");
        } else {
          setVoteType(type);
        }

        memeFacade.downvoteMeme(username, url)
        .then(res => setVotes({ ...res}))
        .catch(err => printError(err, setMsg));    
      }
    }

     return (
        <div className="content">
          
          <img className="meme-img" src={meme.imageUrl} alt="" />
          <FontAwesomeIcon
            id={"up_" + meme.imageUrl + "_" + meme.votes}
            onClick={vote}
            className="voteBtn"
            icon={faFire}
            style={voteType === "up" ? { color: "red" } : { color: "black" }}
            size="2x" />
          <p className="counter">{votes.upvotes}</p>
          <FontAwesomeIcon
            id={"down_" + meme.imageUrl}
            onClick={vote}
            className="voteBtn"
            icon={faSnowflake}
            style={voteType === "down" ? { color: "lightblue" } : { color: "black" }}
            size="2x" />
          <p className="counter">{votes.downvotes}</p>
          <p className="voteText">{msg}</p>
          <br />
       </div> 
      )
  }

const printError = (promise, setError) => {
  promise.fullError.then(function (status) {
    setError(`${status.message}`);
  });
};