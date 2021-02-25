import React, { useEffect } from "react";
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col } from "reactstrap";
import Header from "../../components/Headers/Header";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useSelector, useDispatch } from 'react-redux'
import { loadUserProfileInformation } from "../../store/actions/userProfileActions";

const EditProfilePage = () => {

    const dispatch = useDispatch()
    const userProfile = useSelector(state => state.userProfile)

    useEffect(() => {
        dispatch(loadUserProfileInformation())
        // eslint-disable-next-line
    }, [])

    const submitHandler = (e) => {
        e.preventDefault();
    }

    return (
        <DashboardLayout>
            <Header />
            {/* Page content */}
            <Container className="mt-5" fluid>
                <Row>
                    <Col className="order-xl-1">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">My account</h3>
                                    </Col>
                                    <Col className="text-right" xs="4">
                                        <Button
                                            color="primary"
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}
                                            size="sm"
                                        >
                                            Change Password
                                        </Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={submitHandler}>
                                    <h6 className="heading-small text-muted mb-4">
                                        User information
                                    </h6>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <Label htmlFor="input-username" text="Username" />
                                                    <Input
                                                        className="form-control-alternative"
                                                        value="lucky.jesse"
                                                        id="input-username"
                                                        placeholder="Username"
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <Label htmlFor="input-email" text="Email address" />
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-email"
                                                        placeholder="jesse@example.com"
                                                        type="email"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <Label htmlFor="input-first-name" text="First name" />
                                                    <Input
                                                        className="form-control-alternative"
                                                        value="Lucky"
                                                        id="input-first-name"
                                                        placeholder="First name"
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <Label htmlFor="input-last-name" text="Last name" />
                                                    <Input
                                                        className="form-control-alternative"
                                                        value="Jesse"
                                                        id="input-last-name"
                                                        placeholder="Last name"
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </div>
                                    <hr className="my-4" />

                                    {/* Address */}
                                    <h6 className="heading-small text-muted mb-4">
                                        Contact information
                                    </h6>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col md="12">
                                                <FormGroup>
                                                    <Label htmlFor="input-address" text="Address" />
                                                    <Input
                                                        className="form-control-alternative"
                                                        value="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                                                        id="input-address"
                                                        placeholder="Home Address"
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <Label htmlFor="input-city" text="City" />
                                                    <Input
                                                        className="form-control-alternative"
                                                        value="New York"
                                                        id="input-city"
                                                        placeholder="City"
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <Label htmlFor="input-country" text="Country" />
                                                    <Input
                                                        className="form-control-alternative"
                                                        value="United States"
                                                        id="input-country"
                                                        placeholder="Country"
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <Label htmlFor="input-postal-code" text="Postal code" />
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-postal-code"
                                                        placeholder="Postal code"
                                                        type="number"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="text-right">
                                        <Button disabled={userProfile.loading} className="my-4" color="primary" type="submit">
                                            {userProfile.loading ? "Saving..." : "Save"}
                                        </Button>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </DashboardLayout>
    );
};

export default EditProfilePage;


const Label = ({htmlFor, text}) => {
    return (
        <label
            className="form-control-label"
            htmlFor={htmlFor}
        >
            {text}
        </label>
    )
}