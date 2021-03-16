import React from "react";
import { Link } from "react-router-dom";
import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";
import classes from './styles.module.scss'

const AuthFooter = () => {
  return (
    <>
      <footer className="py-5">
        <Container>
          <Row className="align-items-center justify-content-xl-between">
            <Col xl="6">
              <div className="copyright text-center text-xl-left text-muted">
                © {new Date().getFullYear()}{" "}
                <Link
                  className="font-weight-bold ml-1"
                  to="/"
                >
                  Akkrual
                </Link>
              </div>
            </Col>
            <Col xl="6">
              <Nav className="nav-footer justify-content-center justify-content-xl-end">
                <NavItem>
                  <NavLink to="/" className={classes.footerNav}>
                    Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to='/about' className={classes.footerNav}>
                    About Us
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default AuthFooter;
