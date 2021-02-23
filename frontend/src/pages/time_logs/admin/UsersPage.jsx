import React, { useEffect } from "react";
import { Card, CardHeader, Container, Row, Col } from "reactstrap";
import Header from "../../../components/Headers/Header";
import { useSelector, useDispatch } from 'react-redux'
import DashboardLayout from '../../../components/layouts/DashboardLayout'
import { loadUsers } from '../../../store/actions/adminActions'
import Users from "./Users";

const UsersPage = (props) => {

    const dispatch = useDispatch()
    const admin = useSelector(state => state.admin)

    useEffect(() => {
        dispatch(loadUsers())
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
                                        <h3 className="mb-0">Users</h3>
                                    </div>
                                </Row>
                            </CardHeader>
                            <Users users={admin.users} loading={admin.loading} />
                        </Card>
                    </Col>
                </Row>
            </Container>
        </DashboardLayout>
    );
};

export default UsersPage;
