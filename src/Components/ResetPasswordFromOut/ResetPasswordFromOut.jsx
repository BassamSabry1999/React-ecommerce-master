import React, { useRef, useState } from 'react'
import passwordPhoto from '../../Assets/Images/resetPass.pnj.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup'


export default function ResetPasswordFromOut() {

    let email = localStorage.getItem('resetEmail')
    let navigate = useNavigate();
    let [Err, setErr] = useState('');
    let [Success, setSuccess] = useState('');
    let [LoadBtn, setLoadBtn] = useState(false);


    let validation = yup.object({
        newPassword: yup.string().required('password is required').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, 'must contain capital letters and numbers'),
        rePassword: yup.string().required('rePassword is required').oneOf([yup.ref('newPassword')], 'password not matched'),
    })



    let formik = useFormik({
        initialValues: {
            "email": email,
            "newPassword": ""
        },

        validationSchema: validation,

        onSubmit: async () => {
            const { rePassword, ...updatedValues } = formik.values;
            formik.setValues(updatedValues);

            console.log(updatedValues);
            console.log(formik.values);
            setErr('')
            setLoadBtn(true)
            let api = await axios.put('https://route-ecommerce.onrender.com/api/v1/auth/resetPassword', updatedValues).catch((err) => {
                setErr(err.response.data.message)
            })

            if(api){
                console.log(api);
                localStorage.removeItem('resetEmail')
                localStorage.setItem('token', api.data.token)
                navigate('/')

            }
                
            setLoadBtn(false)
        }
    })

    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <img src={passwordPhoto} className='w-100' height={500}/>
                    </div>
                    <form onSubmit={formik.handleSubmit} className="col-sm-12 col-md-6 mt-sm-3 mt-md-0 border-2 border border-info">


                        <h4 className=' fw-bolder mt-3'>Reset Your Password</h4>

                        <label htmlFor="email" className='mb-2'>Enter Password </label>
                        <input onChange={formik.handleChange} type="password" className='form-control mb-3' id='newPassword' name='newPassword' />
                        {!formik.values.newPassword || !formik.errors.newPassword ? null : <div className="alert alert-danger ">{formik.errors.newPassword}</div>}

                        <label htmlFor="code" className='mb-2'>Re-enter Password</label>
                        <input onChange={formik.handleChange} type="password" className='form-control mb-3' id='rePassword' name='rePassword' />
                        {!formik.values.rePassword || !formik.errors.rePassword ? null : <div className="alert alert-danger ">{formik.errors.rePassword}</div>}

                        <button disabled={LoadBtn || JSON.stringify(formik.values) == `{"email":"${email}","newPassword":""}` || (JSON.stringify(formik.errors) != '{}')} className='btn btn-success rounded-pill mb-3'>{LoadBtn ? <div><i className=' fa-solid fa-spinner fa-spin'></i></div> : 'Reset'}</button>



                    </form>
                </div>
            </div>



        </>
    )
}
