import React, { useState } from 'react'
import { Table } from "reactstrap";
import { createUUID } from '../../utils';


const BuildReport = ({ data }) => {

  return (
    <>
      {data.map(item => (
        <div className="mb-4" key={createUUID()}>
          <h2 className="text-center">{item.company}</h2>
          <h3 className="text-center">{item.date_range}</h3>
          <p className="text-center">Click the user name to view his/her report for each date</p>
          <Table bordered hover striped responsive>
            <thead>
              <tr>
                <th className="text-center">User</th>
                <th className="text-center">Total Time</th>
                <th className="text-center">Total Injury Noted</th>
                <th className="text-center">Total Policy Violation Noted</th>
              </tr>
            </thead>
            <tbody>
              {item.data.map(user => <SingleUserData key={createUUID()} item={user} />)}
            </tbody>
          </Table>
        </div>
      ))}
    </>
  );

}


export default BuildReport


const SingleUserData = ({ item }) => {

  const [isOpen, setIsOpen] = useState(false)

  const handleDoubleClick = event => {
    if (event.detail > 1) {
      event.preventDefault();
    }
  }

  return (
    <>
      <tr>
        <th
          style={{ cursor: 'pointer' }}
          onClick={() => setIsOpen(!isOpen)}
          scope="row"
          className="text-center"
          onMouseDown={handleDoubleClick}
        >
          <b>{item.user}</b>
        </th>
        <td className="text-center"><b>{item.total.time}</b></td>
        <td className="text-center"><b>{item.total.injury_noted}</b></td>
        <td className="text-center"><b>{item.total.policy_violation_noted}</b></td>
      </tr>
      {isOpen && (
        <>
          {item.data.map(dateDate => (
            <tr key={createUUID()}>
              <td className="text-center" colSpan={2}>{dateDate.date}</td>
              <td className="text-center" colSpan={2}>{dateDate.time}</td>
            </tr>
          ))}
          <tr>
            <td className="text-center" colSpan={2}><b>Total</b></td>
            <td className="text-center" colSpan={2}>{item.total.time}</td>
          </tr>
        </>
      )}
    </>
  )
}