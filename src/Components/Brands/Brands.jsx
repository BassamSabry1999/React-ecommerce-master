import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import ReactLoading from "react-loading";
import { Outlet, useNavigate } from "react-router-dom";
import "../Brands/Brands.css";

export default function Brands() {
  let navigate = useNavigate();
  let [Api, setApi] = useState([]);
  let [Loading, setLoading] = useState(false);

  async function getData() {
    setLoading(true);
    let api = await axios.get(
      "https://route-ecommerce.onrender.com/api/v1/brands"
    );
    setApi(api.data.data);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {Loading ? (
        <div className="loadingMarginY mx-auto w-25 text-center d-flex justify-content-center ">
          {
            <ReactLoading
              type={"spin"}
              color={"green"}
              height="10%"
              width="15%"
            />
          }
        </div>
      ) : (
        <div className="container mt-5">
          <h1>All Brands</h1>

          <div className="row">
            {Api.map((prod) => {
              return (
                <div
                  className=" col-xs-6 col-sm-4 col-md-3 col-lg-2 mb-5 productItem"
                  key={prod._id}
                >
                  <img
                    onClick={() => {
                      localStorage.setItem("brandId", prod._id);
                      localStorage.setItem("brandName", prod.name);
                      navigate("/brandsdetails");
                    }}
                    src={prod.image}
                    className="w-100 curserPointer"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
