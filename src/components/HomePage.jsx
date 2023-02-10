import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";

import Card from "./Card";
import HomePageHero from "./HomePageHero";
import HorizontalDivider from "./HorizontalDivider";

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
            text="Microprogramming was invented by Maurice Wilkes in 1951 to simplify circuitry in computer systems. It is the act of creating microprograms which consist of very primitive microinstructions. Microprogramming is typically used to implement machine instructions instead of implementing them with complex circuitry. It also enables engineers to implement a machine’s instruction set differently with varying efficiencies and costs. [2], [3]"
        />
    );

    return (
        <Container fluid>
            <HomePageHero />
            <Row className="mt-4">
                <Col md={6}>{aboutCard}</Col>
            </Row>
            <HorizontalDivider />
            <Row>
                <Col md={{ span: 6, offset: 6 }}>{microprogrammingCard}</Col>
            </Row>
            <HorizontalDivider />
            <Row>
                <Col className="p-4">
                    <h3 className="fw-bold">Table of references</h3>
                    <Table
                        striped
                        bordered
                        hover
                        variant="dark"
                        className="fs-6"
                    >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Source</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>
                                    J. Boberg, ‘Jorma Boberg: Materiaaleja’,
                                    Sep. 29, 2016.{" "}
                                    <span className="fst-italic">
                                        <a
                                            href="http://staff.cs.utu.fi/staff/jorma.boberg/Mat/"
                                            className="link-primary"
                                        >
                                            http://staff.cs.utu.fi/staff/jorma.boberg/Mat/
                                        </a>
                                    </span>{" "}
                                    (accessed Jun. 02, 2022).
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>
                                    Association for Computing Machinery (acm),
                                    ‘Maurice V. Wilkes Additional Materials’,
                                    2019.{" "}
                                    <span className="fst-italic">
                                        <a
                                            href="https://amturing.acm.org/info/wilkes_1001395.cfm"
                                            className="link-primary"
                                        >
                                            https://amturing.acm.org/info/wilkes_1001395.cfm
                                        </a>
                                    </span>{" "}
                                    (accessed Jun. 22, 2022).
                                </td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>
                                    Britannica, The Editors of Encyclopaedia,
                                    ‘microprogramming | Definition & Facts |
                                    Britannica’, Sep. 14, 2021.{" "}
                                    <span className="fst-italic">
                                        <a
                                            href="https://www.britannica.com/technology/microprogramming"
                                            className="link-primary"
                                        >
                                            https://www.britannica.com/technology/microprogramming
                                        </a>
                                    </span>{" "}
                                    (accessed Jun. 22, 2022).
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default HomePage;
