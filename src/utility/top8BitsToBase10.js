/**
 * Calculate the base 10 values of the top 8 bits (treated in raw binary representation, not two's complement).
 * @param {Number} twosComplementString binary representation of the value which top 8 bits are evaluated. Needs to be 8 bits or longer.
 * @returns {undefined|Number} top8BitsInBase10
 */
const top8BitsInBase10 = (binaryString) => {
    if (binaryString.length < 8) {
        return undefined;
    }
    const top8BitsString = binaryString.slice(0, 8);
    let top8BitsInBase10 = 0;
    for (let i = 0; i < 8; i++) {
        top8BitsInBase10 += top8BitsString[i] === "1" ? 2 ** (7 - i) : 0;
    }
    return top8BitsInBase10;
};

export default top8BitsInBase10;
