import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Card from "./Card";
import HomePageHero from "./HomePageHero";

const HomePage = () => {
  const aboutCard = (
    <Card
      header="About"
      border="primary"
      title="About the MPM Simulator"
      text="This simulator is intended for those interested in learning basics of microprogramming. It simulates a simplistic microprogrammed machine (MPM) which can be programmed using primitive microinstructions. The simulator allows users to monitor how each microinstruction affects various registers/memory."
    />
  );

  const microprogrammingCard = (
    <Card
      header="Microprogramming"
      border="danger"
      title="What is microprogramming?"
      text="Microprogramming was invented by Maurice Wilkes in 1951 to simplify circuitry in computer systems. It is the act of creating microprograms which consist of very primitive microinstructions. Microprogramming is typically used to implement machine instructions instead of implementing them with complex circuitry. It also enables engineers to implement a machine’s instruction set differently with varying efficiencies and costs."
    />
  );

  return (
    <Container fluid>
      <HomePageHero />
      <Row className="mt-4">
        <Col md={6}>{aboutCard}</Col>
      </Row>
      <hr className="my-4 text-dark opacity-100" />
      <Row>
        <Col md={{ span: 6, offset: 6 }}>{microprogrammingCard}</Col>
      </Row>
    </Container>
  );
};

export default HomePage;
