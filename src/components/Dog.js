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




export default function Dog() {

    const [dogs, setDogs] = useState([]);
    useEffect(() => {
        memeFacade.getDogs().then(res => setDogs(res))

    }, [])


    return (
        <GridWrapper>
            <Content memes={dogs} />
        </GridWrapper>

    )
}