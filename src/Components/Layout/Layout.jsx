import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import back from '../../Assets/Images/light-patten.svg'
import '../Layout/Layout.css'

export default function Layout() {
  return (
    <div className='layout'>

      <Navbar />
      <Outlet></Outlet>
      <Footer />

    </div>
  )
}
