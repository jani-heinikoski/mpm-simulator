import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";

function MainNavbar() {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <Navbar bg="dark" variant="dark" className="mb-4">
            <Container>
                <Navbar.Brand>
                    <Link to="/mpm-simulator">
                        <Badge bg="danger">MPM Simulator</Badge>
                    </Link>
                </Navbar.Brand>
                <Nav
                    className="me-auto"
                    onSelect={(selectedKey) => navigate(selectedKey)}
                >
                    <Nav.Item>
                        <Nav.Link
                            eventKey="/mpm-simulator"
                            active={location.pathname === "/mpm-simulator"}
                        >
                            Home
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link
                            eventKey="/mpm-simulator/simulator"
                            active={
                                location.pathname === "/mpm-simulator/simulator"
                            }
                        >
                            Simulator
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default MainNavbar;
