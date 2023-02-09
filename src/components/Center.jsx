import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Center = ({ content }) => {
  return (
    <Row className="justify-content-center">
      <Col xs="auto">{content}</Col>
    </Row>
  );
};

export default Center;
