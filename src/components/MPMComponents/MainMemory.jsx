import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import toBinaryString from "../../utility/toBinaryString";

const MainMemory = ({ memory, binary }) => {
    return (
        <>
            <Row>
                <Col>Address | Value</Col>
            </Row>
            <div
                style={{
                    maxHeight: "216px",
                    overflowY: "scroll",
                    overflowX: "hidden",
                }}
            >
                {(memory || []).map((value, address) => (
                    <input
                        key={address}
                        className="form-control mb-1"
                        style={{ minWidth: "33ch" }}
                        type="text"
                        value={
                            binary
                                ? `${toBinaryString(
                                      address,
                                      12
                                  )} | ${toBinaryString(value, 16)}`
                                : `${address} | ${value}`
                        }
                        readOnly
                    />
                ))}
            </div>
        </>
    );
};

export default MainMemory;
