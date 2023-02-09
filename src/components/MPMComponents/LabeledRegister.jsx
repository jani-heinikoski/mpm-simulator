import React from "react";
import Register from "./Register";

const LabeledRegister = ({ register }) => {
    return (
        <>
            <div className="form-goup" key={register.id}>
                <label htmlFor={register.id}>{register.label}</label>
                <Register
                    id={register.id}
                    value={register.value}
                    bits={register.bits}
                    binary={register.binary}
                    showValueAsString={register.showValueAsString}
                />
            </div>
        </>
    );
};

export default LabeledRegister;
