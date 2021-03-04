import React from 'react';
import { UncontrolledCollapse, Navbar, Row, Col, NavbarBrand, Nav, NavLink as Link, NavItem, Container } from 'reactstrap';
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux'

const site_name = "Time Logger"

const TopNavBar = (props) => {
  const auth = useSelector(state => state.auth)

  return (
    <Navbar color="primary" dark expand="md">
      <Container fluid>
        <NavbarBrand to="/" tag={NavLink}>{site_name}</NavbarBrand>
        <button className="navbar-toggler" id="navbar-collapse-main">
          <span className="navbar-toggler-icon" />
        </button>
        <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
          <div className="navbar-collapse-header d-md-none">
            <Row>
              <Col className="collapse-brand" xs="6">
                <Link to="/">
                  {site_name}
                </Link>
              </Col>
              <Col className="collapse-close" xs="6">
                <button className="navbar-toggler" id="navbar-collapse-main">
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          <Nav className="ml-auto" navbar>
            {auth.isAuthenticated ? (
              <>
                <NavItem>
                  <Link to="/create-log" tag={NavLink}>
                    <i className="fa fa-clock" /> Create Log
                  </Link>
                </NavItem>
                {auth.user.is_superuser && (
                  <NavItem>
                    <Link to="/users" tag={NavLink}>
                      <i className="fa fa-users" /> Users
                    </Link>
                  </NavItem>
                )}
                <NavItem>
                  <Link to="/edit-profile" tag={NavLink}>
                    <i className="fa fa-user" /> Profile
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to="/logout" tag={NavLink}>
                    <i className="fas fa-sign-out-alt" /> Logout
                  </Link>
                </NavItem>
              </>
            ) : (
                <>
                  <NavItem>
                    <Link to="/login" tag={NavLink}>
                      <i className="fa fa-user" /> Login
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link to="/register" tag={NavLink}>
                      <i className="fa fa-user" /> Register
                    </Link>
                  </NavItem>
                </>
              )}
          </Nav>
        </UncontrolledCollapse>
      </Container>
    </Navbar>
  );
}

export default TopNavBar;