import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function ToPayment() {
    let [LoadBtn, setLoadBtn] = useState(false);
    let cartId = useSelector((state) => state.counterItems.cartOwner)

    


    let formik = useFormik({
        initialValues:
        {
            "details": "",
            "phone": "",
            "city": ""

        },
        onSubmit: () => {
            postAddress()
         },

    })

    async function toPayment(){

    }

    function postAddress(){
        setLoadBtn(true)
        let Data = {
            shippingAddress:formik.values
        }
        axios.post(`https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000` ,Data ,{ headers: { token: localStorage.getItem('token') } } ).then((res)=>{window.location.href=res.data.session.url}).catch((err)=>{})
        setLoadBtn(false)
    }

    


    return (
        <>

            <form onSubmit={formik.handleSubmit} className="container">
                <div className="row">
                    <h1>Checkout</h1>

                    <div className='col-12 mt-4'>
                        <label htmlFor="details">Address * </label>
                        <input onChange={formik.handleChange} className='form-control' type="text" name="details" id="details" />
                    </div>


                    <div className='col-12 mt-4'>
                        <label htmlFor="city">City * </label>
                        <input onChange={formik.handleChange} className='form-control' type="text" name="city" id="city" />
                    </div>

                    <div className='col-12 mt-4'>
                        <label htmlFor="country">Country  </label>
                        <input className='form-control' type="text" name="country" id="country" />
                    </div>

                    <div className='col-12 mt-4'>
                        <label htmlFor="phone">Phone * </label>
                        <input onChange={formik.handleChange} className='form-control' type="text" name="phone" id="phone" />
                    </div>
                    <div className='col-12 mt-4'>
                    <button disabled={LoadBtn} type='submit' className='btn btn-success mt-3 w-100'>{LoadBtn ? <div><i className=' fa-solid fa-spinner fa-spin'></i></div> : 'Pay'}</button>

                    </div>

                    

                </div>


            </form>

        </>
    )
}
