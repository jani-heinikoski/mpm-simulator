import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Card = ({ header, title, text, border }) => {
  return (
    <Row className="p-3">
      <Col>
        <div className={`card text-white bg-secondary border-${border}`}>
          {header && <div className="card-header">{header}</div>}
          <div className="card-body">
            <h4 className="card-title fw-bold">{title}</h4>
            <p className="card-text">{text}</p>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Card;
