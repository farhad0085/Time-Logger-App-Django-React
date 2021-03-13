import React from 'react'
import { createUUID } from '../../utils'
import Log from './Log'
import { Table } from "reactstrap";


const Logs = ({ logs, loading }) => {

  return (
    <div>
      {loading ? <h4 className="text-center pb-3">Loading...</h4> : (
        <Table className="align-items-center table-flush" responsive>
          <thead className="thead-light">
            <tr>
              <th scope="col" className="text-center">Date</th>
              <th scope="col" className="text-center">Duration</th>
              <th scope="col" className="text-center">Injuries Noted</th>
              <th scope="col" className="text-center">Violations noted</th>
              <th scope="col" className="text-center">Comments</th>
              <th scope="col" className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(log => <Log key={createUUID()} log={log} />)}
          </tbody>
        </Table>
      )}

    </div>
  )

}


export default Logs
