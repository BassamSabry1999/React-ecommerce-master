import React from 'react'

export default function Footer() {
  return (
    <div className="bg-body-tertiary mt-5 bottom-0 bg-opacity-50">
      <div className='container mt-3 pb-5'>
        <h5 className='pt-5'>Get the FreshCart app</h5>
        <p className=''>We will send you a link, open it on your phone to download the app.</p>
        <div className='d-flex justify-content-between h-25'>
          <input type="text" placeholder='Email...' className='form-control w-75' />
          <button className='btn btn-success' >Share App Link</button>
        </div>

        <div className='border-top border-bottom mt-5 d-flex justify-content-between '>

          <div className='d-flex mt-3 '>
            <h6>Payment Partners</h6>
            <i className="fa-brands fa-cc-amazon-pay my-auto ms-3 curserPointer"></i>
            <i className="fa-brands fa-cc-amex my-auto ms-3 curserPointer"></i>
            <i className="fa-brands fa-cc-mastercard my-auto ms-3 curserPointer"></i>
            <i className="fa-brands fa-cc-paypal my-auto ms-3 curserPointer"></i>
          </div>

          <div className='d-flex mt-3 '>
            <h6> Get deliveries with FreshCart</h6>
            <i className="fa-brands fa-app-store-ios  my-auto ms-3 curserPointer"></i>
            <i className="fa-brands fa-google-play  my-auto ms-3 curserPointer"></i>
          </div>


        </div>

      </div>

    </div>
  )
}
