import React from 'react'
import { Table } from "reactstrap";
import { createUUID } from '../../../utils'
import User from './User';


const Users = ({ users, loading }) => {
  return (
    <div>
      {loading ? <h4 className="text-center pb-3">Loading...</h4> : (
        <Table className="align-items-center table-flush" responsive>
          <thead className="thead-light">
            <tr>
              <th scope="col" className="text-center">User ID</th>
              <th scope="col" className="text-center">Username</th>
              <th scope="col" className="text-center">Email</th>
              <th scope="col" className="text-center">This Month Total Time</th>
              <th scope="col" className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => <User key={createUUID()} user={user} />)}
          </tbody>
        </Table>
      )}

    </div>
  )

}


export default Users