import React, { useEffect } from 'react'
import { Card, CardHeader, Container, Row, Col } from "reactstrap";
import Header from "../../components/Headers/Header";
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useSelector, useDispatch } from 'react-redux'
import Logs from '../time_logs/Logs'
import { loadLogs } from '../../store/actions/timeLogActions';
import MonthPicker from '../time_logs/MonthPicker';
import { Link } from 'react-router-dom';


const UserPage = ({match}) => {

    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const timeLog = useSelector(state => state.timeLog)

    useEffect(() => {
        dispatch(loadLogs({created_by: userId}))
        // eslint-disable-next-line
    }, [])

    const userId = match.params.userId

    return (
        <DashboardLayout>
            <Header />

            <Container className="mt-5" fluid>
                <Row className="mt-5">
                    <Col className="mb-5 mb-xl-0" xl="12">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h3 className="mb-0"><Link to="/admin/users">Go Back</Link> User ID: {userId}</h3>
                                    </div>
                                    <MonthPicker />
                                </Row>
                            </CardHeader>
                            
                            {auth.user.is_superuser ? (
                                <Logs logs={timeLog.logs} loading={timeLog.loading} />
                            ) : (
                                <h4 className="text-center pb-4" style={{color: 'red', fontWeight: 'bold'}}>You're not allowed in this page!</h4>
                            )}
                        </Card>
                    </Col>
                </Row>
            </Container>
        </DashboardLayout>
    )

}


export default UserPage