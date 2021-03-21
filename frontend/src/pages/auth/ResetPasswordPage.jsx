import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { resetPassword } from '../../store/actions/forgetPasswordActions'
import AuthLayout from '../../components/layouts/AuthLayout'
import { Button, Card, CardBody, FormGroup, Form, Input, InputGroupAddon, InputGroupText, InputGroup, Row, Col } from "reactstrap";
import { Link } from 'react-router-dom'


const ResetPasswordPage = (props) => {

  const dispatch = useDispatch()

  const [new_password1, setPassword1] = useState("");
  const [new_password2, setPassword2] = useState("");
  const {uid, token} = props.match.params;
  
  const forgetPassword = useSelector(state => state.forgetPassword)

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(resetPassword({uid, token, new_password1, new_password2}));
  };

  return (
    <AuthLayout>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <h2>Forget password?</h2>
              <p>Don't worry, a password reset link will be sent to your registered email address.</p>
            </div>
            <Form onSubmit={submitHandler}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="New Password"
                    type="password"
                    autoComplete='new-password'
                    value={new_password1}
                    onChange={e => setPassword1(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>

              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Confirm Password"
                    type="password"
                    autoComplete='new-password'
                    value={new_password2}
                    onChange={e => setPassword2(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>

              <div className="text-center">
                <Button disabled={forgetPassword.request.loading} className="my-2" color="primary" type="submit">
                  {forgetPassword.request.loading ? "Requesting..." : "Reset Password"}
                </Button>
              </div>
              {forgetPassword.request.error && (
                <p className="text-center" style={{ color: 'rgb(255, 80, 19)', fontWeight: 'bold'}}>
                  No Account found for that email address.
                </p>
              )}
              {forgetPassword.request.status && (
                <p className="text-center" style={{ color: 'rgb(19, 204, 96)', fontWeight: 'bold'}}>
                  Password reset e-mail has been sent.
                </p>
              )}
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <Link className="text-light" to="/login">
              Login here
            </Link>
          </Col>
          <Col className="text-right" xs="6">
            <Link className="text-light" to="/register">
              Create new account
            </Link>
          </Col>
        </Row>
      </Col>
    </AuthLayout>
  )

}


export default ResetPasswordPage