import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ReactLoading from 'react-loading';
import { Link, useNavigate } from 'react-router-dom';
import '../Home/Home.css'
import  { toast,Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { fillCartOwner, fillCartProducts, fillNumOfCartItems, fillTotalCartPrice, increment } from '../Redux/CartSlice';


export default function Home() {
  let navigate = useNavigate()
  let [urlApi, seturlApi] = useState('https://route-ecommerce.onrender.com/api/v1/products?&category[in][]=6439d5b90049ad0b52b90048&sort=price&price[gte]=0&price[lte]=999999999')
  let [Api, setApi] = useState([])
  let [Loading, setLoading] = useState(false)

  const notify = () => toast.success('Product added successfully to your cart')
  let counterDispatch = useDispatch()

  let [Asc, setAsc] = useState(true)
  let [Des, setDes] = useState(false)

  let [Music, setMusic] = useState(false)
  let [Men, setMen] = useState(true)
  let [Women, setWomen] = useState(false)
  let [SuperMarket, setSuperMarket] = useState(false)
  let [Baby, setBaby] = useState(false)
  let [Home, setHome] = useState(false)
  let [Books, setBooks] = useState(false)
  let [Beauty, setBeauty] = useState(false)
  let [Mobiles, setMobiles] = useState(false)
  let [Electronics, setElectronics] = useState(false)

  let [Min,setMin] = useState('0')
  let [Max,setMax] = useState('99999')



  function checkSort(id) {
    if (id == 'Asc') {
      seturlApi(urlApi.replace('sort=-price', "sort=price"))
      setAsc(true)
      setDes(false)
      getData(urlApi.replace('sort=-price', "sort=price"))
    }

    else if (id == 'Des') {
      seturlApi(urlApi.replace('sort=price', "sort=-price"))
      setDes(true)
      setAsc(false)
      getData(urlApi.replace('sort=price', "sort=-price"))
    }

  }


  function checkCategory(id, catId) {

    setMusic(false)
    setMen(false)
    setWomen(false)
    setSuperMarket(false)
    setBaby(false)
    setHome(false)
    setBooks(false)
    setBeauty(false)
    setMobiles(false)
    setElectronics(false)

    if (id == 'Music')
      setMusic(true)

    if (id == 'Men')
      setMen(true)

    if (id == 'Women')
      setWomen(true)

    if (id == 'SuperMarket')
      setSuperMarket(true)

    if (id == 'Baby')
      setBaby(true)

    if (id == 'Home')
      setHome(true)

    if (id == 'Books')
      setBooks(true)

    if (id == 'Beauty')
      setBeauty(true)

    if (id == 'Mobiles')
      setMobiles(true)

    if (id == 'Electronics')
      setElectronics(true)




    seturlApi(urlApi.replace(urlApi.substring(53, 93), '&category[in][]=' + catId))
    getData(urlApi.replace(urlApi.substring(53, 93), '&category[in][]=' + catId))





  }


  let checkMin = (event) => {
    setMin(event.target.value)
  }


  let checkMax = (event) => {
    setMax(event.target.value)
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

  function priceSave(){


    getData(urlApi.replace(urlApi.substring(urlApi.indexOf('&price[gte]')), '&price[gte]=' + Min +'&price[lte]='+Max))
    seturlApi(urlApi.replace(urlApi.substring(urlApi.indexOf('&price[gte]')), '&price[gte]=' + Min +'&price[lte]='+Max))


  }




  async function getData(x) {

    setLoading(true)
    let api = await axios.get(x)
    setApi(api.data.data)
    setLoading(false)

  }

  useEffect(() => {
    getData('https://route-ecommerce.onrender.com/api/v1/products?&category[in][]=6439d5b90049ad0b52b90048&sort=price&price[gte]=0&price[lte]=999999999')

  }, [])




  return (
    <>

      {Loading ?
        <div className='loadingMarginY mx-auto w-25 text-center d-flex justify-content-center '>
          {<ReactLoading type={'spin'} color={'green'} height='10%' width='15%' />}
        </div>
        : <>



          <div className="container mt-5">
            <div className="row">
              <div className="col-md-3 col-lg-2 mb-4 bg-gradient border border-1 border-black">

                <h6 className=' fw-bold text-center'>Sort by price</h6>



                <div className="form-check">
                  <input onClick={() => checkSort('Asc')} className="form-check-input" type="radio" defaultChecked={Asc} name="sort" id='Asc' />
                  <label className="form-check-label" htmlFor="Asc">Ascending</label>
                </div>

                <div className="form-check">
                  <input onClick={() => checkSort('Des')} className="form-check-input" defaultChecked={Des} type="radio" name="sort" id='Des' />
                  <label className="form-check-label" htmlFor="Des">Descending</label>
                </div>



                <h6 className=' fw-bold mt-4 text-center'>Categories</h6>


                <div className="form-check">
                  <input className="form-check-input" onClick={() => checkCategory('Music', '6439d61c0049ad0b52b90051')} type="radio" id="Music" defaultChecked={Music} />
                  <label className="form-check-label" htmlFor="Music">Music</label>
                </div>

                <div className="form-check">
                  <input className="form-check-input" onClick={() => checkCategory('Men', '6439d5b90049ad0b52b90048')} type="radio" id="Men" defaultChecked={Men} />
                  <label className="form-check-label" htmlFor="Men">Men's Fashion</label>
                </div>

                <div className="form-check">
                  <input className="form-check-input" onClick={() => checkCategory('Women', '6439d58a0049ad0b52b9003f')} type="radio" id="Women" defaultChecked={Women} />
                  <label className="form-check-label" htmlFor="Women">Women's Fashion</label>
                </div>

                <div className="form-check">
                  <input className="form-check-input" onClick={() => checkCategory('SuperMarket', '6439d41c67d9aa4ca97064d5')} type="radio" id="SuperMarket" defaultChecked={SuperMarket} />
                  <label className="form-check-label" htmlFor="SuperMarket">SuperMarket</label>
                </div>

                <div className="form-check">
                  <input className="form-check-input" onClick={() => checkCategory('Baby', '6439d40367d9aa4ca97064cc')} type="radio" id="Baby" defaultChecked={Baby} />
                  <label className="form-check-label" htmlFor="Baby">Baby & Toys</label>
                </div>

                <div className="form-check">
                  <input className="form-check-input" onClick={() => checkCategory('Home', '6439d3e067d9aa4ca97064c3')} type="radio" id="Home" defaultChecked={Home} />
                  <label className="form-check-label" htmlFor="Home">Home</label>
                </div>

                <div className="form-check">
                  <input className="form-check-input" onClick={() => checkCategory('Books', '6439d3c867d9aa4ca97064ba')} type="radio" id="Books" defaultChecked={Books} />
                  <label className="form-check-label" htmlFor="Books">Books</label>
                </div>

                <div className="form-check">
                  <input className="form-check-input" onClick={() => checkCategory('Beauty', '6439d30b67d9aa4ca97064b1')} type="radio" id="Beauty" defaultChecked={Beauty} />
                  <label className="form-check-label" htmlFor="Beauty">Beauty & Health</label>
                </div>

                <div className="form-check">
                  <input className="form-check-input" onClick={() => checkCategory('Mobiles', '6439d2f467d9aa4ca97064a8')} type="radio" id="Mobiles" defaultChecked={Mobiles} />
                  <label className="form-check-label" htmlFor="Mobiles">Mobiles</label>
                </div>

                <div className="form-check">
                  <input className="form-check-input" onClick={() => checkCategory('Electronics', '6439d2d167d9aa4ca970649f')} type="radio" id="Electronics" defaultChecked={Electronics} />
                  <label className="form-check-label" htmlFor="Electronics">Electronics</label>
                </div>

                <div className='d-flex align-items-center justify-content-between mt-4 '>
                  <label htmlFor="min">Min </label>
                  <input id='min' value={Min} onChange={checkMin} type="number" className='form-control w-75 p-0' />
                </div>

                <div className='d-flex align-items-center justify-content-between mt-4  '>
                  <label htmlFor="max">Max </label>
                  <input id='max' value={Max} onChange={checkMax} type="number" className='form-control w-75 p-0' />
                </div>

                <div className='w-100 d-flex justify-content-center mt-3'>
                <button onClick={priceSave} className='btn btn-success mb-3'>Save</button>

                </div>






              </div>

              <div className="col-md-9 col-lg-10">
                <div className="row">
                  {Api.map((prod) => {
                    return <div className=" col-xs-6 col-sm-4 col-md-3 col-lg-2 mb-5 productItem" key={prod.id}>
                      <img onClick={() => { localStorage.setItem('productId', prod.id); navigate('/productdetails') }} src={prod.imageCover} className='w-100 curserPointer' />
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

            </div>


          </div>
        </>


      }






<Toaster/>
    </>
  )
}
