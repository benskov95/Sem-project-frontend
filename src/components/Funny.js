import { useState, useEffect } from "react";
import { LOCAL_URL } from "../utils/settings";
import "../styles/Meme.css";
import { faFire, faSnowflake } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

export let URL = LOCAL_URL;

export default function Funny() {
  const [funnys, setFunnys] = useState([])

  useEffect(() => {
      memeFacade.getMeme().then(res => setFunnys(res))

  }, [])

  const loadMore = (e) => {
      e.preventDefault()
      memeFacade.getMeme().then(res => setFunnys([...setFunnys, ...res]))
  }


  return (
    <GridWrapper>
    {funnys.map(funny => <Content meme={funny} key={funny.imageUrl} loadMore={loadMore} />)}
          <Button onClick={loadMore} className="btn btn-secondary">Load more</Button>
  </GridWrapper>
  )
}
