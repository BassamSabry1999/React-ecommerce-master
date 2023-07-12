import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import ReactLoading from 'react-loading';
import { Outlet } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { fillCartOwner, fillCartProducts, fillNumOfCartItems, fillTotalCartPrice, increment } from '../Redux/CartSlice';

export default function ProductDetails() {
  let [Loading, setLoading] = useState(false)
  let [Api, setApi] = useState('')
  let arrPhoto = []
  const notify = () => toast.success('Product added successfully to your cart')
  let counterDispatch = useDispatch()

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  function fillArr() {
    arrPhoto.push(Api.imageCover)
    Api.images.forEach((photo) => { arrPhoto.push(photo) })
  }

  async function getData() {
    let api = await axios.get('https://route-ecommerce.onrender.com/api/v1/products/' + localStorage.getItem('productId'))

    setApi(api.data.data)

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

    // return ()=> localStorage.removeItem('productId')

  }, [])



  return (
    <>
    
      {Api != '' ? fillArr() : null}



      <div className="container">

        <div className="row">

          {arrPhoto.length ? <>

            <Slider {...settings} className="col-xs-12 col-md-4 " >
              {arrPhoto.map((photo, index) => {
                return <img src={photo} className='w-100 curserPointer' key={photo} />
              })}
            </Slider>

            <div className="col-xs-12 col-md-8 ">
              <h1 className='h4 mt-3 pt-3'>{Api.title}</h1>
              <p className='text-muted py-2'>{Api.description}</p>
              <h5>{Api.category.name}</h5>
              <div className='d-flex justify-content-between'>
                <h5 className=''>{Api.price} EGP</h5>
                <div className=''><i className="fa-solid fa-star ratingColor"></i>{Api.ratingsAverage}</div>
              </div>
              <button onClick={()=>addToCart(Api.id)}  className='btn btn-success w-100'>+ add to cart</button>
            </div>

          </>

            : <div className='loadingMarginY mx-auto w-25 text-center d-flex justify-content-center '>
              {<ReactLoading type={'spin'} color={'green'} height='10%' width='15%' />}
            </div>
            
          }




        </div>



      </div>





<Toaster/>

    </>


  )
}
