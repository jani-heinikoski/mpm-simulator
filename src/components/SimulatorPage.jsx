import { React, useState } from "react";

import { Container } from "react-bootstrap";

import MPM from "./MPMComponents/MPM";
import Editor from "./MPMComponents/Editor";

const EDIT = "edit";
const SIMULATE = "simulate";

const SimulatorPage = () => {
    const [mode, setMode] = useState(EDIT);
    const [program, setProgram] = useState();
    const [registers, setRegisters] = useState();
    const [initialMainMemory, setInitialMainMemory] = useState();

    /**
     * Displays the MPM simulator with program as its input
     * @param {String[]} p program
     * @param {Object} r initialRegisterValues
     * @param {Object} m initialMainMemory
     */
    const onSimulateProgram = (p, r, m) => {
        setProgram(p);
        setRegisters(r);
        setInitialMainMemory(m);
        setMode(SIMULATE);
    };

    /**
     * Displays the Editor component
     */
    const onEditProgram = () => {
        setMode(EDIT);
    };

    return (
        <Container fluid>
            {mode === EDIT ? (
                <Editor
                    onSimulateProgram={onSimulateProgram}
                    program={program}
                    registers={registers}
                    initialMainMemory={initialMainMemory}
                />
            ) : (
                <MPM
                    onEditProgram={onEditProgram}
                    program={program}
                    initialRegisterValues={registers}
                    initialMainMemory={initialMainMemory}
                />
            )}
        </Container>
    );
};

export default SimulatorPage;
