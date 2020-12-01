import React ,{useEffect, useState} from "react";
import "../styles/Meme.css";
import {faCommentDots,faFire, faSnowflake } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Button} from "react-bootstrap"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import Comment from "./Comment"
import memeFacade from "../facades/memeFacade";


export default function Content({ meme, hasVotes, isLoggedIn }) {
    const [msg, setMsg] = useState("");
    const [voteType, setVoteType] = useState("none");
    const [votes, setVotes] = useState({});
    let username = localStorage.getItem("user");
    let url = useRouteMatch()

    useEffect(() => {
      setMsg("");
      setVoteType("none")
    }, [isLoggedIn]);


    const vote = (e) => {
      let voteInfoArray = e.currentTarget.id.split("_");
      let type = voteInfoArray[0];

      

  
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
        .then(res => setVotes({ ...res}))
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
            {hasVotes ? (
              <p className="counter">{votes.upvotes}</p>
            ) : ""}
          <FontAwesomeIcon
            id={"down_" + meme.imageUrl}
            onClick={vote}
            className="voteBtn"
            icon={faSnowflake}
            style={voteType === "down" ? { color: "lightblue" } : { color: "black" }}
            size="2x" />
            
            
            <Link to={`${url}/${meme.meme_id}`}> 
            <FontAwesomeIcon
             size="2x"
             icon={faCommentDots} 
              />
            </Link>
           <Switch>
            <Route exact path={`${url}/${meme.meme_id}`}>
              <Comment meme={meme}/>
            </Route>
            </Switch>
          <br />
          
                      {hasVotes ? (
                        <p className="counter">{votes.downvotes}</p>
                      ) : ""}
                    <p className="voteText" style={!isLoggedIn ? {color: "red"} : {color: "black"}}>
                      {msg}
                    </p>
                    <br />
       </div> 
      )
     
  }

const printError = (promise, setError) => {
  promise.fullError.then(function (status) {
    setError(`${status.message}`);
  });
};

