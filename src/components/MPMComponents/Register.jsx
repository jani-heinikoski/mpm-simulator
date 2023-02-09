import React from "react";
import toBinaryString from "../../utility/toBinaryString";

const Register = ({ value, bits, binary, id, showValueAsString }) => {
    return (
        <>
            {showValueAsString ? (
                <input
                    id={id}
                    className="form-control"
                    style={{ minWidth: `${bits + 4 || 0}ch` }}
                    type="text"
                    value={`${value}`}
                    maxLength={bits}
                    readOnly
                />
            ) : (
                <input
                    id={id}
                    className="form-control"
                    style={{ minWidth: `${bits + 4 || 0}ch` }}
                    type="text"
                    value={
                        binary ? toBinaryString(value, bits) : value.toString()
                    }
                    maxLength={bits}
                    readOnly
                />
            )}
        </>
    );
};

export default Register;
