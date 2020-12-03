import { useState, useEffect } from "react";
import { API_URL } from "../utils/settings";
import "../styles/Meme.css";
import styled from 'styled-components';
import memeFacade from "../facades/memeFacade"
import Content from "./Content"
import {Button} from "react-bootstrap"


const GridWrapper = styled.div`
  grid-gap: 10px;
  margin-top: 80px;
  margin-left: 6em;
  margin-right: 6em;
`; 

export let URL = API_URL;

export default function Funny({isLoggedIn}) {
  const [funnys, setFunnys] = useState([])

  useEffect(() => {
      memeFacade.getMeme().then(res => setFunnys(res))

  }, [])

  const loadMore = (e) => {
      e.preventDefault()
      memeFacade.getMeme().then(res => setFunnys([...funnys, ...res]))
  }


  return (
    <GridWrapper>
    {funnys.map(funny => 
    <Content 
    meme={funny} 
    key={funnys.indexOf(funny)} 
    loadMore={loadMore} 
    hasVotes={false}
    isLoggedIn={isLoggedIn}/>)}
          <Button onClick={loadMore} className="btn btn-secondary">Load more</Button>
  </GridWrapper>
  )
}
