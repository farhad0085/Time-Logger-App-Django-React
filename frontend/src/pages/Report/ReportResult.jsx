import React from 'react'
import { Card, CardHeader, Container, Row, Col, CardBody } from "reactstrap";
import { useSelector } from 'react-redux'
import BuildReport from './BuildReport';
import Export from './Export';


const ReportResult = () => {

  const timeLog = useSelector(state => state.timeLog)

  return (
    <Container>
      <Row className="mb-8">
        <Col className="mb-5 mb-xl-0" xl="12">
          <Card className="shadow">
            <CardHeader className="border-0">
              <div className="col">
                <h3 className={`mb-0 ${!timeLog.logReport.data.export && 'text-center'}`}>Report Result
                {timeLog.logReport.data.export && <Export data={timeLog.logReport.data.export || {}} />}
                </h3>
              </div>
            </CardHeader>
            <hr className="my-0" />
            <CardBody>
              {timeLog.logReport.loading ? (
                <p className="text-center">Loading...</p>
              ) : (
                <>
                  {timeLog.logReport.error && <p className="text-center">{timeLog.logReport.error}</p>}
                  {Object.keys(timeLog.logReport.data).length > 0 && <BuildReport data={timeLog.logReport.data.data} />}
                </>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )

}


export default ReportResult