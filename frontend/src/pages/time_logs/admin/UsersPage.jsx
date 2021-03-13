import React, { useEffect } from "react";
import { Card, CardHeader, Container, Row, Col } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux'
import DashboardLayout from '../../../components/layouts/DashboardLayout'
import { loadUsers } from '../../../store/actions/adminActions'
import Users from "./Users";
import { Link } from "react-router-dom";

const UsersPage = (props) => {

    const dispatch = useDispatch()
    const admin = useSelector(state => state.admin)
    const auth = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(loadUsers())
        // eslint-disable-next-line
    }, [])

    return (
        <DashboardLayout>
          <Container className="mt-5" fluid>
            <Row className="mt-5">
              <Col className="mb-5 mb-xl-0" xl="12">
                <Card className="shadow">
                  <CardHeader className="border-0">
                    <Row className="align-items-center">
                      <div className="col">
                        <h3 className="mb-0"><Link to="/">Go Back</Link> Users</h3>
                      </div>
                    </Row>
                  </CardHeader>
                    
                  {auth.user.is_superuser ? (
                    <Users users={admin.users} loading={admin.loading} />
                  ) : (
                    <h4 className="text-center pb-4" style={{color: 'red', fontWeight: 'bold'}}>You're not allowed in this page!</h4>
                  )}
                </Card>
              </Col>
            </Row>
          </Container>
        </DashboardLayout>
    );
};

export default UsersPage;
