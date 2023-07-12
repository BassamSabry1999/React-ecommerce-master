import React, { useRef, useState } from 'react'
import passwordPhoto from '../../Assets/Images/resetPass.pnj.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useFormik } from 'formik';
export default function ResetCode() {

    let navigate = useNavigate();
    let [Err, setErr] = useState('');
    let [Success, setSuccess] = useState('');
    let [LoadBtn, setLoadBtn] = useState(false);
    let [LoadBtn2, setLoadBtn2] = useState(false);

    let formik = useFormik({
        initialValues: {
            "email": ""
        },
        onSubmit: async () => {

            setErr('')
            setSuccess('')
            setLoadBtn(true)
            let api = await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/forgotPasswords', formik.values).catch((err) => {
                setErr(err.response.data.message)
            })

            if (api) {
                localStorage.setItem('resetEmail', formik.values.email)
                setSuccess(api.data.message)
            }
            setLoadBtn(false)

        }
    })


    let formik2 = useFormik({
        initialValues: {
            "resetCode": ""
        },

        onSubmit: async () => {

            setErr('')
            setSuccess('')
            setLoadBtn2(true)
            let api = await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/verifyResetCode', formik2.values).catch((err) => {
                setErr(err.response.data.message)
            })

            setLoadBtn2(false)

            if (api) {

                navigate('/resetpasswordfromout')
            }

        }


    })







    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <img src={passwordPhoto} className='w-100' height={500} />
                    </div>
                    <div className="col-sm-12 col-md-6 mt-sm-3 mt-md-0 border-2 border border-info">


                        {Err ? <div className="alert alert-danger mb-1 text-center">{Err}</div> : null}
                        {Success ? <div className="alert alert-success mb-1 text-center">{Success}</div> : null}

                        <h4 className=' fw-bolder mt-3'>Reset Your Password</h4>
                        <p className='text-muted mb-0'>The verification email will be sent to the mailbox.</p>
                        <p className='text-muted mb-5'>Please check it.</p>
                        <label htmlFor="email" className='mb-2'>Email </label>

                        <input onChange={formik.handleChange} type="text" className='form-control mb-3 ' id='email' name='email' />

                        <label htmlFor="code" className='mb-2'>Verification code </label>
                        <input onChange={formik2.handleChange} type="text" className='form-control mb-3' id='resetCode' name='resetCode' />

                        <button disabled={LoadBtn} onClick={formik.handleSubmit} className='btn btn-success rounded-pill mb-3'>{LoadBtn ? <div><i className=' fa-solid fa-spinner fa-spin'></i></div> : 'Send Code'}</button>
                        <br />
                        <button disabled={LoadBtn2} onClick={formik2.handleSubmit} className='btn btn-info rounded-pill mb-4'>{LoadBtn2 ? <div><i className=' fa-solid fa-spinner fa-spin'></i></div> : 'Verify'}</button>

                        <br />
                        <Link className=' text-muted' to='/login'>back to login</Link>


                    </div>
                </div>
            </div>



        </>
    )
}


