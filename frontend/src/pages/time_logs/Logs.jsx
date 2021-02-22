import React from 'react'
import { createUUID } from '../../utils'
import Log from './Log'
import { Table } from "reactstrap";


const Logs = ({ logs, loading }) => {

    return (
        <div>
            {loading ? <h4 className="text-center">Loading...</h4> : (
                <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Hours</th>
                            <th scope="col">Injuries Noted</th>
                            <th scope="col">Violations noted</th>
                            <th scope="col">Comments</th>
                            <th scope="col">Actions</th>
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
