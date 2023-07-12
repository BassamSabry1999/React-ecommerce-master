import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../Login/Login.css'

export default function Login() {
  let [AccExist, setAccExist] = useState('');
  let [LoadBtn, setLoadBtn] = useState(false);
  let navigate = useNavigate()

 


  let formik = useFormik({
    initialValues: {
      "email": "",
      "password": ""
    },


    onSubmit: async () => {
      setAccExist('')
      setLoadBtn(true)

      let api = await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signin', formik.values).catch((err) => {
        setAccExist(err.response.data.message)
      })

      setLoadBtn(false)

      if (api != undefined) {
        localStorage.setItem('token', api.data.token)
        navigate('/')
      }

    }

  
  })


   return (
    <>
      <div className="container mt-3 largeMarginBottom">
        <h3>Login Now : </h3>
        {AccExist == '' ? null : <div className="alert alert-danger ">{AccExist}</div>}

        <form onSubmit={formik.handleSubmit}>



          <label htmlFor="email">email :</label>
          <input onChange={formik.handleChange} type="text" className='form-control' id='email' name='email' />

          <label htmlFor="password">password :</label>
          <input onChange={formik.handleChange} type="password" className='form-control' id='password' name='password' />


          <button disabled={LoadBtn} type='submit' className='btn btn-success mt-3'>{LoadBtn ? <div><i className=' fa-solid fa-spinner fa-spin'></i></div> : 'Login'}</button>
          <Link className='btn btn-info ms-3 mt-3' to='/resetcode'>Forgot Password ?</Link>
          



        </form>



      </div>






    </>
  )



}
