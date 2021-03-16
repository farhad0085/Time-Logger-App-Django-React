import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getLogReport } from '../../store/actions/timeLogActions'
import moment from 'moment';
import { Col, Card, CardBody, Form, FormGroup, Row, Input, Button } from 'reactstrap'
import { loadAllCompanies } from '../../store/actions/authActions';
const ReportFilterForm = () => {

  const dispatch = useDispatch()
  const timeLog = useSelector(state => state.timeLog)
  const auth = useSelector(state => state.auth)
  const todayDate = moment().format("YYYY-MM-DD");

  // states
  const [startDate, setStartDate] = useState(todayDate)
  const [endDate, setEndDate] = useState(todayDate)
  const [company, setCompany] = useState(0)

  const submitHandler = event => {
    event.preventDefault()
    dispatch(getLogReport())
  }

  useEffect(() => {
    dispatch(loadAllCompanies())
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (!auth.user.is_superuser) {
      setCompany(auth.company.data.find(item => item.name === auth.user.company)?.id)
    }
    // eslint-disable-next-line
  }, [auth.company])

  return (
    <Row className="justify-content-md-center mb-8">
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody>
            <Form onSubmit={submitHandler}>
              <Row>
                <Col lg="6">
                  <FormGroup className="mb-3">
                    <Label htmlFor={"startDate"} text={"Start Date"} />
                    <Input
                      placeholder="Start Date"
                      id="startDate"
                      type="date"
                      max={endDate}
                      value={startDate}
                      onChange={e => setStartDate(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup className="mb-3">
                    <Label htmlFor={"endDate"} text={"Start Date"} />
                    <Input
                      placeholder="End Date"
                      id="endDate"
                      type="date"
                      max={moment().format("YYYY-MM-DD")}
                      value={endDate}
                      onChange={e => setEndDate(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup className="mb-3">
                    <Label htmlFor={"company"} text={"Company"} />
                    {auth.company.loading ? <p><small>Loading...</small></p> : (
                      <>
                        {auth.company.error ? <p><small>{auth.company.error}</small></p> : (
                          <Input type="select" value={company} onChange={e => setCompany(e.target.value)}>
                            <option disabled={!auth.user.is_superuser}>Select Company</option>
                            {auth.company.data.map(item => (
                              <option
                                value={item.id}
                                key={item.id}
                                disabled={auth.user.company !== item.name && !auth.user.is_superuser}
                              >
                                {item.name}
                              </option>
                            ))}
                          </Input>
                        )}
                      </>
                    )}

                  </FormGroup>
                </Col>
              </Row>
              <div className="text-center">
                <Button disabled={timeLog.logReport.loading} className="my-1" color="primary" type="submit">
                  {timeLog.logReport.loading ? "Please wait..." : "Get Report"}
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )

}


export default ReportFilterForm


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