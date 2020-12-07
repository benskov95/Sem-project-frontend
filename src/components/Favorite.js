import Content from "./Content";
import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import memeFacade from "../facades/memeFacade"
import "../styles/Meme.css"

const GridWrapper = styled.div`
  grid-gap: 10px;
  margin-top: 80px;
  margin-left: 6em;
  margin-right: 6em;
`;


export default function Favorite({ isLoggedIn, user }) {

    const [favoriteList, setFavoriteList] = useState([]);
    useEffect(() => {
        if (isLoggedIn) {
            memeFacade.getFavoriteList(user).then(res => setFavoriteList(res))
        }

    }, [])

    const loadMore = (e) => {
        e.preventDefault()
        if (isLoggedIn) {
            memeFacade.getFavoriteList(user)
            .then(res => setFavoriteList([...favoriteList, ...res]))
         }
    }


    return (
        <div>
        {isLoggedIn ? (
            <div>
            <GridWrapper>
                {favoriteList.map(favoriteListItem => <Content meme={favoriteListItem} key={favoriteListItem.imageUrl} loadMore={loadMore} hasVotes={true} />)}
            </GridWrapper>
            </div>
        ) : <GridWrapper>
            <h1>You must be logged in to view this page.</h1>
            <img className="content" src="https://yesno.wtf/assets/no/28-e19b6f658f621f7c5980a33f8249a65d.gif" />
            </GridWrapper>}
        </div>
    )
}