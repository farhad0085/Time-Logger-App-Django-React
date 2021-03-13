import React, { useEffect } from "react";
import { Button, Card, CardHeader, Container, Row, Col } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import Logs from "./Logs";
import { Link } from "react-router-dom";
import { loadLogs } from '../../store/actions/timeLogActions'
import MonthPicker from "./MonthPicker";

const LogsPage = (props) => {

  const dispatch = useDispatch()
  const timeLog = useSelector(state => state.timeLog)

  useEffect(() => {
    dispatch(loadLogs())
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

export default LogsPage;
