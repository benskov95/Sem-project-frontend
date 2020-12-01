import {useEffect ,useState } from "react"
import { useParams } from "react-router-dom"
import memeFacade from "../facades/memeFacade"


export default function Comment ({meme}) {

    const [comments, setComments] = useState([])

    
    useEffect (() => {
        memeFacade.getComments(meme.meme_id).then(comment => setComments(comment))
   
    },[])
    

    return(
        <div>
        {comments.map(comment => <li key={meme.id}>{comment.comment}</li>)}
        <input></input>
        </div>
    ) 
       

}