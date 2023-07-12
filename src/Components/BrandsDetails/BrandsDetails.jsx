import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ReactLoading from 'react-loading';
import { useNavigate } from 'react-router-dom';
import  { toast,Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { fillCartOwner, fillCartProducts, fillNumOfCartItems, fillTotalCartPrice, increment } from '../Redux/CartSlice';


export default function BrandsDetails() {
  let navigate = useNavigate()
  let [Api, setApi] = useState([])
  let [Loading, setLoading] = useState(false)
  const notify = () => toast.success('Product added successfully to your cart')
  let counterDispatch = useDispatch()




  async function getData() {
    setLoading(true)
    let api = await axios.get('https://route-ecommerce.onrender.com/api/v1/products?brand='+localStorage.getItem('brandId'))
    setApi(api.data.data)
    setLoading(false)

  }

  async function addToCart(productId){
    await axios.post('https://route-ecommerce.onrender.com/api/v1/cart',{'productId':productId},{headers : {token : localStorage.getItem('token')}})
    let api = await axios.get('https://route-ecommerce.onrender.com/api/v1/cart',{headers:{token:localStorage.getItem('token')}})
    counterDispatch(fillCartOwner(api.data.data._id))
    counterDispatch(fillCartProducts(api.data.data.products))
    counterDispatch(fillTotalCartPrice(api.data.data.totalCartPrice))
    counterDispatch(fillNumOfCartItems(api.data.numOfCartItems))
    notify()
    
 }


  useEffect(() => {

    getData()

    

  }, [])




  return (
    <>

      {Loading ?
        <div className='loadingMarginY mx-auto w-25 text-center d-flex justify-content-center '>
          {<ReactLoading type={'spin'} color={'green'} height='10%' width='15%' />}
        </div>
        : 
          


          <div className="container mt-5">
            <h1 className='mb-5'>{localStorage.getItem('brandName')}</h1>
            <div className="row">
              {Api.map((prod) => {
                return <div  className=" col-xs-6 col-sm-4 col-md-3 col-lg-2 mb-5 productItem" key={prod.id}>
                  <img onClick={()=>{localStorage.setItem('productId',prod.id); navigate('/productdetails')}} src={prod.imageCover} className='w-100 curserPointer' />
                  <h1 className='h6 mainColor mb-0'>{prod.category.name}</h1>
                  <h2 className='h6'>{(prod.title).split(' ').slice(0, 2).join(' ')}</h2>
                  <div className='d-flex justify-content-between'>
                    <h6 className='priceFont'>{prod.price} EGP</h6>
                    <div className=''><i className="fa-solid fa-star ratingColor"></i>{prod.ratingsAverage}</div>
                  </div>
                  <button onClick={()=>addToCart(prod.id)} className='btn btn-success w-100'>+ Add</button>

                </div>



              })}
            </div>


          </div>

        


      }






<Toaster/>
    </>
  )
}
