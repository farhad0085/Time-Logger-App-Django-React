import React, { useEffect, useState } from "react";
import { Button, CardBody, FormGroup, Form, Input, Row, Col } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux'
import { updateProfile } from '../../store/actions/userProfileActions'
import { USER_PROFILE_UPDATE_ERROR } from "../../store/actions/actionTypes";


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
    if (auth.user.username) setUsername(auth.user.username)
    if (auth.user.email) setEmail(auth.user.email)
    if (auth.user.first_name) setFirstName(auth.user.first_name)
    if (auth.user.last_name) setLastName(auth.user.last_name)
    if (auth.user.address) setAddress(auth.user.address)
    if (auth.user.phone) setPhone(auth.user.phone)
    if (auth.user.city) setCity(auth.user.city)
    if (auth.user.country) setCountry(auth.user.country)
    if (auth.user.postal_code) setPostalCode(auth.user.postal_code)
  }, [auth.user])

  useEffect(() => {
    // remove the previous errors and success message
    dispatch({ type: USER_PROFILE_UPDATE_ERROR, payload: {} })
    // eslint-disable-next-line
  }, [])

  const submitHandler = (e) => {
    e.preventDefault();
    const data = { username, email, first_name, last_name, address, city, phone, country, postal_code }
    dispatch(updateProfile(auth.user.id, data))
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
                hasError={!!userProfile.userProfileUpdateErrors.username}
                errorMsg={userProfile.userProfileUpdateErrors.username}
              />
            </Col>
            <Col lg="6">
              <CustomFormGroup
                inputId="input-email"
                labelText="Email address"
                value={email}
                disabled
                hasError={!!userProfile.userProfileUpdateErrors.email}
                errorMsg={userProfile.userProfileUpdateErrors.email}
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
                hasError={!!userProfile.userProfileUpdateErrors.first_name}
                errorMsg={userProfile.userProfileUpdateErrors.first_name}
              />
            </Col>
            <Col lg="6">
              <CustomFormGroup
                inputId="input-last-name"
                labelText="Last name"
                value={last_name}
                onChange={setLastName}
                hasError={!!userProfile.userProfileUpdateErrors.last_name}
                errorMsg={userProfile.userProfileUpdateErrors.last_name}
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
                hasError={!!(userProfile.userProfileUpdateErrors.profile && userProfile.userProfileUpdateErrors.profile.address)}
                errorMsg={(userProfile.userProfileUpdateErrors.profile && userProfile.userProfileUpdateErrors.profile.address)}
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
                hasError={!!(userProfile.userProfileUpdateErrors.profile && userProfile.userProfileUpdateErrors.profile.phone)}
                errorMsg={(userProfile.userProfileUpdateErrors.profile && userProfile.userProfileUpdateErrors.profile.phone)}
              />
            </Col>
            <Col lg="6">
              <CustomFormGroup
                inputId="input-city"
                labelText="City"
                value={city}
                onChange={setCity}
                hasError={!!(userProfile.userProfileUpdateErrors.profile && userProfile.userProfileUpdateErrors.profile.city)}
                errorMsg={(userProfile.userProfileUpdateErrors.profile && userProfile.userProfileUpdateErrors.profile.city)}
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
                hasError={!!(userProfile.userProfileUpdateErrors.profile && userProfile.userProfileUpdateErrors.profile.country)}
                errorMsg={(userProfile.userProfileUpdateErrors.profile && userProfile.userProfileUpdateErrors.profile.country)}
              />
            </Col>
            <Col lg="6">
              <CustomFormGroup
                inputId="input-postal-code"
                labelText="Postal code"
                value={postal_code}
                onChange={setPostalCode}
                hasError={!!(userProfile.userProfileUpdateErrors.profile && userProfile.userProfileUpdateErrors.profile.postal_code)}
                errorMsg={(userProfile.userProfileUpdateErrors.profile && userProfile.userProfileUpdateErrors.profile.postal_code)}
              />
            </Col>
          </Row>
        </div>
        {userProfile.userProfileUpdated && (
          <div className="text-center">
            <small style={{ color: 'green', fontWeight: 'bold' }}>
              Profile updated successfully!
						</small>
          </div>
        )}
        {Object.keys(userProfile.userProfileUpdateErrors).length > 0 && (
          <div className="text-center">
            <small style={{ color: 'red', fontWeight: 'bold' }}>
              Couldn't save the information, please try again!
						</small>
          </div>
        )}

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

  const { inputId, labelText, value, onChange, inputType, placeholder, disabled, hasError, errorMsg } = props

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
      {hasError && (
        <small style={{ color: "red", fontWeight: 'bold' }}>
          {errorMsg}
        </small>
      )}
    </FormGroup>
  )
}