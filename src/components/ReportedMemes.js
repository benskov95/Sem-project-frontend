import adminFacade from "../base-facades/adminFacade";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

export default function ReportedMemes() {

    const [reports, setReports] = useState([]);
    const [msg, setMsg] = useState("");
    const [show, setShow] = useState(false);

    useEffect(() => {
        adminFacade.getReportedMemes().then((memes) => setReports(memes));
    }, [msg]);

    const handleShow = () => {
        setShow(!show)
    }

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
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
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((meme) => {
                            console.log(meme.reports)
                            let description = meme.reports.map(report => report.description)
                            let filter = description.filter(onlyUnique).join(", ")
                            return (
                                <React.Fragment>
                                    <tr key={meme.meme_id}>
                                        <td><img src={meme.imageUrl} style={{ maxWidth: 55 }} onClick={handleShow}></img></td>
                                        <td>{filter}</td>
                                        <td>{meme.reports.length}</td>
                                        <ImageModal imageUrl={meme.imageUrl} show={show} handleShow={handleShow} />
                                    </tr>

                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const ImageModal = ({ imageUrl, show, handleShow }) => {
    return (
        <Modal show={show} onHide={handleShow} key={imageUrl}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <img src={imageUrl} className="img-fluid"></img>
            </Modal.Body>
        </Modal>
    );
}