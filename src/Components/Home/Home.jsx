import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import axios from 'axios';
import ReactLoading from 'react-loading';
import { Link, useNavigate } from 'react-router-dom';
import '../Home/Home.css'
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { fillCartOwner, fillCartProducts, fillNumOfCartItems, fillTotalCartPrice, increment } from '../Redux/CartSlice';




export default function Home() {
  let navigate = useNavigate()
  let cartDispatch = useDispatch()
  let [ApiCat, setApiCat] = useState([])
  let [ApiProd, setApiProd] = useState([])
  let [Loading, setLoading] = useState(false)
  let counterDispatch = useDispatch()
  const notify = () => toast.success('Product added successfully to your cart')
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };

  

  async function addToCart(productId){
    
     await axios.post('https://route-ecommerce.onrender.com/api/v1/cart',{'productId':productId},{headers : {token : localStorage.getItem('token')}})
    let api = await axios.get('https://route-ecommerce.onrender.com/api/v1/cart',{headers:{token:localStorage.getItem('token')}})
    cartDispatch(fillCartOwner(api.data.data._id))
    cartDispatch(fillCartProducts(api.data.data.products))
    cartDispatch(fillTotalCartPrice(api.data.data.totalCartPrice))
    cartDispatch(fillNumOfCartItems(api.data.numOfCartItems))
    notify()
    
  }



  async function getData() {
    setLoading(true)
    let api = await axios.get('https://route-ecommerce.onrender.com/api/v1/categories')
    setApiCat(api.data.data)
    api = await axios.get('https://route-ecommerce.onrender.com/api/v1/products')
    setApiProd(api.data.data)
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
        </div>
        : <>
          <div className="container mt-3 mb-5 border border-2 border-black">
            <h5>Shop Popular Categories</h5>
            <Slider {...settings} className='d-flex justify-content-center'>
              {ApiCat.map((e) => {
                return <div  key={e._id} className='curserPointer'>
                  <img src={e.image} height={200} width={200}  /> 
                  <h6>{e.name}</h6>
                </div>
              })}
            </Slider>
          </div>


          <div className="container mt-5">
            <h1>All Products</h1>
            <div className="row">
              {ApiProd.map((prod) => {
                return <div  className=" col-xs-6 col-sm-4 col-md-3 col-lg-2 mb-5 productItem" key={prod.id}>
                  <img onClick={()=>{localStorage.setItem('productId',prod.id); navigate('productdetails')}} src={prod.imageCover} className='w-100 curserPointer' />
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

        </>


      }






<Toaster/>
    </>
  )
}
