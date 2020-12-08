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


export default function Cold({isLoggedIn, blacklistedMemes}) {
    const [coldList, setColdList] = useState([]);
    
    useEffect(() => {
        memeFacade.getColdList().then(res => {
            let sorted = [...res];
            sorted.sort(function(a, b) {
                return b.downvotes - a.downvotes;
            }) 
            setColdList([...sorted]);
        })
    }, [])


    return (
        <GridWrapper>
            {coldList.map(coldListItem => 
            <Content 
            hasVotes={true} 
            meme={coldListItem} 
            key={coldListItem.imageUrl} 
            isLoggedIn={isLoggedIn}
            blacklistedMemes={blacklistedMemes}
            />)}
        </GridWrapper>

    )
}