import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

export default function AllOrders() {
    let navigate = useNavigate()
    console.log('hfghgf');
    return <Navigate to={'/'}></Navigate>
}
