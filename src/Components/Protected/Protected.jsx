import React from 'react'
import { Navigate } from 'react-router-dom'
import Home from '../Home/Home';
import Login from '../Login/Login';

export default function Protected(props) {

    if (localStorage.getItem('token') === null)
        return <Navigate to={'/login'} />
    else
        return props.children

}
