import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedResetCode(props) {
    if (localStorage.getItem('resetEmail') === null)
    return <Navigate to={'/resetcode'} />
    else
    return props.children
}
