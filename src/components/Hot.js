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


export default function Hot() {
    const [hotList, setHotList] = useState([]);

    useEffect(() => {
        memeFacade.getHotList().then(res => setHotList(res))
    }, [])

    const loadMore = (e) => {
        e.preventDefault()
        memeFacade.getHotList().then(res => setHotList([...hotList, ...res])
        )
    }


    return (
        <GridWrapper>
            {hotList.map(hotListItem => <Content hasVotes={true} meme={hotListItem} key={hotListItem.imageUrl} loadMore={loadMore} />)}
        </GridWrapper>

    )
}