import React from 'react'
import { Button } from 'reactstrap'
import { deleteTimeLog } from "../../store/actions/timeLogActions";
import { useDispatch } from 'react-redux'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Link } from 'react-router-dom';

const Log = ({ log }) => {

  const dispatch = useDispatch()

  const deleteHandle = logId => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure to delete this log?',
      buttons: [
        {
          label: 'Cancel'
        },
        {
          label: 'Yes',
          onClick: () => dispatch(deleteTimeLog(logId))
        },
      ]
    });
  }

  return (
    <tr>
      <th scope="row" className="text-center">{log.date}</th>
      <td className="text-center">{log.duration}</td>
      <td className="text-center">{log.injury_noted ? <i className="fa fa-check"></i> : <i className="fa fa-times"></i>}</td>
      <td className="text-center">{log.policy_violation_noted ? <i className="fa fa-check"></i> : <i className="fa fa-times"></i>}</td>
      <td className="text-center">{log.comment || "N/A"}</td>
      <td className="text-center">
        <Button
          color="primary"
          size="sm"
          to={`/log/update/${log.id}`}
          tag={Link}
        >
          <i className="fa fa-edit"></i>
        </Button>
        <Button
          color="danger"
          size="sm"
          className="ml-3"
          onClick={() => deleteHandle(log.id)}
        >
          <i className="fa fa-trash"></i>
        </Button>
      </td>
    </tr>
  )

}


export default Log