const controlBitDescriptions = {
    c1: {
        nOfBit: 1,
        shortDescription: "A -> DC2",
        longDescription: "Load the value of register A into data bus DC2.",
    },
    c2: {
        nOfBit: 2,
        shortDescription: "B -> DC2",
        longDescription: "Load the value of register B into data bus DC2.",
    },
    c3: {
        nOfBit: 3,
        shortDescription: "C -> DC2",
        longDescription: "Load the value of register C into data bus DC2.",
    },
    c4: {
        nOfBit: 4,
        shortDescription: "D -> DC2",
        longDescription: "Load the value of register D into data bus DC2.",
    },
    c5: {
        nOfBit: 5,
        shortDescription: "1 -> DC1",
        longDescription: "Load the immediate value 1 into data bus DC1.",
    },
    c6: {
        nOfBit: 6,
        shortDescription: "MDR -> DC1",
        longDescription: "Load the value of MDR into data bus DC1.",
    },
    c7: {
        nOfBit: 7,
        shortDescription: "DC1 -> -DC1",
        longDescription:
            "Transform the value of DC1 into its Boolean complement.",
    },
    c8: {
        nOfBit: 8,
        shortDescription: "DC3 -> DC3 << 1 (left shift)",
        longDescription:
            "Left shift the value of DC3 (i.e., multiply it by two).",
    },
    c9: {
        nOfBit: 9,
        shortDescription: "DC3 -> A",
        longDescription: "Load the value of data bus DC3 into register A.",
    },
    c10: {
        nOfBit: 10,
        shortDescription: "DC3 -> B",
        longDescription: "Load the value of data bus DC3 into register B.",
    },
    c11: {
        nOfBit: 11,
        shortDescription: "DC3 -> C",
        longDescription: "Load the value of data bus DC3 into register C.",
    },
    c12: {
        nOfBit: 12,
        shortDescription: "DC3 -> D",
        longDescription: "Load the value of data bus DC3 into register D.",
    },
    c13: {
        nOfBit: 13,
        shortDescription: "DC3 -> MDR",
        longDescription: "Load the value of data bus DC3 into register MDR.",
    },
    c14: {
        nOfBit: 14,
        shortDescription: "DC3_12 -> MAR",
        longDescription:
            "Load the least significant 12 bits of data bus DC3 into register MAR.",
    },
    c15: {
        nOfBit: 15,
        shortDescription: "(MAR) -> MDR",
        longDescription:
            "Load the value in Main Memory pointed by register MAR into register MDR.",
    },
    c16: {
        nOfBit: 16,
        shortDescription: "MDR -> (MAR)",
        longDescription:
            "Load the value of register MDR into Main Memory address pointed by register MAR.",
    },
    c17: {
        nOfBit: 17,
        shortDescription: "1 -> DC1",
        longDescription: "Load the immediate value 1 into data bus DC1.",
    },
    c18: {
        nOfBit: 18,
        shortDescription: "MIR¯8 -> DC1",
        longDescription:
            "Load the eight most significant bits of register MIR into data bus DC1.",
    },
    c19: {
        nOfBit: 19,
        shortDescription: "A == 0 ? 1 -> DC1 : 2 -> DC1",
        longDescription:
            "Load the immediate value 1 into data bus DC1 if the value of register A is zero otherwise load the immediate value 2.",
    },
    c20: {
        nOfBit: 20,
        shortDescription: "A < 0 ? 1 -> DC1 : 2 -> DC1",
        longDescription:
            "Load the immediate value 1 into data bus DC1 if most significant bit of register A is one otherwise load the immediate value 2.",
    },
    c21: {
        nOfBit: 21,
        shortDescription: "MDR¯4 -> DC1",
        longDescription:
            "Load the four most significant bits of register MDR into data bus DC1.",
    },
    c22: {
        nOfBit: 22,
        shortDescription: "MPC -> DC2",
        longDescription: "Load the value of register MPC into data bus DC2.",
    },
};

export default controlBitDescriptions;
