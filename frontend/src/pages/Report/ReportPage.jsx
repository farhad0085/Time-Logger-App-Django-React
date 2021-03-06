import React, { useEffect } from 'react'
import { Card, CardHeader, Container, Row, Col } from "reactstrap";
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import ReportFilterForm from './ReportFilterForm';
import ReportResult from './ReportResult';
import { LOG_REPORT_LOAD_ERROR } from '../../store/actions/actionTypes';


const ReportPage = () => {

  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  
  useEffect(() => {
    // remove previously loaded report or errors
    dispatch({type: LOG_REPORT_LOAD_ERROR, payload: ""})
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
                <>
                  <ReportFilterForm />
                  <ReportResult />
                </>
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