/**
 *
 * @param {String} programAsString
 * @returns {String[]|null}
 */
const initialCleanUp = (programAsString) => {
    const regex = new RegExp(/^([0,1]{22}\n?)*$/g);
    const withoutWhitespaceExceptNewlines = programAsString
        .trim()
        .replace(/[\r\t\f\v ]/g, "");
    if (regex.test(withoutWhitespaceExceptNewlines)) {
        return withoutWhitespaceExceptNewlines.split("\n");
    }
    return null;
};

/**
 *
 * @param {string[]} program
 * @returns {boolean} passedFinalCheck
 */
const finalCheck = (program) => {
    for (const microinstruction of program) {
        if (microinstruction) {
            for (let i = 0; i < 22; i++) {
                if (
                    !(
                        microinstruction[i] === "0" ||
                        microinstruction[i] === "1"
                    )
                ) {
                    return false;
                }
            }
        }
    }
    return true;
};

/**
 *
 * @param {String} programAsString
 * @returns {String[]|null} parsedProgram
 */
const parseProgram = (programAsString) => {
    const program = initialCleanUp(programAsString);
    if (Array.isArray(program) && program.length <= 256) {
        while (program.length < 256) {
            program.push("0".repeat(22));
        }
        if (finalCheck(program)) {
            return program;
        }
    }

    return null;
};

export default parseProgram;
