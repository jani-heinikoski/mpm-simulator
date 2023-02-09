import { React, useState } from "react";

import { Container } from "react-bootstrap";

import MPM from "./MPMComponents/MPM";
import Editor from "./MPMComponents/Editor";

const EDIT = "edit";
const SIMULATE = "simulate";

const SimulatorPage = () => {
    const [mode, setMode] = useState(EDIT);
    const [program, setProgram] = useState();
    // Used to save the instruction's state when changing between simulator and editor
    const [instruction, setInstruction] = useState();

    /**
     * Displays the MPM simulator with program as its input
     * @param {String[]} program
     */
    const onSimulateProgram = (program, instruction) => {
        setProgram(program);
        setInstruction(instruction);
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
                    saveInstruction={(instruction) =>
                        setInstruction(instruction)
                    }
                    program={program}
                    instruction={instruction}
                />
            ) : (
                <MPM onEditProgram={onEditProgram} program={program} />
            )}
        </Container>
    );
};

export default SimulatorPage;
