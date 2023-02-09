import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

const Clock = ({ phase }) => {
    return (
        <ProgressBar
            animated
            now={(phase || 0) * 20}
            label={phase || 0}
            striped
            variant="danger"
        ></ProgressBar>
    );
};

export default Clock;
