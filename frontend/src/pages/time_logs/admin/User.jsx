import React from 'react'
import { Button } from 'reactstrap'
import { deleteUser } from "../../../store/actions/adminActions";
import { useDispatch } from 'react-redux'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Link } from 'react-router-dom';


const User = ({ user }) => {

    const dispatch = useDispatch()

    const deleteHandle = userId => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to delete this user?',
            buttons: [
                {
                    label: 'Cancel'
                },
                {
                    label: 'Yes',
                    onClick: () => dispatch(deleteUser(userId))
                },
            ]
        });
    }

    return (
        <tr>
            <th scope="row" className="text-center">{user.username}</th>
            <td className="text-center">{user.email}</td>
            <td className="text-center">{user.duration}</td>
            <td className="text-center">
                <Button
                    color="primary"
                    size="sm"
                    tag={Link}
                    to={`/admin/user/${user.id}`}
                >
                    <i className="fa fa-eye"></i>
                </Button>
                <Button
                    color="danger"
                    size="sm"
                    className="ml-3"
                    onClick={() => deleteHandle(user.id)}
                >
                    <i className="fa fa-trash"></i>
                </Button>
            </td>
        </tr>
    )

}


export default User