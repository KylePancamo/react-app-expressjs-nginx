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
import Checkout from './Pages/ShoppingPage/components/Checkout.js';
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
  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get("http://3.93.4.5:5000/signin").then((response) => {
      if (response.data.user) {
        setLoginState(true);
        if(response.data.user.username == "admin")
        {
          setIsAdmin(true);
        }
      }
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
            {!loginState && (
              <>
                <Link to="/registration">Register</Link>
                <Link to="/login">Sign In</Link>
                <Link to="/account">Account</Link>
              </>
            )}
            {loginState && isAdmin &&(
              <>
                <Link to="/admin">Admin Portal</Link>
              </>
            )}
            
          </div>
        </div>
        <Switch>
          <Route path="/checkout" exact component={Checkout} />
          <Route path="/order-history" exact component={OrderHistory} />
          <Route path="/cart" exact component={Cart} />
          <Route path="/registration" exact component={Registration} />
          <Route path="/product" exact component={Product} />
          <Route path="/login" exact component={Login} />
          <Route path="/account" exact component={Account}/>
          <Route path="/admin" exact component={Admin}/>
          <Route path="/discountcode" exact component={DiscountCode}/>
          <Route path="/addproduct" exact component={AddProduct}/>
          <Route path="/updateproduct" exact component={UpdateProduct}/>
          <Route path="/" exact component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
