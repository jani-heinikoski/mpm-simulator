import React, { useState } from "react";

import PropTypes from "prop-types";

import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import DismissibleAlert from "../DismissibleAlert";

const InitializeRegistersModal = ({
    show,
    onHide,
    initializeRegisters,
    initialState,
}) => {
    const [showAlert, setShowAlert] = useState(false);
    const [alertHeading, setAlertHeading] = useState("");
    const [alertContent, setAlertContent] = useState("");
    const [alertVariant, setAlertVariant] = useState("success");

    const [registers, setRegisters] = useState(initialState);

    const showInvalidValueWarning = (register) => {
        setAlertHeading(`Invalid value in ${register}!`);
        setAlertVariant("danger");
        setAlertContent(
            "Make sure you entered an integer within ranger [-32768, 32767]"
        );
        setShowAlert(true);
    };

    const showInitializedRegistersAlert = () => {
        setAlertHeading("Initialized registers successfully!");
        setAlertVariant("success");
        setAlertContent(
            `Registers initialized with values (A, B, C, D) = (${registers.A}, ${registers.B}, ${registers.C}, ${registers.D}).`
        );
        setShowAlert(true);
    };

    /**
     * Handles oninput event for updating registers' values
     * @param {*} e
     * @param {String} register
     */
    const handleValueChanged = (e, register) => {
        const targetValue = e?.target?.value;
        try {
            const targetValueAsInteger = parseInt(targetValue);
            if (isNaN(targetValueAsInteger)) {
                setRegisters((previous) => {
                    const updatedValue = { ...previous };
                    updatedValue[register] = 0;
                    return updatedValue;
                });
            } else {
                setRegisters((previous) => {
                    const updatedValue = { ...previous };
                    updatedValue[register] = targetValueAsInteger;
                    return updatedValue;
                });
            }
        } catch {}
    };

    /**
     * Returns controls for inputting values into register enclosed in a Form.Group component
     * @param {String} register
     * @returns Form.Group
     */
    const createInputForRegister = (register) => {
        const controlId = "InitializeRegistersModal." + register;
        const valueOfRegisterString = "Value of " + register;
        return (
            <Form.Group controlId={controlId}>
                <Form.Label className="fs-5">
                    {valueOfRegisterString}
                </Form.Label>
                <Form.Control
                    placeholder="Enter value within: [-32768, 32767]"
                    aria-label={valueOfRegisterString}
                    type="number"
                    max={32767}
                    min={-32768}
                    onInput={(e) => handleValueChanged(e, register)}
                    defaultValue={registers[register]}
                />
            </Form.Group>
        );
    };

    /**
     * Calls the prop function initalizeRegisters if all registers are within valid range
     */
    const onInitalizeRegistersClick = () => {
        let wasInvalid = false;
        for (const register of Object.keys(registers)) {
            if (
                isNaN(registers[register]) ||
                registers[register] > 32767 ||
                registers[register] < -32768
            ) {
                showInvalidValueWarning(register);
                wasInvalid = true;
            }
        }
        if (!wasInvalid) {
            initializeRegisters(registers);
            showInitializedRegistersAlert();
        }
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
                <Modal.Title>
                    {"Give initial values to registers A-D"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <DismissibleAlert
                    className="my-4 fs-6"
                    show={showAlert}
                    variant={alertVariant}
                    heading={alertHeading}
                    content={alertContent}
                    onClose={() => setShowAlert(false)}
                />
                <Form className="my-4">
                    <Stack gap={4}>
                        {["A", "B", "C", "D"].map((register) => (
                            <div key={register}>
                                {createInputForRegister(register)}
                            </div>
                        ))}
                        <Button
                            id="initialize-registers"
                            variant="outline-success"
                            size="lg"
                            className="fs-5"
                            onClick={() => onInitalizeRegistersClick()}
                        >
                            Initialize registers
                        </Button>
                    </Stack>
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

InitializeRegistersModal.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    initializeRegisters: PropTypes.func,
    initialState: PropTypes.shape({
        A: PropTypes.number,
        B: PropTypes.number,
        C: PropTypes.number,
        D: PropTypes.number,
    }),
};

InitializeRegistersModal.defaultProps = {
    initialState: { A: 0, B: 0, C: 0, D: 0 },
};

export default InitializeRegistersModal;
