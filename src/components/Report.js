import { Form, Modal } from "react-bootstrap";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import memefacade from "../facades/memeFacade"

export default function Report ({showReport, handleShowReport, meme_id}){
    
    const [report, setReport] = useState({"description" : "", "meme_id" : meme_id})

    const handleChange =(e) =>{
        
        setReport({...report , [e.target.name]: e.target.value})
    }

    const submitReport = (e) =>{
        e.preventDefault()
        memefacade.reportMeme(report).then(handleShowReport)

    }

    return (
        
        <Modal show={showReport} onHide={handleShowReport}>
        
        <Modal.Header closeButton>
          <Modal.Title style={{ marginLeft: "42.3%" }}>Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form onChange={handleChange} onSubmit={submitReport}>
                
              <input className="radio-inline" type="radio" value="Pornography" name="description" />Pornography
                  <br/>
                 <input className="radio-inline"  type="radio" value="Self-Harm" name="description" />Self-Harm
                 <br/>
                 <input className="radio-inline"  type="radio" value="Violent" name="description" />Violent
                 <br/>
                 <input className="radio-inline"  type="radio" value="Illegal activities" name="description" />Illegal activities
                 <br/>
                 <br/>
                
            <input
            type="submit"
            value="Report"
            className="btn btn-secondary"
          ></input>
            </form>
        </Modal.Body>
      </Modal>)
}