import React, { useState } from "react";

import PropTypes from "prop-types";

import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

import DismissibleAlert from "../DismissibleAlert";
import HorizontalDivider from "../HorizontalDivider";

/**
 *
 * @param {Number[]} mainMemory
 * @returns {Object[]} initializedValues
 */
const findInitializedValues = (mainMemory) => {
    if (!Array.isArray(mainMemory)) {
        return [];
    }
    const initializedValues = [];
    for (let address = 0; address < mainMemory.length; address++) {
        if (mainMemory[address] !== 0) {
            initializedValues.push({
                address: address,
                value: mainMemory[address],
            });
        }
    }
    return initializedValues;
};

const InitializeMainMemoryModal = ({
    show,
    onHide,
    initializeMainMemory,
    initialMainMemory,
}) => {
    const [showAlert, setShowAlert] = useState(false);
    const [alertHeading, setAlertHeading] = useState("");
    const [alertContent, setAlertContent] = useState("");
    const [alertVariant, setAlertVariant] = useState("success");

    // Find the already initialized (address, value) pairs from the initialMainMemory
    const [initializedValues, setInitializedValues] = useState(
        findInitializedValues(initialMainMemory)
    );

    const [address, setAddress] = useState(0);
    const [value, setValue] = useState(0);

    const showInvalidAddressWarning = () => {
        setAlertHeading(`Invalid address!`);
        setAlertVariant("danger");
        setAlertContent(
            "Make sure you entered an integer within range [0, 4095]"
        );
        setShowAlert(true);
    };

    const showInvalidValueWarning = () => {
        setAlertHeading(`Invalid value!`);
        setAlertVariant("danger");
        setAlertContent(
            "Make sure you entered an integer within range [-32768, 32767]"
        );
        setShowAlert(true);
    };

    const showInitializedMainMemoryAlert = () => {
        setAlertHeading("Initialized main memory successfully!");
        setAlertVariant("success");
        setAlertContent(`Main memory has been successfully initialized.`);
        setShowAlert(true);
    };

    /**
     * Event handler for oninput events
     * @param {*} e
     */
    const handleChanged = (e, setter) => {
        const targetValue = e?.target?.value;
        try {
            const targetValueAsInteger = parseInt(targetValue);
            if (isNaN(targetValueAsInteger)) {
                setter(NaN);
            } else {
                setter(targetValueAsInteger);
            }
        } catch {}
    };

    /**
     * Event handler for the address' oninput event
     * @param {*} e
     */
    const handleAddressChanged = (e) => {
        handleChanged(e, setAddress);
    };

    /**
     * Event handler for the value's oninput event
     * @param {*} e
     */
    const handleValueChanged = (e) => {
        handleChanged(e, setValue);
    };

    /**
     * Returns true if address is integer and within range [0, 4095], otherwise false
     * @param {*} address
     * @returns {Boolean} isValid
     */
    const checkAddress = (address) => {
        return (
            !isNaN(address) &&
            Number.isInteger(address) &&
            address >= 0 &&
            address <= 4095
        );
    };

    /**
     * Returns true if value is integer and within range [-32768, 32767], otherwise false
     * @param {*} value
     * @returns {Boolean} isValid
     */
    const checkValue = (value) => {
        return (
            !isNaN(value) &&
            Number.isInteger(value) &&
            value >= -32768 &&
            value <= 32767
        );
    };

    /**
     * Checks the values that the user has given as initial values and shows a warning if they are invalid
     * @returns {Boolean} areValuesValid
     */
    const checkInitialValues = () => {
        // Check addressess and values
        for (const initialValue of initializedValues) {
            if (!checkAddress(initialValue.address)) {
                showInvalidAddressWarning();
                return false;
            }
            // Check if value is an integer
            if (!checkValue(initialValue.value)) {
                showInvalidValueWarning();
                return false;
            }
        }
        return true;
    };

    const checkAlreadyContainsAddress = (address) => {
        for (const initialValue of initializedValues) {
            if (initialValue.address === address) {
                return true;
            }
        }
        return false;
    };

    const onInitializeMainMemoryClick = () => {
        if (!checkInitialValues()) {
            return;
        }
        const initializedMainMemory = Array.from({ length: 4096 }).map(() => 0);
        for (const initialValue of initializedValues) {
            initializedMainMemory[initialValue.address] = initialValue.value;
        }
        initializeMainMemory(initializedMainMemory);
        showInitializedMainMemoryAlert();
    };

    const onAddInitialValueClick = () => {
        if (!checkAddress(address)) {
            showInvalidAddressWarning();
            return;
        }
        if (!checkValue(value)) {
            showInvalidValueWarning();
            return;
        }
        if (checkAlreadyContainsAddress(address)) {
            setInitializedValues((previous) => {
                const updatedValues = [...previous];
                for (const v of updatedValues) {
                    if (v.address === address) {
                        v.value = value;
                    }
                }
                return updatedValues;
            });
        } else {
            setInitializedValues((previous) => [
                ...previous,
                { address: address, value: value },
            ]);
        }
    };

    const onDeleteClick = (address) => {
        setInitializedValues((previous) =>
            previous.filter((initialValue) => initialValue.address !== address)
        );
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
                    {"Give initial values for the main memory"}
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
                        <Form.Group controlId="InitializeMainMemoryModal.address">
                            <Form.Label className="fs-5">Address</Form.Label>
                            <Form.Control
                                placeholder="Enter address within: [0, 4095]"
                                aria-label="Address"
                                type="number"
                                max={4095}
                                min={0}
                                onInput={handleAddressChanged}
                                defaultValue={0}
                            />
                        </Form.Group>
                        <Form.Group controlId="InitializeMainMemoryModal.value">
                            <Form.Label className="fs-5">
                                Initial Value
                            </Form.Label>
                            <Form.Control
                                placeholder="Enter value within: [-32768, 32767]"
                                aria-label="Initial Value"
                                type="number"
                                max={4095}
                                min={0}
                                onInput={handleValueChanged}
                                defaultValue={0}
                            />
                        </Form.Group>
                        <Button
                            variant="outline-success"
                            size="lg"
                            className="fs-5"
                            onClick={() => onAddInitialValueClick()}
                        >
                            Add initial value
                        </Button>
                    </Stack>
                    <HorizontalDivider />
                    <Table bordered hover variant="dark" className="fs-6">
                        <thead>
                            <tr>
                                <th>Address</th>
                                <th>Value</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {initializedValues.map(({ address, value }) => (
                                <tr key={address}>
                                    <td>{address}</td>
                                    <td>{value}</td>
                                    <td>
                                        <Button
                                            variant="outline-danger"
                                            onClick={() =>
                                                onDeleteClick(address)
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Stack gap={4} direction="horizontal">
                    <Button
                        variant="success"
                        className="text-dark fw-bold px-6"
                        onClick={() => onInitializeMainMemoryClick()}
                    >
                        Save Initial Values
                    </Button>
                    <Button variant="danger" onClick={onHide} className="px-6">
                        Close
                    </Button>
                </Stack>
            </Modal.Footer>
        </Modal>
    );
};

InitializeMainMemoryModal.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    initializeMainMemory: PropTypes.func,
    initialMainMemory: PropTypes.arrayOf(PropTypes.number),
};

InitializeMainMemoryModal.defaultProps = {
    initialMainMemory: Array.from({ length: 4096 }).map(() => 0),
};

export default InitializeMainMemoryModal;
