import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/actions/authActions'


const Logout = ({ history }) => {
    const dispatch = useDispatch()
    dispatch(logout(history))

    return (
        <h1>Logged out</h1>
    )

}


export default Logout