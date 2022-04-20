import React, { useEffect, useState } from "react";
import Registration from "./Pages/RegistrationPage/RegistrationPage";
import Home from "./Pages/HomePage/HomePage"
import Axios from "axios";
import Product from "./Pages/ProductPage/ProductPage"
import Login from "./Pages/SignInPage/SignInPage"
import Cart from "./Pages/ShoppingPage/ShoppingPage"
import Account from "./Pages/AccountPage/AccountPage"
import Admin from "./Pages/AdminPortal/adminPortal"
import OrderHistory from "./Pages/OrderHistory/OrderHistory.js"
import DiscountCode from "./Pages/DiscountCodePage/DiscountCodePage"
import AddProduct from "./Pages/AddProductPage/AddProductPage";
import UpdateProduct from "./Pages/UpdateProductPage/UpdateProductPage";
import "./GeneralStyles.css";
import "./App.css"
import home from "../src/images/homebutton.png"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ShoppingPage from "./Pages/ShoppingPage/ShoppingPage";
function App() {
  const [loginState, setLoginState] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userInfo, setUserInfo] = useState();
  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get("/api/signin").then((response) => {
      if (response.data.user) {
        localStorage.setItem('login', JSON.stringify("true"));

        setUserInfo(response.data.user);
        if (response.data.user.username == "admin") {
          setIsAdmin(true);
        }
      }
      else {
        localStorage.setItem('login', JSON.stringify("false"));
      }
    }).catch((err) => {
      console.log(err);
      localStorage.setItem('login', JSON.stringify("false"));
    })

  }, [])

  return (
    <div className="App">
      <Router>
        <div className="navbar">
          <div className="links">
            <Link to="/">
              <img src={home} alt=""
                width="50"
                height="50" />
            </Link>
            <Link to="/product">Product</Link>
            <Link to="/cart">Shopping Page</Link>
            <Link to="/order-history">Order History</Link>
            {JSON.parse(localStorage.getItem('login')) === "false" && (
              <>
                <Link to="/registration">Register</Link>
                <Link to="/login">Sign In</Link>
                <Link to="/account">Account</Link>
              </>
            )}
            {JSON.parse(localStorage.getItem('login')) === "true" && isAdmin && (
              <>
                <Link to="/admin">Admin Portal</Link>
              </>
            )}

          </div>
        </div>
        <Switch>
          <Route path="/order-history" component={() => <OrderHistory />} />
          <Route path="/cart" exact component={Cart} />
          <Route path="/registration" exact component={Registration} />
          <Route path="/product" exact component={Product} />
          <Route path="/login" exact component={Login} />
          <Route path="/account" exact component={Account} />
          <Route path="/admin" exact component={Admin} />
          <Route path="/discountcode" exact component={DiscountCode} />
          <Route path="/addproduct" exact component={AddProduct} />
          <Route path="/updateproduct" exact component={UpdateProduct} />
          <Route path="/"
            render={(props) => <Home {...props} />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
