import React from "react";
import { Link } from "react-router-dom";

import { Row, Col, Nav, NavItem, NavLink } from "reactstrap";

const AdminFooter = () => {
  return (
    <footer className="footer">
      <Row className="align-items-center justify-content-xl-between">
        <Col xl="6">
          <div className="copyright text-center text-xl-left text-muted">
            © {new Date().getFullYear()}{" "}
            <Link
              className="font-weight-bold ml-1"
              to="/"
              rel="noopener noreferrer"
            >
              Akkrual
            </Link>
          </div>
        </Col>

        <Col xl="6">
          <Nav className="nav-footer justify-content-center justify-content-xl-end">
            <NavItem>
              <NavLink
                to="/"
                rel="noopener noreferrer"
              >
                Home
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                to="/about"
                rel="noopener noreferrer"
              >
                About Us
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
      </Row>
    </footer>
  );
};

export default AdminFooter;
