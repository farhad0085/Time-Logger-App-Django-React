import React, {useState} from 'react'
import {
    Col, Card, CardBody, Form, FormGroup, InputGroup, Row,
    InputGroupAddon, InputGroupText, Input, Button, Container
} from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { updatePassword } from '../../store/actions/userProfileActions'

const UpdatePasswordForm = () => {

    const dispatch = useDispatch()
    const userProfile = useSelector(state => state.userProfile)

    const submitHandler = event => {
        event.preventDefault()
        dispatch(updatePassword({old_password, new_password_1, new_password_2}))
    }

    // states
    const [old_password, setOldPassword] = useState("")
    const [new_password_1, setNewPassword1] = useState("")
    const [new_password_2, setNewPassword2] = useState("")

    return (
        <Container className="my-5" fluid>
            <Row className="justify-content-md-center">
                <Col lg="5" md="7">
                    <Card className="bg-secondary shadow border-0">
                        <CardBody className="px-lg-5 py-lg-5">
                            <div className="text-center text-muted mb-4">
                                <h2>Change Password</h2>
                            </div>
                            <Form role="form" onSubmit={submitHandler}>
                                <FormGroup className="mb-3">
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="far fa-calendar" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            placeholder="Old Password"
                                            type="password"
                                            value={old_password}
                                            onChange={e => setOldPassword(e.target.value)}
                                        />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="far fa-clock" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            placeholder="New Password"
                                            value={new_password_1}
                                            onChange={e => setNewPassword1(e.target.value)}
                                            type="password"
                                        />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="far fa-calendar" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            placeholder="Confirm Password"
                                            value={new_password_2}
                                            type="password"
                                            onChange={e => setNewPassword2(e.target.value)}
                                        />
                                    </InputGroup>
                                </FormGroup>

                                <div className="text-center">
                                    <small style={{ color: 'green', fontWeight: 'bold' }}>
                                        Password updated successfully! <Link to="/">Go back</Link>
                                    </small>
                                </div>
                                <div className="text-center">
                                    <Button disabled={userProfile.loading} className="my-4" color="primary" type="submit">
                                        {userProfile.loading ? "Updating..." : "Update Password"}
                                    </Button>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    )

}


export default UpdatePasswordForm