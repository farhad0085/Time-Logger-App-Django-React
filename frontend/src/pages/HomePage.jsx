import React, { useEffect } from "react";
import { Button, Card, CardHeader, Container, Row, Col } from "reactstrap";
import Header from "../components/Headers/Header";
import { useSelector, useDispatch } from 'react-redux'
import DashboardLayout from '../components/layouts/DashboardLayout'
import Logs from "./time_logs/Logs";
import { Link } from "react-router-dom";
import { loadLogs } from '../store/actions/timeLogActions'
import MonthPicker from "./time_logs/MonthPicker";

const HomePage = (props) => {

    const dispatch = useDispatch()
    const timeLog = useSelector(state => state.timeLog)

    useEffect(() => {
        dispatch(loadLogs())
        // eslint-disable-next-line
    }, [])

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
                                        <h3 className="mb-0">
                                            Logs
                                            <Button
                                                color="primary"
                                                tag={Link}
                                                to="/create-log"
                                                size="sm"
                                                className="ml-4"
                                            >
                                               Create Log
                                            </Button>
                                        </h3>
                                    </div>
                                    <MonthPicker />
                                </Row>
                            </CardHeader>
                            <Logs logs={timeLog.logs} loading={timeLog.loading} />
                        </Card>
                    </Col>
                </Row>
            </Container>
        </DashboardLayout>
    );
};

export default HomePage;
