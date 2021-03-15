import React, { useEffect } from 'react'
import { Card, CardHeader, Container, Row, Col } from "reactstrap";
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useSelector, useDispatch } from 'react-redux'
import Logs from '../time_logs/Logs'
import { getLogReport } from '../../store/actions/timeLogActions';
import { Link } from 'react-router-dom';


const ReportPage = () => {

  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const timeLog = useSelector(state => state.timeLog)

  useEffect(() => {
    dispatch(getLogReport())
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
                    <h3 className="mb-0"><Link to="/">Go Back</Link> &raquo; Report</h3>
                  </div>
                </Row>
              </CardHeader>

              {auth.user.is_company_owner ? (
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


export default ReportPage