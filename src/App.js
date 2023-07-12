import React from "react";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AllOrders from "./Components/AllOrders/AllOrders";
import Brands from "./Components/Brands/Brands";
import BrandsDetails from "./Components/BrandsDetails/BrandsDetails";
import Cart from "./Components/Cart/Cart";
import Categories from "./Components/Categories/Categories";
import CategoriesDetails from "./Components/CategoriesDetails/CategoriesDetails";
import Home from "./Components/Home/Home";
import Layout from "./Components/Layout/Layout";
import Login from "./Components/Login/Login";
import Pagenotfound from "./Components/Pagenotfound/Pagenotfound";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import Products from "./Components/Products/Products";
import Protected from "./Components/Protected/Protected";
import ProtectedResetCode from "./Components/ProtectedResetCode/ProtectedResetCode";
import { store } from "./Components/Redux/Store";
import Register from "./Components/Register/Register";
import ResetCode from "./Components/ResetCode/ResetCode";
import ResetPasswordFromOut from "./Components/ResetPasswordFromOut/ResetPasswordFromOut";
import ToPayment from "./Components/ToPayment/ToPayment";

let routes = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Protected>
            <Home />
          </Protected>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "resetcode", element: <ResetCode /> },
      {
        path: "resetpasswordfromout",
        element: (
          <ProtectedResetCode>
            <ResetPasswordFromOut />
          </ProtectedResetCode>
        ),
      },
      {
        path: "productdetails",
        element: (
          <Protected>
            <ProductDetails />
          </Protected>
        ),
      },
      {
        path: "brands",
        element: (
          <Protected>
            <Brands />
          </Protected>
        ),
      },
      {
        path: "brandsdetails",
        element: (
          <Protected>
            <BrandsDetails />
          </Protected>
        ),
      },
      {
        path: "categories",
        element: (
          <Protected>
            <Categories />
          </Protected>
        ),
      },
      {
        path: "categoriesdetails",
        element: (
          <Protected>
            <CategoriesDetails />
          </Protected>
        ),
      },
      {
        path: "products",
        element: (
          <Protected>
            <Products />
          </Protected>
        ),
      },
      {
        path: "cart",
        element: (
          <Protected>
            <Cart />
          </Protected>
        ),
      },
      {
        path: "topayment",
        element: (
          <Protected>
            <ToPayment />
          </Protected>
        ),
      },
      {
        path: "allorders",
        element: (
          <Protected>
            <AllOrders />
          </Protected>
        ),
      },
      { path: "*", element: <Pagenotfound /> },
    ],
  },
]);

export default function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={routes}></RouterProvider>
    </Provider>
  );
}
