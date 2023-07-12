import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup'



export default function Register() {

  let [AccExist, setAccExist] = useState('');
  let [LoadBtn, setLoadBtn] = useState(false);
  let navigate = useNavigate()

  let validation = yup.object({
    name: yup.string().required('name is required').min(3, 'must be min 3 characters').max(10, 'must be max 10 characters'),
    email: yup.string().required('email is required').email('invalid email'),
    password: yup.string().required('password is required').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, 'must contain capital letters and numbers'),
    rePassword: yup.string().required('rePassword is required').oneOf([yup.ref('password')], 'password not matched'),
    phone: yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/, 'invalid number')
  })


  let formik = useFormik({
    initialValues: {
      "name": "",
      "email": "",
      "password": "",
      "rePassword": "",
      "phone": ""
    },

    validationSchema: validation,

    onSubmit: async () => {
      setAccExist('')
      setLoadBtn(true)

      let api = await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signup', formik.values).catch((err) => {
        setAccExist(err.response.data.message)
      })

      setLoadBtn(false)

      if (api != undefined) {
        navigate('/login')
      }

    }

  
  })






  return (
    <>
      <div className="container mt-3 mb-5">
        <h3>Register Now : </h3>
        {AccExist == '' ? null : <div className="alert alert-danger ">{AccExist}</div>}

        <form onSubmit={formik.handleSubmit}>

          <label htmlFor="name">name :</label>
          <input onChange={formik.handleChange} type="text" className='form-control' id='name' name='name' />
          {!formik.values.name || !formik.errors.name ? null : <div className="alert alert-danger ">{formik.errors.name}</div>}


          <label htmlFor="email">email :</label>
          <input onChange={formik.handleChange} type="text" className='form-control' id='email' name='email' />
          {!formik.values.email || !formik.errors.email ? null : <div className="alert alert-danger ">{formik.errors.email}</div>}

          <label htmlFor="password">password :</label>
          <input onChange={formik.handleChange} type="password" className='form-control' id='password' name='password' />
          {!formik.values.password || !formik.errors.password ? null : <div className="alert alert-danger ">{formik.errors.password}</div>}

          <label htmlFor="rePassword">rePassword :</label>
          <input onChange={formik.handleChange} type="password" className='form-control' id='rePassword' name='rePassword' />
          {!formik.values.rePassword || !formik.errors.rePassword ? null : <div className="alert alert-danger ">{formik.errors.rePassword}</div>}

          <label htmlFor="phone">phone</label>
          <input onChange={formik.handleChange} type="text" className='form-control' id='phone' name='phone' />
          {!formik.values.phone || !formik.errors.phone ? null : <div className="alert alert-danger ">{formik.errors.phone}</div>}

          <button disabled={LoadBtn || JSON.stringify(formik.values) == '{"name":"","email":"","password":"","rePassword":"","phone":""}' || (JSON.stringify(formik.errors) != '{}')} type='submit' className='btn btn-success mt-3'>{LoadBtn ? <div><i className=' fa-solid fa-spinner fa-spin'></i></div> : 'Register'}</button>




        </form>



      </div>






    </>
  )
}
