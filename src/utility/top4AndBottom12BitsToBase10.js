/**
 * Calculate the base 10 values of the top 4 and bottom 12 bits (treated in raw binary representation, not two's complement) of binaryString.
 * @param {Number} binaryString binary representation of the value which bits are evaluated. Needs to be 16 bits long.
 * @returns {undefined[]|Number[]} top4AndBottom12BitsInBase10
 */
const top4AndBottom12BitsToBase10 = (binaryString) => {
    if (binaryString.length !== 16) {
        return [undefined, undefined];
    }
    const [top4BitsString, bot12BitsString] = [
        binaryString.slice(0, 4),
        binaryString.slice(4),
    ];
    let top4BitsInBase10 = 0;
    let bottom12BitsInBase10 = 0;
    for (let i = 0; i < 12; i++) {
        bottom12BitsInBase10 += bot12BitsString[i] === "1" ? 2 ** (11 - i) : 0;
        if (i < 4) {
            top4BitsInBase10 += top4BitsString[i] === "1" ? 2 ** (3 - i) : 0;
        }
    }
    return [top4BitsInBase10, bottom12BitsInBase10];
};

export default top4AndBottom12BitsToBase10;
