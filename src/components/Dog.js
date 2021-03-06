import Content from "./Content";
import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import memeFacade from "../facades/memeFacade"
import { Button } from "react-bootstrap"
const GridWrapper = styled.div`
  grid-gap: 10px;
  margin-top: 80px;
  margin-left: 6em;
  margin-right: 6em;
`;


export default function Dog({isLoggedIn, blacklistedMemes}) {

    const [dogs, setDogs] = useState([]);
    useEffect(() => {
        memeFacade.getDogs().then(res => setDogs(res))

    }, [])

    const loadMore = (e) => {
        e.preventDefault()
        memeFacade.getDogs().then(res => setDogs([...dogs, ...res])
        )
    }


    return (
        <GridWrapper>
           {dogs.map(dog => 
           <Content 
           meme={dog} 
           key={dog.imageUrl} 
           loadMore={loadMore} 
           hasVotes={false}
           isLoggedIn={isLoggedIn}
           blacklistedMemes={blacklistedMemes}
           />)}
          <Button onClick={loadMore} className="btn btn-secondary">Load more</Button>
        </GridWrapper>

    )
}