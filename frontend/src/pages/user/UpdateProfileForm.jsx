import React, { useEffect, useState } from "react";
import { Button, CardBody, FormGroup, Form, Input, Row, Col } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux'
import { loadUserProfileInformation } from "../../store/actions/userProfileActions";
import { updateProfile } from '../../store/actions/userProfileActions'


const UpdateProfileForm = () => {

    const dispatch = useDispatch()
    const userProfile = useSelector(state => state.userProfile)

    // states
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [postal_code, setPostalCode] = useState("")

    useEffect(() => {
        dispatch(loadUserProfileInformation())
        // eslint-disable-next-line
    }, [])

    const submitHandler = (e) => {
        e.preventDefault();
        const data = {username, email, first_name, last_name, address, city, country, postal_code}
        dispatch(updateProfile(data))
    }

    return (

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
                                    value={username}
                                    id="input-username"
                                    placeholder="Username"
                                    type="text"
                                    onChange={e => setUsername(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col lg="6">
                            <FormGroup>
                                <Label htmlFor="input-email" text="Email address" />
                                <Input
                                    className="form-control-alternative"
                                    id="input-email"
                                    placeholder="your_email@example.com"
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
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
                                    id="input-first-name"
                                    placeholder="First name"
                                    type="text"
                                    value={first_name}
                                    onChange={e => setFirstName(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col lg="6">
                            <FormGroup>
                                <Label htmlFor="input-last-name" text="Last name" />
                                <Input
                                    className="form-control-alternative"
                                    id="input-last-name"
                                    placeholder="Last name"
                                    type="text"
                                    value={last_name}
                                    onChange={e => setLastName(e.target.value)}
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
                                    id="input-address"
                                    placeholder="Address"
                                    type="text"
                                    value={address}
                                    onChange={e => setAddress(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="6">
                            <FormGroup>
                                <Label htmlFor="input-phone" text="Phone" />
                                <Input
                                    className="form-control-alternative"
                                    id="input-phone"
                                    placeholder="Phone"
                                    type="text"
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col lg="6">
                            <FormGroup>
                                <Label htmlFor="input-city" text="City" />
                                <Input
                                    className="form-control-alternative"
                                    id="input-city"
                                    placeholder="City"
                                    type="text"
                                    value={city}
                                    onChange={e => setCity(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        
                    </Row>
                    <Row>
                        <Col lg="6">
                        <FormGroup>
                                <Label htmlFor="input-country" text="Country" />
                                <Input
                                    className="form-control-alternative"
                                    id="input-country"
                                    placeholder="Country"
                                    type="text"
                                    value={country}
                                    onChange={e => setCountry(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col lg="6">
                            <FormGroup>
                                <Label htmlFor="input-postal-code" text="Postal code" />
                                <Input
                                    className="form-control-alternative"
                                    id="input-postal-code"
                                    placeholder="Postal code"
                                    type="text"
                                    value={postal_code}
                                    onChange={e => setPostalCode(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </div>
                <div className="text-center">
                    <small style={{ color: 'green', fontWeight: 'bold' }}>
                        Profile updated successfully!
                    </small>
                </div>
                                
                <div className="text-right">
                    <Button disabled={userProfile.loading} className="my-4" color="primary" type="submit">
                        {userProfile.loading ? "Saving..." : "Save"}
                    </Button>
                </div>
            </Form>
        </CardBody>

    );

}


export default UpdateProfileForm


const Label = ({ htmlFor, text }) => {
    return (
        <label
            className="form-control-label"
            htmlFor={htmlFor}
        >
            {text}
        </label>
    )
}