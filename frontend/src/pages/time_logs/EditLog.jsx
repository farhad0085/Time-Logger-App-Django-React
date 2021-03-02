import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateTimeLog, loadSingleLog } from '../../store/actions/timeLogActions'
import moment from 'moment';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import {
    Col, Card, CardBody, Form, FormGroup, InputGroup, Row,
    InputGroupAddon, InputGroupText, Input, Button, Container
} from 'reactstrap'
import * as Types from '../../store/actions/actionTypes'
import { Link } from 'react-router-dom';

const EditLog = ({ match }) => {
    const dispatch = useDispatch()
    const timeLog = useSelector(state => state.timeLog)
    const todayDate = moment().format("YYYY-MM-DD");

    const logId = match.params.logId;

    // load the log
    useEffect(() => {
        dispatch(loadSingleLog(logId))
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (Object.keys(timeLog.singleLog).length > 0) {
            setDate(timeLog.singleLog.date)
            setHour(parseInt(timeLog.singleLog.duration / 60))
            setMinute(timeLog.singleLog.duration % 60)
            setInjuryNoted(timeLog.singleLog.injury_noted)
            setPolicyViolationNoted(timeLog.singleLog.policy_violation_noted)
            setComment(timeLog.singleLog.comment)
        }
    }, [timeLog.singleLog])

    // states
    const [date, setDate] = useState(todayDate)
    const [hour, setHour] = useState("")
    const [minute, setMinute] = useState("")
    const [injury_noted, setInjuryNoted] = useState(false)
    const [policy_violation_noted, setPolicyViolationNoted] = useState(false)
    const [comment, setComment] = useState("")

    const submitHandler = event => {
        event.preventDefault()
        const duration = (parseInt(hour || 0) * 60) + parseInt(minute || 0)
        const requestData = { date, duration, injury_noted, policy_violation_noted, comment }
        dispatch(updateTimeLog(logId, requestData))
    }

    useEffect(() => {
        dispatch({ type: Types.TIME_LOG_SAVED, payload: false });
        dispatch({ type: Types.TIME_LOG_SAVE_ERROR, payload: {} });
        dispatch({ type: Types.TIME_LOG_LOAD_ERROR, payload: {} });
        // eslint-disable-next-line
    }, [])

    return (
        <DashboardLayout>
            <Container className="mt-5" fluid>
                <Row className="justify-content-md-center">
                    <Col lg="5" md="7">
                        <Card className="bg-secondary shadow border-0">
                            <CardBody className="px-lg-5 py-lg-5">
                                <div className="text-center text-muted mb-4">
                                    <h2>Edit Log</h2>
                                </div>
                                {timeLog.singleLogLoading ? (
                                    <h4 className="text-center">
                                        Loading... Please wait!
                                    </h4>
                                ) : (
                                        <>
                                            {timeLog.singleLogLoadError ? (
                                                <h4 className="text-center" style={{ color: 'red', fontWeight: 'bold' }}>
                                                    {timeLog.singleLogLoadError}
                                                </h4>
                                            ) : (
                                                    <Form role="form" onSubmit={submitHandler}>
                                                        <FormGroup className="mb-3">
                                                            <InputGroup className="input-group-alternative">
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText>
                                                                        <i className="far fa-calendar" />
                                                                    </InputGroupText>
                                                                </InputGroupAddon>
                                                                <Input
                                                                    placeholder="Date"
                                                                    type="date"
                                                                    max={moment().format("YYYY-MM-DD")}
                                                                    value={date}
                                                                    onChange={e => setDate(e.target.value)}
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
                                                                    placeholder="Hours"
                                                                    value={hour}
                                                                    type="text"
                                                                    onChange={e => setHour(e.target.value.replace(/[^0-9]/g,'').replace(/2[4-9]|[3-9]\d+|[1-9]\d{2,}/g, '23'))}
                                                                />
                                                                <Input
                                                                    placeholder="Minutes"
                                                                    value={minute}
                                                                    type="text"
                                                                    onChange={e => setMinute(e.target.value.replace(/[^0-9]/g,'').replace(/6[0-9]|[7-9]\d+|[1-9]\d{2,}/g, '59'))}
                                                                />
                                                            </InputGroup>
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <InputGroup className="input-group-alternative">

                                                                <Input
                                                                    placeholder="Comments (Optional)"
                                                                    value={comment}
                                                                    rows={3}
                                                                    type="textarea"
                                                                    onChange={e => setComment(e.target.value)}
                                                                />
                                                            </InputGroup>
                                                        </FormGroup>
                                                        <div className="custom-control custom-control-alternative custom-checkbox mb-3">
                                                            <input
                                                                className="custom-control-input"
                                                                id="injuriNote"
                                                                type="checkbox"
                                                                checked={injury_noted}
                                                                onChange={e => setInjuryNoted(e.target.checked)}
                                                            />
                                                            <label className="custom-control-label" htmlFor="injuriNote">
                                                                Were there any injuries noted?
                                                            </label>
                                                        </div>
                                                        <div className="custom-control custom-control-alternative custom-checkbox mb-3">
                                                            <input
                                                                className="custom-control-input"
                                                                id="policyNote"
                                                                type="checkbox"
                                                                checked={policy_violation_noted}
                                                                onChange={e => setPolicyViolationNoted(e.target.checked)}
                                                            />
                                                            <label className="custom-control-label" htmlFor="policyNote">
                                                                Were there any violation of company policy noted?
                                                            </label>
                                                        </div>

                                                        {timeLog.createLogError && (
                                                            <small style={{ color: 'red' }}>{timeLog.createLogError}</small>
                                                        )}
                                                        <div className="text-center">
                                                            {timeLog.logSaved && (
                                                                <small style={{ color: 'green', fontWeight: 'bold' }}>
                                                                    Log saved successfully! <Link to="/">Go back</Link>
                                                                </small>
                                                            )}
                                                            {timeLog.logSaveError && (
                                                                <small style={{ color: 'red', fontWeight: 'bold' }}>{timeLog.logSaveError}</small>
                                                            )}
                                                        </div>
                                                        <div className="text-center">
                                                            <Button disabled={timeLog.loading} className="my-4" color="primary" type="submit">
                                                                {timeLog.loading ? "Saving..." : "Save"}
                                                            </Button>
                                                        </div>
                                                    </Form>
                                                )}
                                        </>
                                    )}

                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </DashboardLayout>
    )

}




export default EditLog