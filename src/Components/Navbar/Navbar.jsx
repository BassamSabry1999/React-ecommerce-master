import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoNav from "../../Assets/Images/freshcart-logo.svg";
import "../Navbar/Navbar.css";
import {
  fillCartOwner,
  fillCartProducts,
  fillNumOfCartItems,
  fillTotalCartPrice,
} from "../Redux/CartSlice";
export default function Navbar() {
  let navigate = useNavigate();
  let location = useLocation();
  let counter = useSelector((state) => state.counterItems.numOfCartItems);
  let cartDispatch = useDispatch();
  function signOut() {
    localStorage.clear();
    navigate("/login");
  }

  async function getOrderCart() {
    let api = await axios
      .get("https://route-ecommerce.onrender.com/api/v1/cart", {
        headers: { token: localStorage.getItem("token") },
      })
      .catch((err) => {
        // console.log(err.response.data.statusMsg);
      });

    if (api) {
      // console.log(api.data.data);
      cartDispatch(fillCartOwner(api.data.data._id));
      cartDispatch(fillCartProducts(api.data.data.products));
      cartDispatch(fillTotalCartPrice(api.data.data.totalCartPrice));
      cartDispatch(fillNumOfCartItems(api.data.numOfCartItems));
    }
  }
  // console.log(useSelector((state) => state.counterItems.cartOwner));

  useEffect(() => {
    if (localStorage.getItem("token")) getOrderCart();
  });

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary bg-opacity-50">
      <div className="container ">
        <Link className="navbar-brand" to="/">
          <img src={logoNav}></img>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {location.pathname != "/login" &&
          location.pathname != "/register" &&
          location.pathname != "/resetcode" &&
          location.pathname != "/resetpasswordfromout" ? (
            <>
              <ul className="navbar-nav  me-auto ">
                <li className="nav-item active fitWidth">
                  <Link id="home" className="nav-link" to="/">
                    Home
                  </Link>
                  <div id="line" className="line rounded-pill"></div>
                </li>

                <li className="nav-item active fitWidth">
                  <Link id="products" className="nav-link" to="/products">
                    Products
                  </Link>
                  <div id="line" className="line rounded-pill"></div>
                </li>

                <li className="nav-item active fitWidth">
                  <Link id="categories" className="nav-link" to="/categories">
                    Categories
                  </Link>
                  <div id="line" className="line rounded-pill"></div>
                </li>

                <li className="nav-item active fitWidth">
                  <Link id="brands" className="nav-link" to="/brands">
                    Brands
                  </Link>
                  <div id="line" className="line rounded-pill"></div>
                </li>
              </ul>
            </>
          ) : null}

          <ul className="navbar-nav  ms-md-auto mb-2 ">
            <li className="nav-item mt-sm-2 mt-lg-4 me-2 d-flex">
              <i className="fa-brands fa-instagram me-2 curserPointer"></i>
              <i className="fa-brands fa-facebook mx-2 curserPointer"></i>
              <i className="fa-brands fa-tiktok mx-2 curserPointer"></i>
              <i className="fa-brands fa-twitter mx-2 curserPointer"></i>
              <i className="fa-brands fa-linkedin mx-2 curserPointer"></i>
              <i className="fa-brands fa-youtube mx-2  curserPointer"></i>

              {location.pathname != "/login" &&
              location.pathname != "/register" &&
              location.pathname != "/resetcode" &&
              location.pathname != "/resetpasswordfromout" ? (
                <Link
                  id="cart"
                  className="nav-link position-relative mx-2 p-0"
                  to="/cart"
                >
                  <div className="fa-solid fa-cart-shopping fs-3 text-primary  position-relative  curserPointer "></div>
                  <div className=" fitWidth position-absolute iconCounter rounded-circle d-flex justify-content-center align-items-center bgmainColor fw-bolder">
                    {counter}
                  </div>
                </Link>
              ) : null}
            </li>

            {location.pathname == "/login" ||
            location.pathname == "/register" ||
            location.pathname == "/resetcode" ||
            location.pathname == "/resetpasswordfromout" ? (
              <>
                <li className="me-2 mt-3">
                  <Link
                    className="btn btn-success"
                    aria-current="page"
                    to="/login"
                  >
                    Sign in
                  </Link>
                </li>

                <li className="mt-3">
                  <Link className="btn btn-outline-secondary " to="/register">
                    Create Account
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="mt-3">
                  <button onClick={signOut} className="btn btn-danger">
                    Log Out
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
