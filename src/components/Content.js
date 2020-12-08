import React, { useEffect, useState } from "react";
import "../styles/Meme.css";
import { faCommentDots, faFire, faSnowflake, faFlag } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import memeFacade from "../facades/memeFacade";
import Report from "./Report"



export default function Content({ meme, hasVotes, isLoggedIn,isUserSubmission }) {
  const [msg, setMsg] = useState("");
  const [voteType, setVoteType] = useState("none");
  const [votes, setVotes] = useState(meme);
  const [commentCounter, setCommentCounter] = useState(0);
  const [showReport, setShowReport] = useState(false);
  const handleShowReport = () => setShowReport(!showReport);
  let upvotedMemes = JSON.parse(localStorage.getItem("upvotedMemes"));
  let downvotedMemes = JSON.parse(localStorage.getItem("downvotedMemes"));
  let username = localStorage.getItem("user");

  useEffect(() => {
    checkUpvotedMemes();
    if (hasVotes) {
      memeFacade.getComments(meme.meme_id)
        .then(comments => setCommentCounter(comments.length))
    }
  }, []);


  const vote = (e) => {
    let type = e.currentTarget.id

    if (type === "up") {
      if (voteType === "up") {
        setMsg("");
        setVoteType("none");
      } else {
        if (!hasVotes) {
          setMsg("Upvoted")
        }
        setVoteType(type);
      }

      memeFacade.upvoteMeme(username, meme)
        .then(res => {
          setVotes({ ...res })
          upvotedMemes.push({ ...res });
          localStorage.setItem("upvotedMemes", JSON.stringify(upvotedMemes));
        })
        .catch(err => printError(err, setMsg));

    } else if (type === "down") {
      if (voteType === "down") {
        setMsg("");
        setVoteType("none");
      } else {
        if (!hasVotes) {
          setMsg("Downvoted")
        }
        setVoteType(type);
      }

      memeFacade.downvoteMeme(username, meme)
        .then(res => {
          setVotes({ ...res });
          downvotedMemes.push({ ...res });
          localStorage.setItem("downvotedMemes", JSON.stringify(downvotedMemes));
        })
        .catch(err => printError(err, setMsg));
    }
  }

  const checkUpvotedMemes = () => {
    if (upvotedMemes !== null && downvotedMemes !== null) {
      upvotedMemes.find(upvotedMeme => {
        if (upvotedMeme.imageUrl === meme.imageUrl) {
          setVoteType("up");
        }
        return 0;
      });
      downvotedMemes.find(downvotedMeme => {
        if (downvotedMeme.imageUrl === meme.imageUrl) {
          setVoteType("down");
        }
        return 0;
      });
    }
  }


     return (
        <div className="content">
          
          {isUserSubmission ? (
            <h3 style={{float: "left", marginTop: "5px"}}>{`Posted by: ${meme.postedBy}`}</h3>
          ) : ""}
          <img className="meme-img" src={meme.imageUrl} alt="" />
          <FontAwesomeIcon
            id="up"
            onClick={vote}
            className="voteBtn"
            icon={faFire}
            style={voteType === "up" ? { color: "red" } : { color: "black" }}
            size="2x" />
            {hasVotes ? (
              <p className="counter">{votes.upvotes}</p>
            ) : ""}
          <FontAwesomeIcon
            id="down"
            onClick={vote}
            className="voteBtn"
            icon={faSnowflake}
            style={voteType === "down" ? { color: "lightblue" } : { color: "black" }}
            size="2x" />         
            {hasVotes ? (
                    <p className="counter">{votes.downvotes}</p>
                  ) : ""}
                <p className="voteText" style={!isLoggedIn ? {color: "red"} : {color: "black"}}>
                  {msg}
                </p>
                <br />
                
            {hasVotes && (
            <div>
            <p className="counter" 
            style={{float: "right", marginLeft: "8px", marginTop: "10px"}}>
              {commentCounter}
            </p>
            <Link to={`/comment/${meme.meme_id}`}> 

            <FontAwesomeIcon
              size="2x"
              icon={faCommentDots}
              style={{ color: "black", float: "right", marginTop: "10px" }}
            />
          </Link>
          <FontAwesomeIcon
            onClick={handleShowReport}
            size="2x"
            icon={faFlag}
            style={{cursor: "pointer", color: "black", float: "right", marginTop: "10px", marginRight: "10px" }}
          />
          <Report handleShowReport={handleShowReport} showReport={showReport} meme_id={meme.meme_id}/>
        </div>
      )}
      <br />

    </div>
  )

}

const printError = (promise, setError) => {
  promise.fullError.then(function (status) {
    setError(`${status.message}`);
  });
};

