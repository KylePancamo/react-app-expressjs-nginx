import React, { useEffect, useState } from "react";
import Registration from "./Pages/RegistrationPage/RegistrationPage";
import Home from "./Pages/HomePage/HomePage"
import Axios from "axios";
import Product from "./Pages/ProductPage/ProductPage"
import Login from "./Pages/SignInPage/SignInPage"
import ShoppingPage from "./Pages/ShoppingPage/ShoppingPage"
import Account from "./Pages/AccountPage/AccountPage"
import Admin from "./Pages/AdminPortal/adminPortal"
import OrderHistory from "./Pages/OrderHistory/OrderHistory.js"
import DiscountCode from "./Pages/DiscountCodePage/DiscountCodePage"
import AddProduct from "./Pages/AddProductPage/AddProductPage";
import UpdateProduct from "./Pages/UpdateProductPage/UpdateProductPage";
import "./GeneralStyles.css";
import "./App.css"
import home from "../src/images/earth-icon.png"
import Cookies from 'universal-cookie';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";

import cookieParser from "cookie-parser";
function App() {
  const [loginState, setLoginState] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  Axios.defaults.withCredentials = true;

  const history = useHistory();

  useEffect(() => {
    Axios.get("/api/signin").then((response) => {
      if (response.data.user) {
        localStorage.setItem('login', JSON.stringify("true"));

        setUserInfo(response.data.user);
        if (response.data.user.username == "admin") {
          //setIsAdmin(true);
          localStorage.setItem('admin', JSON.stringify("true"));
        }
      }
      else {
        logout();
      }
    }).catch((err) => {
      console.log(err);
      logout();
    })
  }, [JSON.parse(localStorage.getItem('login'))])

  const logout = (e) => {
    const cookies = new Cookies();
    if (cookies.get('userId') || (JSON.parse(localStorage.getItem('login')) === "true")) {
      if (JSON.parse(localStorage.getItem('admin')) === "true") {
        localStorage.setItem('admin', JSON.stringify("false"))
      }
      cookies.remove('userId');
      localStorage.setItem('login', JSON.stringify("false"))
      window.location.reload(false);
      alert("You have been logged out.")
      history.push('/');
    }
  }

  console.log(isAdmin);
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
            {/* <Link to="/product-page">Product</Link> */}
            <Link to="/shopping-page">SHOP</Link>
            {/* <Link to="/order-history">Order History</Link> */}
            {(JSON.parse(localStorage.getItem('login')) === "false" || !JSON.parse(localStorage.getItem('login'))) && (
              <>
                <Link to="/registration">REGISTER</Link>
                <Link to="/login">SIGN IN</Link>
              </>
            )}
            {JSON.parse(localStorage.getItem('login')) === "true" && (
              <>

                <Link to="/account">PROFILE</Link>
              </>
            )}
            {JSON.parse(localStorage.getItem('admin')) === "true" &&
              <>
                <Link to="/admin">ADMIN TOOLS</Link>
              </>
            }

          </div>
          {JSON.parse(localStorage.getItem('login')) === "true" &&
            <div className="logout">
              <label>Howdy, {userInfo.last_name}</label>
              <button onClick={logout}>LOG OUT</button>
            </div>

          }

        </div>
        <Switch>
          <Route path="/order-history" component={() => <OrderHistory />} />
          <Route path="/shopping-page" exact component={ShoppingPage} />
          <Route path="/registration" exact component={Registration} />
          <Route path="/product-page" exact component={Product} />
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
