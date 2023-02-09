import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";

import ErrorModal from "../ErrorModal";
import HorizontalDivider from "../HorizontalDivider";
import LabeledRegister from "./LabeledRegister";
import MainMemory from "./MainMemory";
import Clock from "./Clock";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

import top4AndBottom12BitsToBase10 from "../../utility/top4AndBottom12BitsToBase10";
import top8BitsToBase10 from "../../utility/top8BitsToBase10";
import toBinaryString from "../../utility/toBinaryString";
import isEnoughBits from "../../utility/isEnoughBits";

const MPM = ({ program, onEditProgram }) => {
    useEffect(() => window.scrollTo({ top: 0 }), []);

    const [showErrorModal, setShowErrorModal] = useState(false);

    const [errorModalHeading, setErrorModalHeading] = useState(undefined);
    const [errorModalBody, setErrorModalBody] = useState(undefined);

    const [valuesBinary, setValuesBinary] = useState(false);

    const [valueOfA, setValueOfA] = useState(0);
    const [valueOfB, setValueOfB] = useState(0);
    const [valueOfC, setValueOfC] = useState(0);
    const [valueOfD, setValueOfD] = useState(0);

    const [valueOfMDR, setValueOfMDR] = useState(0);
    const [valueOfMAR, setValueOfMAR] = useState(0);
    const [valueOfMIR, setValueOfMIR] = useState(program[0]);
    const [valueOfMPC, setValueOfMPC] = useState(0);

    const [valueOfDC1, setValueOfDC1] = useState(0);
    const [valueOfDC2, setValueOfDC2] = useState(0);
    const [valueOfDC3, setValueOfDC3] = useState(0);

    const [mainMemory, setMainMemory] = useState(
        Array.from({ length: 4096 }).map(() => 0)
    );

    const [clockPhase, setClockPhase] = useState(0);

    const [nthBit, setNthBit] = useState(0);

    const [finishCurrentInstruction, setFinishCurrentInstruction] =
        useState(false);

    const generalPurposeRegisters = [
        {
            id: "a-register",
            label: "A",
            value: valueOfA,
            bits: 16,
            binary: valuesBinary,
        },
        {
            id: "b-register",
            label: "B",
            value: valueOfB,
            bits: 16,
            binary: valuesBinary,
        },
        {
            id: "c-register",
            label: "C",
            value: valueOfC,
            bits: 16,
            binary: valuesBinary,
        },
        {
            id: "d-register",
            label: "D",
            value: valueOfD,
            bits: 16,
            binary: valuesBinary,
        },
    ];

    const specialRegisters = [
        {
            id: "mdr-register",
            label: "MDR",
            value: valueOfMDR,
            bits: 16,
            binary: valuesBinary,
        },
        {
            id: "mar-register",
            label: "MAR",
            value: valueOfMAR,
            bits: 12,
            binary: valuesBinary,
        },
        {
            id: "mir-register",
            label: "MIR",
            value: valueOfMIR,
            bits: 22,
            binary: valuesBinary,
            showValueAsString: true,
        },
        {
            id: "mpc-register",
            label: "MPC",
            value: valueOfMPC,
            bits: 8,
            binary: valuesBinary,
        },
    ];

    const dataBuses = [
        {
            id: "DC1",
            label: "DC1",
            value: valueOfDC1,
            bits: 16,
            binary: valuesBinary,
        },
        {
            id: "DC2",
            label: "DC2",
            value: valueOfDC2,
            bits: 16,
            binary: valuesBinary,
        },
        {
            id: "DC3",
            label: "DC3",
            value: valueOfDC3,
            bits: 16,
            binary: valuesBinary,
        },
    ];

    // ***** Functions for handling errors in the simulation *****
    /**
     * Displays the error modal.
     * @param {String} heading Heading for the modal.
     * @param {String} body Body for the modal.
     */
    const displayErrorModal = (heading, body) => {
        setErrorModalHeading(heading);
        setErrorModalBody(body);
        setShowErrorModal(true);
    };

    /**
     * Displays error modal for a parsing exception.
     * @param {String} body
     */
    const handleParsingException = (body) => {
        displayErrorModal(
            "Parsing Exception.",
            `${body} Further behaviour is undefined.`
        );
        if (finishCurrentInstruction) {
            setFinishCurrentInstruction(false);
        }
    };

    /**
     * Displays error modal if overflowCandidate can't be represented by nOfBits bits.
     * @param {Number} overflowCandidate
     * @param {String} location
     * @param {Number} nOfBits
     * @param {Boolean} twosComplement
     * @returns {Boolean} didOverflow
     */
    const handlePotentialOverflow = (
        overflowCandidate,
        location,
        nOfBits,
        twosComplement
    ) => {
        if (!isEnoughBits(overflowCandidate, nOfBits, twosComplement)) {
            displayErrorModal(
                `Error in ${location}`,
                `Value ${overflowCandidate} can not be represented. Further behaviour is undefined.`
            );
            if (finishCurrentInstruction) {
                setFinishCurrentInstruction(false);
            }
            return true;
        }
        return false;
    };

    // ***** Control bits of clock phase one *****
    const c1 = () => {
        handlePotentialOverflow(valueOfDC1 + valueOfA, "DC3", 16, true);
        setValueOfDC2(valueOfA);
        setValueOfDC3(valueOfDC1 + valueOfA);
    };
    const c2 = () => {
        handlePotentialOverflow(valueOfDC1 + valueOfB, "DC3", 16, true);
        setValueOfDC2(valueOfB);
        setValueOfDC3(valueOfDC1 + valueOfB);
    };
    const c3 = () => {
        handlePotentialOverflow(valueOfDC1 + valueOfC, "DC3", 16, true);
        setValueOfDC2(valueOfC);
        setValueOfDC3(valueOfDC1 + valueOfC);
    };
    const c4 = () => {
        handlePotentialOverflow(valueOfDC1 + valueOfD, "DC3", 16, true);
        setValueOfDC2(valueOfD);
        setValueOfDC3(valueOfDC1 + valueOfD);
    };
    const c5 = () => {
        handlePotentialOverflow(valueOfDC2 + 1, "DC3", 16, true);
        setValueOfDC1(1);
        setValueOfDC3(valueOfDC2 + 1);
    };
    const c6 = () => {
        handlePotentialOverflow(valueOfDC2 + valueOfMDR, "DC3", 16, true);
        setValueOfDC1(valueOfMDR);
        setValueOfDC3(valueOfDC2 + valueOfMDR);
    };
    const c7 = () => {
        handlePotentialOverflow(-valueOfDC1, "DC1", 16, true);
        handlePotentialOverflow(valueOfDC2 - valueOfDC1, "DC3", 16, true);
        setValueOfDC1((value) => -value);
        setValueOfDC3(valueOfDC2 - valueOfDC1);
    };
    const c8 = () => {
        handlePotentialOverflow(valueOfDC3 * 2, "DC3", 16, true);
        setValueOfDC3((value) => value * 2);
    };
    // ***** Control bits of clock phase two *****
    const c9 = () => {
        handlePotentialOverflow(valueOfDC3, "A", 16, true);
        setValueOfA(valueOfDC3);
    };
    const c10 = () => {
        handlePotentialOverflow(valueOfDC3, "B", 16, true);
        setValueOfB(valueOfDC3);
    };
    const c11 = () => {
        handlePotentialOverflow(valueOfDC3, "C", 16, true);
        setValueOfC(valueOfDC3);
    };
    const c12 = () => {
        handlePotentialOverflow(valueOfDC3, "D", 16, true);
        setValueOfD(valueOfDC3);
    };
    const c13 = () => {
        handlePotentialOverflow(valueOfDC3, "MDR", 16, true);
        setValueOfMDR(valueOfDC3);
    };
    const c14 = () => {
        const bottom12BitsInBase10 = top4AndBottom12BitsToBase10(
            toBinaryString(valueOfDC3, 16)
        )[1];
        if (bottom12BitsInBase10 === undefined) {
            handleParsingException(
                "Something went wrong when parsing the lowest 12 bits of DC3 into a base 10 integer."
            );
            return;
        }
        handlePotentialOverflow(bottom12BitsInBase10, "MAR", 12, false);
        setValueOfMAR(bottom12BitsInBase10);
    };
    // ***** Control bits of clock phase three *****
    const c15 = () => {
        handlePotentialOverflow(mainMemory[valueOfMAR], "MDR", 16, true);
        setValueOfMDR(mainMemory[valueOfMAR]);
    };
    const c16 = () => {
        handlePotentialOverflow(
            valueOfMDR,
            `Main Memory at address ${valueOfMAR}`,
            16,
            true
        );
        setMainMemory((currentMemory) =>
            currentMemory.map((value, address) =>
                address === valueOfMAR ? valueOfMDR : value
            )
        );
    };
    // ***** Control bits of clock phase four *****
    const c17 = () => {
        handlePotentialOverflow(1 + valueOfDC2, "DC3", 16, true);
        setValueOfDC1(1);
        setValueOfDC3(1 + valueOfDC2);
    };
    const c18 = () => {
        const top8BitsInBase10 = top8BitsToBase10(valueOfMIR);
        if (top8BitsInBase10 === undefined) {
            handleParsingException(
                "Something went wrong when parsing the top 8 bits of MIR into a base 10 integer."
            );
            return;
        }
        handlePotentialOverflow(top8BitsInBase10, "DC1", 16, true);
        handlePotentialOverflow(top8BitsInBase10 + valueOfDC2, "DC3", 16, true);
        setValueOfDC1(top8BitsInBase10);
        setValueOfDC3(top8BitsInBase10 + valueOfDC2);
    };
    const c19 = () => {
        handlePotentialOverflow(
            valueOfA === 0 ? 1 + valueOfDC2 : 2 + valueOfDC2,
            "DC3",
            16,
            true
        );
        setValueOfDC1(valueOfA === 0 ? 1 : 2);
        setValueOfDC3(valueOfA === 0 ? 1 + valueOfDC2 : 2 + valueOfDC2);
    };
    const c20 = () => {
        handlePotentialOverflow(
            valueOfA < 0 ? 1 + valueOfDC2 : 2 + valueOfDC2,
            "DC3",
            16,
            true
        );
        setValueOfDC1(valueOfA < 0 ? 1 : 2);
        setValueOfDC3(valueOfA < 0 ? 1 + valueOfDC2 : 2 + valueOfDC2);
    };
    const c21 = () => {
        const top4BitsInBase10 = top4AndBottom12BitsToBase10(
            toBinaryString(valueOfMDR, 16)
        )[0];
        if (top4BitsInBase10 === undefined) {
            handleParsingException(
                "Something went wrong when parsing the top 4/bottom 12 bits of MDR into a base 10 integer."
            );
            return;
        }
        handlePotentialOverflow(top4BitsInBase10, "DC1", 16, true);
        handlePotentialOverflow(top4BitsInBase10 + valueOfDC2, "DC3", 16, true);
        setValueOfDC1(top4BitsInBase10);
        setValueOfDC3(top4BitsInBase10 + valueOfDC2);
    };
    const c22 = () => {
        handlePotentialOverflow(valueOfMPC, "DC2", 16, true);
        handlePotentialOverflow(valueOfDC1 + valueOfMPC, "DC3", 16, true);
        setValueOfDC2(valueOfMPC);
        setValueOfDC3(valueOfDC1 + valueOfMPC);
    };

    // Used to execute appropriate control bit based on nthBit
    const controlBitArray = [
        c1,
        c2,
        c3,
        c4,
        c5,
        c6,
        c7,
        c8,
        c9,
        c10,
        c11,
        c12,
        c13,
        c14,
        c15,
        c16,
        c17,
        c18,
        c19,
        c20,
        c21,
        c22,
    ];

    /**
     * Executes the next control bit based on current MPM state
     */
    const executeNextBit = () => {
        // Execute the correct control bit based on nthBit
        if (nthBit < 22 && valueOfMIR[nthBit] === "1") {
            controlBitArray[nthBit]();
        } else if (nthBit >= 22) {
            if (!handlePotentialOverflow(valueOfDC3, "MPC", 8, false)) {
                // Execute fifth clock phase
                setValueOfMPC(valueOfDC3);
                setValueOfMIR(program[valueOfDC3]);
            }
        }
        // Zero out data buses DC1, DC2 and DC3 after clock phases 2 and 5
        if (nthBit === 13 || nthBit === 22) {
            setValueOfDC1(0);
            setValueOfDC2(0);
            setValueOfDC3(0);
        }
        // Update the clock phase and nthBit
        if (nthBit < 22) {
            if (0 <= nthBit && nthBit <= 7) {
                setClockPhase(1);
            } else if (8 <= nthBit && nthBit <= 13) {
                setClockPhase(2);
            } else if (14 <= nthBit && nthBit <= 15) {
                setClockPhase(3);
            } else {
                setClockPhase(4);
            }
            setNthBit((value) => value + 1);
        } else {
            setClockPhase(5);
            setNthBit(0);
        }
    };

    if (finishCurrentInstruction) {
        if (nthBit < 22) {
            executeNextBit();
        } else {
            executeNextBit();
            setFinishCurrentInstruction(false);
        }
    }

    return (
        <Container fluid>
            <ErrorModal
                show={showErrorModal}
                onHide={() => setShowErrorModal(false)}
                heading={errorModalHeading}
                body={errorModalBody}
            />
            <Row>
                <Col className="my-4">
                    <h4>Registers A-D</h4>
                    {generalPurposeRegisters.map((register) => (
                        <LabeledRegister
                            register={register}
                            key={register.id}
                        />
                    ))}
                </Col>
                <Col className="my-4">
                    <h4>Special Registers</h4>
                    {specialRegisters.map((register) => (
                        <LabeledRegister
                            register={register}
                            key={register.id}
                        />
                    ))}
                </Col>
                <Col className="my-4">
                    <h4>Main Memory</h4>
                    <MainMemory
                        binary={valuesBinary}
                        memory={mainMemory}
                    ></MainMemory>
                </Col>
            </Row>
            <HorizontalDivider />
            <Row>
                <h4>Data Buses</h4>
                {dataBuses.map((bus) => (
                    <Col key={bus.id}>
                        <LabeledRegister register={bus} />
                    </Col>
                ))}
            </Row>
            <HorizontalDivider />
            <Row>
                <Col>
                    <h4>Clock phase currently in execution</h4>
                    <Clock phase={clockPhase}></Clock>
                </Col>
            </Row>
            <HorizontalDivider />
            <Row>
                <Col xs="md">
                    <h4>Run Simulator</h4>
                    <Stack gap={4}>
                        <Button
                            variant={"outline-success"}
                            size="lg"
                            onClick={() => executeNextBit()}
                        >
                            {nthBit < 22
                                ? `Execute next bit: c${nthBit + 1} = ${
                                      valueOfMIR[nthBit]
                                  }`
                                : "Execute fifth clock phase"}
                        </Button>
                        <Button
                            variant={"outline-success"}
                            size="lg"
                            onClick={() => setFinishCurrentInstruction(true)}
                        >
                            Complete the current instruction
                        </Button>
                    </Stack>
                </Col>
                <Col xs="md" className="my-4 my-md-0">
                    <h4>Utility</h4>
                    <Stack gap={4}>
                        <Button
                            variant="outline-primary"
                            size="lg"
                            onClick={() => onEditProgram()}
                        >
                            Edit Microprogram
                        </Button>
                        <Button
                            variant="outline-primary"
                            size="lg"
                            onClick={() => setValuesBinary((value) => !value)}
                        >
                            {valuesBinary
                                ? "Display values in base 10"
                                : "Display values in binary"}
                        </Button>
                    </Stack>
                </Col>
            </Row>
            <HorizontalDivider />
            <Row className="justify-content-center">
                <Col lg={4}>
                    <h3 className="text-center">Microprogram</h3>
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
                                    <td>{addr}</td>
                                    <td>{value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

MPM.propTypes = {
    program: PropTypes.arrayOf(PropTypes.string),
    onEditProgram: PropTypes.func.isRequired,
};

MPM.defaultProps = {
    program: Array.from({ length: 256 }).map(() => "0".repeat(22)),
};

export default MPM;
