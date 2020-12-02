import {useEffect ,useState } from "react"
import memeFacade from "../facades/memeFacade"
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import Segment from "semantic-ui-segment"
import { Container } from "react-bootstrap"

export default function Comments () {


    let username = localStorage.getItem("user")
    const [comments, setComments] = useState([])
    //const [newComment, setNewComment] = useState({"username" : username, "comment" : "", "meme_id" : meme.meme_id})
    
  //  useEffect (() => {
    //    memeFacade.getComments().then(comment => setComments(comment))
   // },[])

    const handleChange = (e) => {
 //       setNewComment({ ...newComment, [e.target.name]: e.target.value });
    }

 //   const handleSubmit = (e) =>{
  //      e.preventDefault()
  //      memeFacade.addComment(newComment).then(res => {
   //         let refresh = [...comments]
   //         refresh.push(res)
   //         setComments(refresh)
   //     })
  //  }
    

    return(
        <div className="comment">
   
    <Comment.Group size="large"> 
    <Container> 
    <Comment>
      <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
      <Comment.Content>
        <Comment.Author>Joe Henderson</Comment.Author>
        <Comment.Metadata>
          <div>1 day ago</div>
        </Comment.Metadata>
        <Comment.Text>
          <p>
            The hours, minutes and seconds stand as visible reminders that your
            effort put them all there.
          </p>
          <p>
            Preserve until your next run, when the watch lets you see how
            Impermanent your efforts are.
          </p>
        </Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>
    </Container>
    <Comment>
      <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/christian.jpg' />
      <Comment.Content>
        <Comment.Author>Christian Rocha</Comment.Author>
        <Comment.Metadata>
          <div>2 days ago</div>
        </Comment.Metadata>
        <Comment.Text>I re-tweeted this.</Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>

    <Form reply>
      <Form.TextArea />
      <Button content='Add Comment' labelPosition='left' icon='edit' primary />
    </Form>
  </Comment.Group>
  </div>
)
       

}