import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../store/actions/authActions";
import { Link } from "react-router-dom";
import AuthLayout from '../../components/layouts/AuthLayout'
import { Button, Card, CardBody, FormGroup, Form, Input, InputGroupAddon, InputGroupText, InputGroup, Row, Col } from "reactstrap";


const SignIn = ({ history }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }, history));
  };

  return (
    <AuthLayout>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <h2>Login to your account</h2>
            </div>
            <Form role="form" onSubmit={submitHandler}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="far fa-user" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Username or Email"
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}

                  />
                </InputGroup>
              </FormGroup>
              {auth.loginErrors.error && (
                <small style={{ color: 'red' }}>{auth.loginErrors.error}</small>
              )}
              <div className="text-center">
                <Button disabled={auth.loading} className="my-4" color="primary" type="submit">
                  {auth.loading ? "Please wait..." : "Sign In"}
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <Link
              className="text-light"
              to="/forget-password"
            >
              Forgot password?
            </Link>
          </Col>
          <Col className="text-right" xs="6">
            <Link
              className="text-light"
              to="/register"
            >
              Create new account
            </Link>
          </Col>
        </Row>
      </Col>
    </AuthLayout>
  );
};

export default SignIn;
