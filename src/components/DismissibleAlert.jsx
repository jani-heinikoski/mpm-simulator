import React from "react";

import Alert from "react-bootstrap/Alert";

const DismissibleAlert = ({
    show,
    variant,
    onClose,
    heading,
    content,
    className,
}) => {
    if (show) {
        return (
            <Alert
                variant={variant}
                onClose={onClose}
                className={className}
                dismissible
            >
                <Alert.Heading>{heading}</Alert.Heading>
                <p>{content}</p>
            </Alert>
        );
    } else {
        return <></>;
    }
};

export default DismissibleAlert;
