/**
 * Determine if base10value can be represented by nOfBits amount of bits.
 * @param {Number} base10value The integer value in base 10.
 * @param {Number} nOfBits The amount of bits to represent base10value.
 * @param {Boolean} twosComplement Should the binary representation be in two's complement form?
 * @returns {Boolean} isEnoughBits
 */
const isEnoughBits = (base10value, nOfBits, twosComplement) => {
    if (twosComplement) {
        return (
            base10value <= 2 ** (nOfBits - 1) - 1 &&
            base10value >= -(2 ** (nOfBits - 1))
        );
    } else {
        return base10value <= 2 ** nOfBits - 1;
    }
};

export default isEnoughBits;
