import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";

import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";

import HorizontalDivider from "../HorizontalDivider";
import DismissibleAlert from "../DismissibleAlert";
import ProgramManagerModal from "./ProgramManagerModal";
import InitializeRegistersModal from "./InitializeRegistersModal";

import controlBitDescriptions from "../../utility/controlBitDescriptions";

const Editor = (props) => {
    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, []);

    const [program, setProgram] = useState(props.program);

    const [instructionAddr, setInstructionAddr] = useState(NaN);
    const [instruction, setInstruction] = useState(
        Array.from({ length: 22 }).map(() => false)
    );

    const [showAlert, setShowAlert] = useState(false);
    const [alertHeading, setAlertHeading] = useState("");
    const [alertContent, setAlertContent] = useState("");
    const [alertVariant, setAlertVariant] = useState("success");

    const [showProgramManager, setShowProgramManager] = useState(false);
    const [showInitializeRegistersModal, setShowInitializeRegistersModal] =
        useState(false);

    const [registers, setRegisters] = useState(props.registers);

    const clearSelections = () => {
        setInstruction(Array.from({ length: 22 }).map(() => false));
    };

    const showWrongAddressWarning = () => {
        setAlertHeading("Bad Address!");
        setAlertVariant("danger");
        setAlertContent(
            "You gave a bad address to save the microinstruction into. Check that the address is within range 0-255."
        );
        setShowAlert(true);
    };

    const showInstructionSaved = (instructionAsString) => {
        setAlertHeading("Success!");
        setAlertVariant("success");
        setAlertContent(
            `Instruction ${instructionAsString} was successfully saved into program memory at address ${instructionAddr}.`
        );
        setShowAlert(true);
    };

    /**
     * Loads the instruction from address addr to the editor
     * @param {Number} addr address of the microinstruction
     */
    const modifyInstruction = (addr) => {
        setInstruction(
            Array.from(program[addr]).map((value) =>
                value === "1" ? true : false
            )
        );
        setInstructionAddr(addr);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    /**
     * Sets instruction[nthBit] to its Boolean complement,
     * i.e. instruction[nthBit] -> !instruction[nthBit].
     * @param {Number} nthBit
     */
    const handleBitChange = (nthBit) => {
        setInstruction((prev) =>
            prev.map((_, i) => (i === nthBit ? !prev[i] : prev[i]))
        );
    };

    /**
     * Constructs the FormSwitches for selecting instruction's control bits
     * @param {Number} from
     * @param {Number} to
     * @returns {Form.Check[]} ControlBitSwitches
     */
    const getControlBitSwitches = (from, to) =>
        Object.values(controlBitDescriptions)
            .slice(from, to)
            .map((value) => (
                <Form.Check
                    key={value.nOfBit}
                    type="checkbox"
                    id={`control-bit-${value.nOfBit}-switch`}
                >
                    <Form.Check.Input
                        type="checkbox"
                        checked={instruction[value.nOfBit - 1]}
                        onChange={() => handleBitChange(value.nOfBit - 1)}
                    />
                    <Form.Check.Label className="fs-6">
                        {`C${value.nOfBit}: ${value.shortDescription}`}
                    </Form.Check.Label>
                </Form.Check>
            ));

    /**
     * Saves the instruction currently being edited to the microprogram
     */
    const saveInstruction = () => {
        if (
            typeof instructionAddr != "number" ||
            isNaN(instructionAddr) ||
            instructionAddr < 0 ||
            instructionAddr > 255
        ) {
            showWrongAddressWarning();
        } else {
            let instructionAsString = "";
            for (const bit of instruction) {
                instructionAsString += bit ? "1" : "0";
            }
            setProgram((prev) =>
                prev.map((v, i) =>
                    i === instructionAddr ? instructionAsString : v
                )
            );
            showInstructionSaved(instructionAsString);
        }
    };

    /**
     * Event handler for the instruction's address' oninput event
     * @param {*} e
     */
    const handleAddressChanged = (e) => {
        const targetValue = e?.target?.value;
        try {
            setInstructionAddr(parseInt(targetValue, 10));
        } catch {
            showWrongAddressWarning();
        }
    };

    const openProgramManager = () => {
        setShowProgramManager(true);
    };

    return (
        <Container fluid>
            <h1 className="text-center mt-4">Edit The Microprogram</h1>
            <HorizontalDivider />
            <Stack gap={4} direction="horizontal">
                <h3>Select the instruction's control bits</h3>
                <Button
                    variant="outline-danger"
                    onClick={() => clearSelections()}
                >
                    Clear Selections
                </Button>
            </Stack>
            <Row>
                <Col xs="md" className="mt-4">
                    <Stack gap={4}>
                        <h4>Clock phase 1 control bits</h4>
                        {getControlBitSwitches(0, 8)}
                    </Stack>
                </Col>
                <Col xs="md" className="mt-4">
                    <Stack gap={4}>
                        <h4>Clock phase 2 control bits</h4>
                        {getControlBitSwitches(8, 14)}
                    </Stack>
                </Col>
                <Col xs="md" className="mt-4">
                    <Stack gap={4}>
                        <h4>Clock phase 3 control bits</h4>
                        {getControlBitSwitches(14, 16)}
                    </Stack>
                </Col>
                <Col xs="md" className="mt-4">
                    <Stack gap={4}>
                        <h4>Clock phase 4 control bits</h4>
                        {getControlBitSwitches(16, 22)}
                    </Stack>
                </Col>
            </Row>
            <Row>
                <Col sm={8} md={6} className="mt-4">
                    <h3>Save the microinstruction to address</h3>
                    <InputGroup>
                        <Form.Control
                            placeholder="Address (0-255)"
                            aria-label="Instruction's address"
                            aria-describedby="save-instruction"
                            type="number"
                            max={255}
                            min={0}
                            onInput={handleAddressChanged}
                            value={
                                !isNaN(instructionAddr) ? instructionAddr : ""
                            }
                        />
                        <Button
                            id="save-instruction"
                            variant="outline-success"
                            className="fs-5"
                            onClick={() => saveInstruction()}
                        >
                            Save Instruction
                        </Button>
                    </InputGroup>
                    <DismissibleAlert
                        className="my-4 fs-6"
                        show={showAlert}
                        variant={alertVariant}
                        heading={alertHeading}
                        content={alertContent}
                        onClose={() => setShowAlert(false)}
                    />
                </Col>
            </Row>
            <HorizontalDivider />
            <h3>Functionality</h3>
            <Stack gap={4}>
                <Button
                    variant="outline-success"
                    size="lg"
                    onClick={() => {
                        props.onSimulateProgram(program, registers);
                    }}
                >
                    Simulate Program
                </Button>
                <Button
                    variant="outline-primary"
                    size="lg"
                    onClick={() => {
                        openProgramManager();
                    }}
                >
                    Manage Program (edit/save/load)
                </Button>
                <ProgramManagerModal
                    show={showProgramManager}
                    currentProgram={program}
                    onHide={() => setShowProgramManager(false)}
                    onLoadProgram={(p) => setProgram(p)}
                />
                <Button
                    variant="outline-primary"
                    size="lg"
                    onClick={() => {
                        setShowInitializeRegistersModal(true);
                    }}
                >
                    Initialize registers
                </Button>
                <InitializeRegistersModal
                    initializeRegisters={(registers) => setRegisters(registers)}
                    onHide={() => setShowInitializeRegistersModal(false)}
                    show={showInitializeRegistersModal}
                    initialState={registers}
                />
            </Stack>
            <HorizontalDivider />
            <Row className="justify-content-center">
                <Col lg={4}>
                    <h3 className="text-center">Microprogram</h3>
                    <h5 className="text-center">
                        Click instructions to edit them
                    </h5>
                    <Table bordered hover variant="dark" className="fs-5">
                        <thead>
                            <tr>
                                <th>Address</th>
                                <th>Instruction</th>
                            </tr>
                        </thead>
                        <tbody>
                            {program.map((value, addr) => (
                                <tr key={addr}>
                                    <td onClick={() => modifyInstruction(addr)}>
                                        {addr}
                                    </td>
                                    <td onClick={() => modifyInstruction(addr)}>
                                        {value}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

Editor.propTypes = {
    program: PropTypes.arrayOf(PropTypes.string),
    instruction: PropTypes.arrayOf(PropTypes.bool),
    registers: PropTypes.shape({
        A: PropTypes.number,
        B: PropTypes.number,
        C: PropTypes.number,
        D: PropTypes.number,
    }),
};

Editor.defaultProps = {
    program: Array.from({ length: 256 }).map(() => "0".repeat(22)),
    instruction: Array.from({ length: 22 }).map(() => false),
    registers: { A: 0, B: 0, C: 0, D: 0 },
};

export default Editor;
