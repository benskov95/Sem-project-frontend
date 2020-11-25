import { useEffect, useState } from "react";
import { LOCAL_URL, REMOTE_URL } from "../utils/settings";
import memeFacade from "../facades/memeFacade";
import React from "react"
import styled from 'styled-components';

const GridWrapper = styled.div`
  grid-gap: 10px;
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 6em;
`; 

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
      memeFacade.getMeme().then((data) => setExample(data));
    };

  return (
    <GridWrapper>
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
      <p>Click the button to get five funny memes</p>
      <button onClick={handleClick} className="btn btn-secondary">Click me</button>
      <br />
      {example.map(meme => (
      <div key={meme.imageUrl}>
      <p>{meme.title}</p>
      <img src={meme.imageUrl} className="img-fluid" alt=""></img>
      </div>
      ))}
  
    </GridWrapper>
  );
}

