import React from "react";

import { useNavigate } from "react-router-dom";

import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const HomePageHero = () => {
    const navigate = useNavigate();
    return (
        <Row className="bg-dark p-4">
            <Col className="py-5">
                <h1 className="fw-bold text-center text-white">
                    Welcome to the <Badge bg="danger">MPM Simulator</Badge> home
                    page
                </h1>
                <Row>
                    <Col md={12} lg={8} className="mx-auto">
                        <p className="fs-5 mb-4">
                            Learn microprogramming concepts with this
                            interactive simulator app. The simulator is based on
                            the abstract microprogrammed machine introduced in{" "}
                            <span className="fst-italic">
                                <a
                                    href="http://staff.cs.utu.fi/staff/jorma.boberg/Mat/"
                                    className="link-primary"
                                >
                                    Johdatus tietojenkäsittelytieteeseen
                                </a>
                            </span>{" "}
                            by Jorma Boberg, Martti Penttonen, Tapio Salakoski,
                            Jukka Teuhola and other members of University of
                            Turku [1].
                        </p>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs="auto">
                        <Button
                            variant="outline-danger"
                            size="lg"
                            className="fw-bold"
                            onClick={() => {
                                navigate("/mpm-simulator/simulator");
                            }}
                        >
                            Take me to the simulator
                        </Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default HomePageHero;
