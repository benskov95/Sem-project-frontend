import React from "react"


export default function Content ({memes}) {


    return (
  
    <React.Fragment>    
    {memes.map(meme =>  <div key={meme.imageUrl}><img className="meme-img" src={meme.imageUrl} alt=""/></div>)}
    
    </React.Fragment>    
    )
}