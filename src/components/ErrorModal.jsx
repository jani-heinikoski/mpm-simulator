import React from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ErrorModal = ({ show, onHide, heading, body }) => {
    return (
        <Modal
            show={show}
            backdrop="static"
            keyboard={false}
            size="lg"
            centered
        >
            <Modal.Header>
                <Modal.Title>{heading || "Error"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{body || "Something went wrong!"}</Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={onHide}>
                    I understand
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ErrorModal;
