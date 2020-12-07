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


export default function Cold() {
    const [coldList, setColdList] = useState([]);
    
    useEffect(() => {
        memeFacade.getColdList().then(res => setColdList(res))

    }, [])

    const loadMore = (e) => {
        e.preventDefault()
        memeFacade.getColdList().then(res => setColdList([...coldList, ...res])
        )
    }


    return (
        <GridWrapper>
            {coldList.map(coldListItem => <Content hasVotes={true} meme={coldListItem} key={coldListItem.imageUrl} loadMore={loadMore} />)}
        </GridWrapper>

    )
}