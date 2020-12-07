import Content from "./Content";
import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import memeFacade from "../facades/memeFacade"

const GridWrapper = styled.div`
  grid-gap: 10px;
  margin-top: 80px;
  margin-left: 6em;
  margin-right: 6em;
`; 

export default function Submissions() {
    const [userMemes, setUserMemes] = useState([]);

    useEffect(() => {
        memeFacade.getUserMemes()
        .then(memes => setUserMemes([...memes]));
    }, [])

    return (
        <GridWrapper>
            {userMemes.map(meme => <Content hasVotes={true} meme={meme} key={meme.imageUrl} />)}
        </GridWrapper>
    )
}