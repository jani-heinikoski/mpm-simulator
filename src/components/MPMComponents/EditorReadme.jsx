import React from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";

const EditorReadme = () => {
    return (
        <>
            <Row>
                <Col>
                    <h2>Read Me</h2>
                    <Alert variant="warning" className="text-dark fw-bold fs-5">
                        This simulator does not currently support saving session
                        data in your browser's local storage. All data will be
                        lost if you close the website or navigate outside of the
                        simulator/editor views. Use the "manage program"
                        -functionality to copy your microprogram and save it
                        locally on your machine if you wish to persist it.
                    </Alert>
                    <p className="fs-5">
                        In this view you can create your microprogram. You can
                        create microinstructions by selecting the control bits
                        using the select elements below, then enter the address
                        of the microprogram memory (0-255) to save the
                        microinstruction into. You can see the whole
                        microprogram at the bottom of this page. Clicking the
                        microinstructions in the microprogram table selects the
                        control bits and address of the microinstruction
                        automatically (you can use this functionality to edit
                        your microinstructions).
                    </p>
                    <p className="fs-5">
                        You can also give initial values for registers A-D and
                        to arbitrary main memory locations by clicking the
                        "Initialize Registers" -button and the "Initialize Main
                        Memory" -button respectively. Note that this is not
                        normally possible but has been added to improve user
                        experience. Click the "Simulate Program" -button when
                        your microprogram is ready for simulation. You can click
                        the "Edit Microprogram" -button in the simulation view
                        to continue working on your microprogram.
                    </p>
                </Col>
            </Row>
        </>
    );
};

export default EditorReadme;
