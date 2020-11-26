import { useEffect, useState } from 'react';
import styled from 'styled-components';
import memeFacade from "../facades/memeFacade"
import {Button} from "react-bootstrap"

const GridWrapper = styled.div`
  grid-gap: 10px;
  margin-top: 80px;
  margin-left: 6em;
  margin-right: 6em;
`; 



export default function YesOrNo() {

    const [yons, setYons] = useState([])

    useEffect (() => {
        memeFacade.getYon().then(res => setYons(res))

    },[])

    const loadMore = (e) =>{
        e.preventDefault()
        memeFacade.getYon().then(res => setYons([...yons, ...res]))
    }


    return (
        <GridWrapper>
            
           {yons.map(yon =>  <div><img className="meme-img" src={yon.imageUrl} alt=""/></div>)}
           <Button onClick={loadMore} className="btn btn-outline-info">Load more</Button>
        </GridWrapper>
    );
}