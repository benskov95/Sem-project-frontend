import React, { useState } from "react";
import apiFacade from "../base-facades/apiFacade";
import { URL } from "../components/Funny";
import { Modal } from "react-bootstrap";

export default function EditModal({handleShowEdit, showEdit}) {
    return (
        <Modal show={showEdit} onHide={handleShowEdit}>
        <Modal.Header closeButton>
          <Modal.Title>My account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Weed</p>
        </Modal.Body>
      </Modal>
    )
}