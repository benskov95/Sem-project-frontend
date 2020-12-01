import {useEffect ,useState } from "react"
import memeFacade from "../facades/memeFacade"


export default function Comment ({meme, isOpen}) {

    let username = localStorage.getItem("user")
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState({"username" : username, "comment" : "", "meme_id" : meme.meme_id})
    
    useEffect (() => {
        memeFacade.getComments(meme.meme_id).then(comment => setComments(comment))
    },[])

    const handleChange = (e) => {
        setNewComment({ ...newComment, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        memeFacade.addComment(newComment).then(res => {
            let refresh = [...comments]
            refresh.push(res)
            setComments(refresh)
        })
    }
    

    return(
        <div>
        {isOpen ? (
           <div>
               <form onSubmit={handleSubmit}>
            {comments.map(comment => <li key={meme.id}>{comment.comment}</li>)}
            <input
            onChange={handleChange}
            value={newComment.comment}
            name="comment"
          ></input>
            <input
            type="submit"
            value="Submit"
            className="btn btn-secondary"
          ></input>
            </form>
            </div>
        ) : ""}
       </div>
    ) 
       

}