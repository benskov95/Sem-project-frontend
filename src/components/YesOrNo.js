import { useEffect, useState } from 'react';
import styled from 'styled-components';
import memeFacade from "../facades/memeFacade"
import { Button } from "react-bootstrap"
import Content from "./Content"
const GridWrapper = styled.div`
  grid-gap: 10px;
  margin-top: 80px;
  margin-left: 6em;
  margin-right: 6em;
`;



export default function YesOrNo({isLoggedIn, blacklistedMemes}) {

    const [yons, setYons] = useState([])

    useEffect(() => {
        memeFacade.getYon().then(res => setYons(res))

    }, [])

    const loadMore = (e) => {
        e.preventDefault()
        memeFacade.getYon().then(res => setYons([...yons, ...res]))
    }


    return (
        <GridWrapper>
           {yons.map(yon => 
           <Content 
           meme={yon} 
           key={yon.imageUrl} 
           loadMore={loadMore} 
           hasVotes={false}
           isLoggedIn={isLoggedIn}
           blacklistedMemes={blacklistedMemes}
           />)}
          <Button onClick={loadMore} className="btn btn-secondary">Load more</Button>
        </GridWrapper>
    );
}