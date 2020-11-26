import { useEffect, useState } from 'react';
import styled from 'styled-components';
import memeFacade from "../facades/memeFacade"
import {Button} from "react-bootstrap"
import Content from "./Content"

const GridWrapper = styled.div`
  grid-gap: 10px;
  margin-top: 80px;
  margin-left: 6em;
  margin-right: 6em;
`; 



export default function Cat() {

    const [cats, setCats] = useState([])

    useEffect (() => {
        memeFacade.getCat().then(res => setCats(res))

    },[])

    const loadMore = (e) =>{
        e.preventDefault()
        memeFacade.getCat().then(res => setCats([...cats, ...res]))
    }


    return (
        <GridWrapper>
          <Content memes={cats}/>
           <Button onClick={loadMore} className="btn btn-secondary">Load more</Button>
        </GridWrapper>
    );
}