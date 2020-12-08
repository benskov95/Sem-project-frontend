import adminFacade from "../base-facades/adminFacade";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

export default function ReportedMemes() {

    const [reports, setReports] = useState([]);
    const [msg, setMsg] = useState("");
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState("");

    useEffect(() => {
        adminFacade.getReportedMemes().then((memes) => setReports(memes));
    }, [msg]);

    const handleShow = (e) => {
        if (typeof e !== "undefined") {
            setSelected(e.target.id);
        }
        setShow(!show)
    }

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    const blacklistMeme = () => {
        
    }

    const dismissReports = () => {
        
    }

    return (
        <div>
            <h1>Hello Admin</h1>
            <br />
            <h3>List of reported memes</h3>
            <p style={{ color: 'red' }}>{msg !== "" ? `${msg}` : ""} </p>
            <br />
            <div className="containerTable">
                <table className="table table-striped" style={{ border: '2px solid lightgrey' }}>
                    <thead>
                        <tr>
                            <th>Meme</th>
                            <th>Flagged as</th>
                            <th>Number of reports</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map(meme => {
                            let description = meme.reports.map(report => report.description)
                            let filter = description.filter(onlyUnique).join(", ")
                            return (
                                <React.Fragment key={meme.meme_id}>
                                    <tr key={meme.meme_id}>
                                        <td>
                                            <img 
                                            id={meme.imageUrl} 
                                            src={meme.imageUrl} 
                                            style={{ maxWidth: 55 }} 
                                            onClick={handleShow}
                                            alt=""
                                            >
                                            </img>
                                        </td>
                                        <td>{filter}</td>
                                        <td>{meme.reports.length}</td>
                                        <td>
                                            <button
                                             onClick={blacklistMeme} 
                                             className="btn btn-dark"
                                             > Blacklist
                                             </button>
                                        </td>
                                        <td>
                                            <button
                                            onClick={dismissReports}
                                            className="btn btn-secondary"
                                            > Dismiss
                                            </button>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <ImageModal imageUrl={selected} show={show} handleShow={handleShow} />
        </div>
    );
}

const ImageModal = ({ imageUrl, show, handleShow }) => {
    return (
        <Modal show={show} onHide={handleShow} key={imageUrl}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <img alt="" src={imageUrl} className="img-fluid"></img>
            </Modal.Body>
        </Modal>
    );
}