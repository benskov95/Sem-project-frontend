import { useEffect, useState } from "react"
import memeFacade from "../facades/memeFacade"
import { Button, Form, Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { useParams } from "react-router-dom"
import "../styles/Meme.css";
import "react-bootstrap/dist/react-bootstrap.min"
import styled from 'styled-components';


export default function Comments() {

  
  const GridWrapper = styled.div`
  grid-gap: 10px;
  margin-top: 80px;
  margin-left: 6em;
  margin-right: 6em;
  `; 


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
    <GridWrapper>
      <Container className="content">
       <img className="meme-img" src={meme.imageUrl} alt="" />    
          
         <div className="commentForm">
         <Form reply onSubmit={handleSubmit}>
            <Form.TextArea onChange={handleChange} name={"comment"} value={newComment.comment} />
            <Button style={{backgroundColor : "#5a6268"}} content='Add Comment' labelPosition='left' icon='edit' primary />
          </Form>  
          </div>    
          
          {comments.map(comment => 
           <div className="commentContent"> 
              <div className="commentHeader">
              <h3 >{comment.username}</h3></div>
              <div className="commentTime">{comment.dateOfPost}</div> 
              <div className="profilpicture">
              <img className="profileImg" src={comment.profilePicture} alt=""/>
              </div>
          <div className="commentText"><span>{comment.comment}</span></div>
                                    
         </div>
       )} 
      
       
         
         

      </Container>
      </GridWrapper>
  )


}