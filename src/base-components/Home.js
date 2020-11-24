import { useEffect, useState } from "react";
import { LOCAL_URL, REMOTE_URL } from "../utils/settings";
import memeFacade from "../facades/memeFacade";
import React from "react"

export let URL = "";

export default function Home() {
  const [currentURL, setCurrentURL] = useState(
    URL === LOCAL_URL ? "Local API" : URL === REMOTE_URL ? "Remote API" : "none"
  );

  useEffect(() => {}, [currentURL]);

  const changeURL = (e) => {
    URL = e.target.value;
    if (URL === LOCAL_URL) {
      setCurrentURL("Local API");
    } else {
      setCurrentURL("Remote API");
    }
  };

    const [example, setExample] = useState([]);
    const handleClick = (e) => {
      e.preventDefault();
      memeFacade.getfunnyMeme().then((data) => setExample(data));
    };

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to BornGag</p>
      <br />
      <p style={{ fontWeight: "bold" }}>
        Select which API to use <br />
        Currently using: {currentURL}
      </p>
      <select onChange={changeURL}>
        <option value="">Choose...</option>
        <option value={LOCAL_URL}>Local API</option>
        <option value={REMOTE_URL}>Remote API</option>
      </select>
      <br /><br />
      <img src="https://www.rvcj.com/wp-content/uploads/2015/12/semicolon.jpg" className="img-fluid" alt="logo"/>
      <br/><br/>
      <p>Click the button to get five funnys</p>
      <button onClick={handleClick} className="btn btn-secondary">Click me</button>
      <br />
      {example.map(meme => (
      <div key={meme.imageUrl}>
      <p>{meme.title}</p>
      <img src={meme.imageUrl} className="img-fluid" alt=""></img>
      </div>
      ))}
  
    </div>
  );
}

