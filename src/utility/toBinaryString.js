/**
 * Turn base10int into a two's complement binary string representation using nOfBits bits.
 * @param {Number} base10int integer number to be represented in binary.
 * @param {Number} nOfBits amount of bits used in the binary representation.
 * @returns {String} binaryRepresentation
 */
const toBinaryString = (base10int, nOfBits) => {
    if (
        base10int > 2 ** nOfBits - 1 ||
        base10int < -(2 ** (nOfBits - 1)) ||
        !Number.isInteger(base10int) ||
        !Number.isInteger(nOfBits) ||
        nOfBits <= 0
    ) {
        return "error";
    }
    if (base10int >= 0) {
        return base10int.toString(2).padStart(nOfBits, "0");
    } else {
        // Turn the base 10 integer's absolute value into a bit array
        const valueAsArray = Math.abs(base10int)
            .toString(2)
            .padStart(nOfBits, "0")
            .split("");
        // Flip the bits (i.e. represent the digit in one's complement)
        const valueInOnesComplementArray = [];
        for (const bit of valueAsArray) {
            valueInOnesComplementArray.push(bit === "0" ? "1" : "0");
        }
        // Add one to the one's complement value
        const valueInTwosComplementArray = [];
        let carry = 1;
        for (let i = valueInOnesComplementArray.length - 1; i >= 0; i--) {
            if (
                (valueInOnesComplementArray[i] === "0" && carry === 1) ||
                (valueInOnesComplementArray[i] === "1" && carry === 0)
            ) {
                valueInTwosComplementArray.unshift(1);
                carry = 0;
            } else if (valueInOnesComplementArray[i] === "0" && carry === 0) {
                valueInTwosComplementArray.unshift(0);
            } else if (valueInOnesComplementArray[i] === "1" && carry === 1) {
                valueInTwosComplementArray.unshift(0);
                carry = 1;
            }
        }
        return valueInTwosComplementArray.join("");
    }
};

export default toBinaryString;
