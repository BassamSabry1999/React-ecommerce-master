import { React, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { dec, inc, incAmm } from '../Redux/CartSlice'
import { fillCartOwner, fillCartProducts, fillNumOfCartItems, fillTotalCartPrice, increment } from '../Redux/CartSlice';
import ReactLoading from 'react-loading';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function Cart() {

  let counterDispatch = useDispatch()
  let [Api, setApi] = useState([])
  let [Loading, setLoading] = useState(false)
  let navigate = useNavigate()

  async function incrementItem(productId) {
    await axios.post('https://route-ecommerce.onrender.com/api/v1/cart', { 'productId': productId }, { headers: { token: localStorage.getItem('token') } })
    let api = await axios.get('https://route-ecommerce.onrender.com/api/v1/cart', { headers: { token: localStorage.getItem('token') } })
    counterDispatch(fillCartOwner(api.data.data.cartOwner))
    counterDispatch(fillCartProducts(api.data.data.products))
    counterDispatch(fillTotalCartPrice(api.data.data.totalCartPrice))
    counterDispatch(fillNumOfCartItems(api.data.numOfCartItems))
  }

  async function decrementItem(productId, count) {
    if (count == 0)
      removeSpecificItem(productId)
    else {
      await axios.put('https://route-ecommerce.onrender.com/api/v1/cart/' + productId, { 'count': count }, { headers: { token: localStorage.getItem('token') } })
      let api = await axios.get('https://route-ecommerce.onrender.com/api/v1/cart', { headers: { token: localStorage.getItem('token') } })
      counterDispatch(fillCartOwner(api.data.data.cartOwner))
      counterDispatch(fillCartProducts(api.data.data.products))
      counterDispatch(fillTotalCartPrice(api.data.data.totalCartPrice))
      counterDispatch(fillNumOfCartItems(api.data.numOfCartItems))
    }

  }

  async function removeSpecificItem(productId) {

    await axios.delete('https://route-ecommerce.onrender.com/api/v1/cart/' + productId, { headers: { token: localStorage.getItem('token') } })
    let api = await axios.get('https://route-ecommerce.onrender.com/api/v1/cart', { headers: { token: localStorage.getItem('token') } }).catch((err) => {
      // console.log(err.response.data.statusMsg);
    })

    if (api) {
      // console.log(api.data.data);
      counterDispatch(fillCartOwner(api.data.data.cartOwner))
      counterDispatch(fillCartProducts(api.data.data.products))
      counterDispatch(fillTotalCartPrice(api.data.data.totalCartPrice))
      counterDispatch(fillNumOfCartItems(api.data.numOfCartItems))
    }
  }

  async function removeAllItems() {
    counterDispatch(fillCartProducts([]))
    counterDispatch(fillTotalCartPrice(0))
    counterDispatch(fillNumOfCartItems(0))
    await axios.delete('https://route-ecommerce.onrender.com/api/v1/cart', { headers: { token: localStorage.getItem('token') } })

  }

  async function getData() {
    
    setLoading(true)
    let api = await axios.get('https://route-ecommerce.onrender.com/api/v1/cart', { headers: { token: localStorage.getItem('token') } }).catch((err) => {
      // console.log(err.response.data.statusMsg);
    })
    // console.log(api.data.data);
    if (api) {
      
      counterDispatch(fillCartOwner(api.data.data._id))
      counterDispatch(fillCartProducts(api.data.data.products))
      counterDispatch(fillTotalCartPrice(api.data.data.totalCartPrice))
      counterDispatch(fillNumOfCartItems(api.data.numOfCartItems))
    }
    setLoading(false)
  }

  useEffect(() => {
    getData()
   
  }, [])

  return (
    <>

      {Loading ?
        <div className='loadingMarginY mx-auto w-25 text-center d-flex justify-content-center '>
          {<ReactLoading type={'spin'} color={'green'} height='10%' width='15%' />}
        </div>:null}


      <div className="container bg-light">
        <h1 className='text-center mt-5 mb-5 fw-bolder'>Your Cart [ {useSelector((state) => state.counterItems.numOfCartItems)} ]</h1>

        <table className="table table-light">
          <thead>
            <tr>
              <th className='align-middle' scope="col">Item</th>
              <th className='align-middle' scope="col">Price</th>
              <th className='align-middle' scope="col">Quantity</th>
              <th className='align-middle' scope="col">Total</th>
            </tr>
          </thead>


          <tbody className=''>

            {useSelector((state) => state.counterItems.cartProducts)?.map((prod, index) => {
              return <tr className='' key={index}>
                <td className='align-middle'>
                  <img src={prod.product.imageCover} height={100} width={100} alt="" />
                  <h6>{prod.product.title.split(' ').slice(0, 2).join(' ')}</h6>
                </td>
                <td className='align-middle'>{prod.price}</td>
                <td className='align-middle'>
                  <div className='d-flex'>
                    <button onClick={() => { decrementItem(prod.product._id, prod.count - 1) }} className='rounded-start-4 border border-2 border-danger text-danger'><i className="fa-solid fa-minus"></i></button>
                    <div className=' d-flex justify-content-center align-items-center  border border-1 px-2'>{prod.count}</div>
                    <button onClick={() => { incrementItem(prod.product._id) }} className='rounded-end-4 border border-2 border-success text-success'><i className="fa-solid fa-plus"></i></button>
                  </div>
                </td>
                <td className='align-middle'>{prod.count * prod.price}</td>
                <td className='align-middle'><button onClick={() => { removeSpecificItem(prod.product._id) }} className='btn btn-outline-danger'>Remove <i className="fa-solid fa-trash-can"></i></button></td>
              </tr>
            })}




            <tr>
              <th colSpan={2} className='border-0'>  </th>
              <td className='fw-bolder align-middle'>Subtotal :</td>
              <td>{useSelector((state) => state.counterItems.totalCartPrice)} EGP</td>
            </tr>

            <tr>
              <th colSpan={2} className='border-0'>  </th>
              <td className='fw-bolder align-middle'>Sales Tax :</td>
              <td>0 EGP</td>
            </tr>

            <tr>
              <th colSpan={2} className='border-0'>  </th>
              <td className='fw-bolder align-middle'>Coupon :</td>
              <td><input type="text" className='form-control w-100 border-1 border-black' /></td>
            </tr>

            <tr >
              <th colSpan={2} className='border-0'>  </th>
              <td className='fw-bolder align-middle'>Grand Total :</td>
              <td className='fs-3 fw-bolder'>{useSelector((state) => state.counterItems.totalCartPrice)} EGP</td>
            </tr>

            <tr>
              <td colSpan={3} className='border-0'> </td>
              <td className='fw-bolder align-middle border-0'> <button onClick={()=>navigate('/topayment')} className='btn btn-dark w-100 mt-5'> Check out </button> <button onClick={removeAllItems} className='btn btn-danger mt-3'>Clear Cart</button> </td>

            </tr>




          </tbody>
        </table>
      </div>






    </>
  )
}
