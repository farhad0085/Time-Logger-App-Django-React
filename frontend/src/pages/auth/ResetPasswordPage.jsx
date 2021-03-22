import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { resetPassword } from '../../store/actions/forgetPasswordActions'
import AuthLayout from '../../components/layouts/AuthLayout'
import { Button, Card, CardBody, FormGroup, Form, Input, InputGroupAddon, InputGroupText, InputGroup, Row, Col } from "reactstrap";
import { Link } from 'react-router-dom'
import { FORGET_PASSWORD_RESET_ERROR } from '../../store/actions/actionTypes';


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

  useEffect(() => {
    dispatch({type: FORGET_PASSWORD_RESET_ERROR, payload: {}})
    // eslint-disable-next-line
  }, [])

  return (
    <AuthLayout>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <h2>Reset Password</h2>
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
                {forgetPassword.reset.error.new_password1 && (
                  <p className="my-2" style={{ color: 'rgb(255, 80, 19)', fontSize: '14px', fontWeight: 'bold'}}>
                    {forgetPassword.reset.error.new_password1}
                  </p>
                )}
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
                {forgetPassword.reset.error.new_password2 && (
                  <p className="my-2" style={{ color: 'rgb(255, 80, 19)', fontSize: '14px', fontWeight: 'bold'}}>
                    {forgetPassword.reset.error.new_password2}
                  </p>
                )}
              </FormGroup>
              
              {(forgetPassword.reset.error.uid || forgetPassword.reset.error.token) && (
                <p className="text-center my-2" style={{ color: 'rgb(255, 80, 19)', fontSize: '14px', fontWeight: 'bold'}}>
                  Token invalid or expired!
                </p>
              )}

              {forgetPassword.reset.status && (
                <p className="text-center my-2" style={{ color: 'rgb(13, 156, 20)', fontSize: '14px', fontWeight: 'bold'}}>
                  Your password has been reset with the new password!
                </p>
              )}

              <div className="text-center">
                <Button className="my-2" color="primary" type="submit">
                  {forgetPassword.reset.loading ? "Please wait..." : "Reset Password"}
                </Button>
              </div>
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