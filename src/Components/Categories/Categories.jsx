import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ReactLoading from 'react-loading';
import { useNavigate } from 'react-router-dom';
import '../Home/Home.css'


export default function Categories() {
    let navigate = useNavigate()
    let [Api, setApi] = useState([])
    let [Loading, setLoading] = useState(false)




    async function getData() {
        setLoading(true)
        let api = await axios.get('https://route-ecommerce.onrender.com/api/v1/categories')
        setApi(api.data.data)
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
                :

                <div className="container mt-5">
                    <h1>All Categories</h1>
                    <div className="row">
                        {Api.map((prod) => {
                            return <div className=" col-xs-6 col-sm-5 col-md-4 col-lg-3 mb-5 productItem" key={prod._id}>
                                <img onClick={() => { localStorage.setItem('categoryId', prod._id);localStorage.setItem('categoryName', prod.name); navigate('/categoriesdetails') }} src={prod.image} height={350} className='w-100 curserPointer' />
                                <h1 className='h6 mb-0'>{prod.name}</h1>


                            </div>



                        })}
                    </div>


                </div>




            }







        </>
    )
}
