import { Form, Modal } from "react-bootstrap";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Report ({showReport, handleShowReport, meme_id}){
    
    const [report, setReport] = useState({"description" : "", "meme_id" : meme_id})

    const handleChange =(e) =>{
        
        setReport({...report , [e.target.name]: e.target.value})
    }

    const submitReport = (e) =>{
        e.prevent.default()
        
    }

    return (
        
        <Modal show={showReport} onHide={handleShowReport}>
        
        <Modal.Header closeButton>
          <Modal.Title style={{ marginLeft: "42.3%" }}>Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form onChange={handleChange} onSubmit={submitReport}>
                
              <input className="radio-inline" type="radio" value="Racist" name="description" />Racist
                  <br/>
                 <input className="radio-inline"  type="radio" value="Sex" name="description" />Sex
                 <br/>
                 <input className="radio-inline"  type="radio" value="Other" name="description" />Other
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