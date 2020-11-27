import { useState } from "react";
import { LOCAL_URL } from "../utils/settings";
import "../styles/Meme.css";
import { faFire, faSnowflake } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export let URL = LOCAL_URL;

export default function Funny({ meme }) {
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
      <h4 className="meme-title">{meme.title}</h4>
      <img className="meme-img" src={meme.url} alt="" />
      <br />
      <FontAwesomeIcon
        id={"up_" + meme.url + "_" + meme.votes}
        onClick={vote}
        className="voteBtn"
        icon={faFire}
        style={voteType === "up" ? { color: "red" } : { color: "black" }}
        size="2x" />
      <FontAwesomeIcon
        id={"down_" + meme.url}
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
