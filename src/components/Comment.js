import { useEffect, useState } from "react"
import memeFacade from "../facades/memeFacade"
import { Button, Comment, Form, Header, Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { useParams } from "react-router-dom"
import "../styles/Meme.css";

export default function Comments() {


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
    <Container style={{ margin: 100 }}>
      <div className="comment">
        <img className="meme-img" src={meme.imageUrl} alt="" />
        <Comment.Group size="large">
          {comments.map(comment =>
            <div className="container" style={{ border: "1px solid black" }}>
              <Comment style={{}}>
                <Comment.Avatar as='a' src={comment.profilePicture} />
                <Comment.Content>
                  <Comment.Author style={{ float: 'left' }}>{comment.username}</Comment.Author>
                  <Comment.Metadata>
                    <div>{comment.dateOfPost}</div>
                  </Comment.Metadata>
                  <Comment.Text className="commentText">
                    {comment.comment}
                  </Comment.Text>
                </Comment.Content>
              </Comment>
              <br></br>
            </div>


          )}
          <Form reply onSubmit={handleSubmit}>
            <Form.TextArea onChange={handleChange} name={"comment"} value={newComment.comment} />
            <Button content='Add Comment' labelPosition='left' icon='edit' primary />
          </Form>
        </Comment.Group>
      </div>
    </Container >
  )


}