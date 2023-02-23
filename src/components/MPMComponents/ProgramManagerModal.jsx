import React, { useState } from "react";

import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import DismissibleAlert from "../DismissibleAlert";

import parseProgram from "../../utility/parseProgram";

const ProgramManagerModal = ({
    show,
    onHide,
    currentProgram,
    onLoadProgram,
}) => {
    const [programAsString, setProgramAsString] = useState(
        currentProgram?.toString().replace(/,/g, "\n")
    );

    const [showAlert, setShowAlert] = useState(false);
    const [alertHeading, setAlertHeading] = useState("");
    const [alertContent, setAlertContent] = useState("");
    const [alertVariant, setAlertVariant] = useState("success");

    const showInvalidProgramWarning = () => {
        setAlertHeading("Invalid program!");
        setAlertVariant("danger");
        setAlertContent(
            "You gave an invalid microprogram. Check that all instructions are 22 bits long and contain only zeros and ones. There can only be a maximum of 256 instructions."
        );
        setShowAlert(true);
    };

    const showCopiedSuccessfully = () => {
        setAlertHeading("Copied successfully!");
        setAlertVariant("success");
        setAlertContent(
            "The microprogram has been successfully copied to your clipboard. You can paste it into a text file on your local machine if you want to save it."
        );
        setShowAlert(true);
    };

    const showUnableToCopyWarning = () => {
        setAlertHeading("Unable to copy to clipboard!");
        setAlertVariant("danger");
        setAlertContent(
            "Something went wrong with automatically copying the program to your clipboard."
        );
        setShowAlert(true);
    };

    const copyProgramToClipboard = () => {
        navigator.clipboard
            .writeText(programAsString)
            .then(() => showCopiedSuccessfully())
            .catch((err) => showUnableToCopyWarning());
    };

    const onProgramChanged = (e) => {
        const targetValue = e?.target?.value;
        if (targetValue) {
            setProgramAsString(targetValue);
        }
    };

    const showProgramLoadedSuccessfully = () => {
        setAlertHeading("Program loaded successfully!");
        setAlertVariant("success");
        setAlertContent("The microprogram has been successfully loaded.");
        setShowAlert(true);
    };

    const loadProgram = () => {
        try {
            const program = parseProgram(programAsString);
            if (Array.isArray(program)) {
                onLoadProgram(program);
                showProgramLoadedSuccessfully();
                return;
            }
        } catch {}
        showInvalidProgramWarning();
    };

    return (
        <Modal
            show={show}
            backdrop="static"
            keyboard={false}
            size="lg"
            centered
        >
            <Modal.Header>
                <Modal.Title>{"Microprogram Manager"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stack direction="horizontal" gap={2} className="mb-2">
                    <Button
                        variant="outline-success"
                        onClick={() => copyProgramToClipboard()}
                    >
                        Copy To Clipboard
                    </Button>
                    <Button
                        variant="outline-success"
                        onClick={() => loadProgram()}
                    >
                        Load Microprogram
                    </Button>
                </Stack>
                <DismissibleAlert
                    className="my-4 fs-6"
                    show={showAlert}
                    variant={alertVariant}
                    heading={alertHeading}
                    content={alertContent}
                    onClose={() => setShowAlert(false)}
                />
                <Form className="my-4">
                    <Form.Group controlId="ProgramManager.Microprogram">
                        <Form.Label>
                            <h5>Microprogram:</h5>
                            <p>After editing, click load microprogram</p>
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={8}
                            onInput={onProgramChanged}
                            defaultValue={programAsString}
                            style={{
                                cursor: "auto",
                            }}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ProgramManagerModal;
