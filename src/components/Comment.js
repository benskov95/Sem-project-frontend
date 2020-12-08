import { useEffect, useState } from "react"
import memeFacade from "../facades/memeFacade"
import { Button, Form, Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { useParams } from "react-router-dom"
import "../styles/Meme.css";
import "react-bootstrap/dist/react-bootstrap.min"


export default function Comments({isLoggedIn}) {


  let username = localStorage.getItem("user")
  const [meme, setMeme] = useState({})
  const [comments, setComments] = useState([])
  let { meme_id } = useParams();
  const [newComment, setNewComment] = useState({ "username": username, "comment": "", "meme_id": meme_id })



  useEffect(() => {
    memeFacade.getMemeById(meme_id).then(res => setMeme(res))

  }, [])

  useEffect(() => {
    memeFacade.getComments(meme_id).then(comment => setComments(comment))
  }, [meme])

  const handleChange = (e) => {
    setNewComment({ ...newComment, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    memeFacade.addComment(newComment).then(res => {
      let refresh = [...comments]
      refresh.push(res)
      setComments(refresh)
      setNewComment({ "username": username, "comment": "", "meme_id": meme_id })
    })
  }


  return (

      <Container className="content" style={{marginTop: "80px"}}>
       <img className="meme-img" src={meme.imageUrl} alt="" />    
          
         <div className="commentForm">
           {isLoggedIn ? (
         <Form reply onSubmit={handleSubmit}>
            <Form.TextArea onChange={handleChange} name={"comment"} value={newComment.comment} />
            <Button style={{backgroundColor : "#5a6268"}} content='Add Comment' labelPosition='left' icon='edit' primary />
          </Form>  

           ): <p style={{color : "red"}}>You must be logged in to comment</p>}
           
          </div>    
          
          {comments.map(comment => 
           <div className="commentContent" key={comment.username + comment.dateOfPost}> 
              <div className="commentHeader">
                {comment.username === username ? (
                  <h3>{comment.username} (me)</h3>
                ) : 
                  <h3>{comment.username}</h3>
                }
              </div>
              <div className="commentTime">{comment.dateOfPost}</div> 
              <div className="profilpicture">
              <img className="profileImg" src={comment.profilePicture} alt=""/>
              </div>
          <div className="commentText"><span>{comment.comment}</span></div>
                                    
         </div>
       )} 
      

      </Container>

  )


}