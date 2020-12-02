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


export default function Favorite({ user }) {

    let username = localStorage("user");

    const [favoriteList, setFavoriteList] = useState([]);
    useEffect(() => {
        memeFacade.getFavoriteList(username).then(res => setFavoriteList(res))

    }, [])

    const loadMore = (e) => {
        e.preventDefault()
        memeFacade.getFavoriteList(username).then(res => setFavoriteList([...favoriteList, ...res])
        )
    }


    return (
        <GridWrapper>
            {favoriteList.map(favoriteListItem => <Content meme={favoriteListItem} key={favoriteListItem.imageUrl} loadMore={loadMore} />)}
            <Button onClick={loadMore} className="btn btn-secondary">Load more</Button>
        </GridWrapper>

    )
}