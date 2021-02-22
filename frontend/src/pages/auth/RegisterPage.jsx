import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../../store/actions/authActions";
import { Link } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Button, Card, CardBody, FormGroup, Form, Input, InputGroupAddon, InputGroupText, InputGroup, Row, Col } from "reactstrap";

const RegisterPage = ({ history }) => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    // states
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [username, setUsername] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    // handlers
    const submitHandler = (event) => {
        event.preventDefault();

        const registerData = {
            email,
            password1,
            password2,
            username,
            first_name,
            last_name,
            phone,
        };
        dispatch(register(registerData, history));
    };

    useEffect(() => {
        if (!!auth.registerErrors.non_field_errors) {
            setMessage(auth.registerErrors.non_field_errors[0]);
        }
    }, [auth]);

    return (
        <AuthLayout>
            <Col lg="6" md="8">
                <Card className="bg-secondary shadow border-0">
                    <CardBody className="px-lg-5 py-lg-5">
                        <div className="text-center text-muted mb-4">
                            <h2>Create a new Account</h2>
                        </div>
                        <Form role="form" onSubmit={submitHandler}>
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="far fa-user" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    
                                    <Input
                                        placeholder="Username"
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </InputGroup>
                                {auth.registerErrors.username && (
                                    <small style={{ color: "red" }}>
                                        {auth.registerErrors.username[0]}
                                    </small>
                                )}
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-email-83" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email"
                                        autoComplete="new-email"
                                    />
                                </InputGroup>
                                {auth.registerErrors.email && (
                                    <small style={{ color: "red" }}>{auth.registerErrors.email[0]}</small>
                                )}
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
                                        autoComplete="new-password"
                                        value={password1}
                                        onChange={e => setPassword1(e.target.value)}
                                    />
                                </InputGroup>
                                {auth.registerErrors.password1 && (
                                    <small style={{ color: "red" }}>
                                        {auth.registerErrors.password1[0]}
                                    </small>
                                )}
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-lock-circle-open" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder="Confirm Password"
                                        type="password"
                                        autoComplete="new-password"
                                        value={password2}
                                        onChange={e => setPassword2(e.target.value)}
                                    />
                                </InputGroup>
                                {auth.registerErrors.password2 && (
                                    <small style={{ color: "red" }}>
                                        {auth.registerErrors.password2[0]}
                                    </small>
                                )}
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="far fa-user" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder="First Name"
                                        type="text"
                                        value={first_name}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                    <Input
                                        placeholder="Last Name"
                                        type="text"
                                        value={last_name}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </InputGroup>
                                {auth.registerErrors.first_name && (
                                    <small style={{ color: "red" }}>
                                        {auth.registerErrors.first_name[0]}
                                    </small>
                                )}
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-mobile-button" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder="Phone"
                                        type="phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </InputGroup>
                                {auth.registerErrors.phone && (
                                    <small style={{ color: "red" }}>
                                        {auth.registerErrors.phone[0]}
                                    </small>
                                )}
                            </FormGroup>
                            {message && (
                                <small style={{color: 'red'}}>{message}</small>
                            )}
                            <div className="text-center">
                                <Button disabled={auth.loading} className="mt-4" color="primary" type="submit">
                                    {auth.loading ? "Please wait..." : "Create account" }
                                </Button>
                            </div>
                            
                        </Form>
                    </CardBody>
                </Card>
                <Row className="mt-3">
                    <Col className="text-center" xs="12">
                        <Link
                            className="text-light"
                            to="/login"
                        >
                            Already have an account? Login Here
                        </Link>
                    </Col>
                </Row>
            </Col>
        </AuthLayout>
    );
};

export default RegisterPage;
