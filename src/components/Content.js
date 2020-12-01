import React ,{useState} from "react"
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

export default function Content({ meme, loadMore }) {
   
    const [msg, setMsg] = useState("");
    const [voteType, setVoteType] = useState("none");
    let { path, url } = useRouteMatch();

    const vote = (e) => {
      let voteInfoArray = e.currentTarget.id.split("_");
      let type = voteInfoArray[0];
      let image_url = voteInfoArray[1];
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
       </div> 
      )
}
