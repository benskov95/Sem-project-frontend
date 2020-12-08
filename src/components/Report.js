import { Modal } from "react-bootstrap";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import memefacade from "../facades/memeFacade"

export default function Report ({showReport, handleShowReport, meme_id}){
    let username = localStorage.getItem("user")
    let initState = {"description" : "", "meme_id" : meme_id, "username" : username}
    const [errorMsg, setErrorMsg] = useState("")
    const [msg, setMsg] = useState("")
    const [report, setReport] = useState(initState)

    const handleChange =(e) =>{
        setMsg("")
        setErrorMsg("")
        setReport({...report , [e.target.name]: e.target.value})
    }

    const submitReport = (e) =>{
        e.preventDefault()
        if(report.description.length < 1){
            setErrorMsg("Choose a category")
        } else {

        memefacade.reportMeme(report).then(res => {
        setMsg("Your report has been submitted - Thanks!") 
        setReport(initState)    
    })
        .catch(error => printError(error, setErrorMsg))
    }}

    return (
        
        <Modal show={showReport} onHide={handleShowReport}>
        
        <Modal.Header closeButton>
          <Modal.Title style={{ marginLeft: "42.3%" }}>Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form onChange={handleChange} onSubmit={submitReport}>
                
                 <input className="radio-inline" type="radio" value="Pornography" name="description"/> Pornography
                 <br/>
                 <input className="radio-inline"  type="radio" value="Self-Harm" name="description" /> Self-Harm
                 <br/>
                 <input className="radio-inline"  type="radio" value="Violence" name="description" /> Violence
                 <br/>
                 <input className="radio-inline"  type="radio" value="Illegal activities" name="description" /> Illegal activities
                 <br/>
                 <input className="radio-inline"  type="radio" value="Offensive language" name="description" /> Offensive language
                 <br/>
                 <br/>
                
            <input
            type="submit"
            value="Report"
            className="btn btn-secondary"
          ></input>
            </form>
            <p style={{color : "green"}}>{msg}</p>
            <p style={{color : "red"}}>{errorMsg}</p>
        </Modal.Body>
      </Modal>)
}

const printError = (promise, setError) => {
    promise.fullError.then(function (status) {
      setError(`${status.message}`);
    });
  };