import React, { useEffect, useState } from "react";
import { Button, CardBody, FormGroup, Form, Input, Row, Col } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux'
import { updateProfile } from '../../store/actions/userProfileActions'


const UpdateProfileForm = () => {

    const dispatch = useDispatch()
    const userProfile = useSelector(state => state.userProfile)
    const auth = useSelector(state => state.auth)

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
        if(auth.user.username) setUsername(auth.user.username)
        if(auth.user.email) setEmail(auth.user.email)
        if(auth.user.first_name) setFirstName(auth.user.first_name)
        if(auth.user.last_name) setLastName(auth.user.last_name)
        if(auth.user.profile.address) setAddress(auth.user.profile.address)
        if(auth.user.profile.phone) setPhone(auth.user.profile.phone)
        if(auth.user.profile.city) setCity(auth.user.profile.city)
        if(auth.user.profile.country) setCountry(auth.user.profile.country)
        if(auth.user.profile.postal_code) setPostalCode(auth.user.profile.postal_code)
    }, [auth.user])

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
                            <CustomFormGroup
                                inputId="input-username"
                                labelText="Username"
                                value={username}
                                disabled
                            />
                        </Col>
                        <Col lg="6">
                            <CustomFormGroup
                                inputId="input-email"
                                labelText="Email address"
                                value={email}
                                disabled
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="6">
                            <CustomFormGroup
                                inputId="input-first-name"
                                labelText="First name"
                                value={first_name}
                                onChange={setFirstName}
                            />
                        </Col>
                        <Col lg="6">
                            <CustomFormGroup
                                inputId="input-last-name"
                                labelText="Last name"
                                value={last_name}
                                onChange={setLastName}
                            />
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
                            <CustomFormGroup
                                inputId="input-address"
                                labelText="Address"
                                value={address}
                                onChange={setAddress}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="6">
                            <CustomFormGroup
                                inputId="input-phone"
                                labelText="Phone"
                                value={phone}
                                onChange={setPhone}
                            />
                        </Col>
                        <Col lg="6">
                            <CustomFormGroup
                                inputId="input-city"
                                labelText="City"
                                value={city}
                                onChange={setCity}
                            />
                        </Col>
                        
                    </Row>
                    <Row>
                        <Col lg="6">
                            <CustomFormGroup
                                inputId="input-country"
                                labelText="Country"
                                value={country}
                                onChange={setCountry}
                            />
                        </Col>
                        <Col lg="6">
                            <CustomFormGroup
                                inputId="input-postal-code"
                                labelText="Postal code"
                                value={postal_code}
                                onChange={setPostalCode}
                            />
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

const CustomFormGroup = (props) => {

    const {inputId, labelText, value, onChange, inputType, placeholder, disabled} = props

    return (
        <FormGroup>
            <Label htmlFor={inputId} text={labelText} />
            <Input
                className="form-control-alternative"
                id={inputId}
                placeholder={placeholder || labelText}
                type={inputType || 'text'}
                value={value}
                disabled={disabled || false}
                onChange={onChange ? e => onChange(e.target.value) : null}
            />
        </FormGroup>
    )
}