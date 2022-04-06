import React, { useEffect, useState } from "react";
import Registration from "./Pages/RegistrationPage/RegistrationPage";
import Home from "./Pages/HomePage/HomePage"
import Axios from "axios";
import Product from "./Pages/ProductPage/ProductPage"
import Login from "./Pages/SignInPage/SignInPage"
import Cart from "./Pages/ShoppingPage/ShoppingPage"
import Account from "./Pages/AccountPage/AccountPage"

import "./GeneralStyles.css";
import "./App.css"
import home from "../src/images/homebutton.png"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function App() {
  const [loginState, setLoginState] = useState(false);
  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get("http://localhost:5000/signin").then((response) => {
      if (response.data.user) {
        setLoginState(true);
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
            {!loginState && (
              <>
                <Link to="/registration">Register</Link>
                <Link to="/login">Sign In</Link>
                <Link to="/account">Account</Link>
              </>
            )}
            <div className="Middleright">
              <div className="searchbar">
                <div className="fa fa-search"></div>
                <input type="text" placeholder="Search..."></input>
                <div className="fa fa-times"></div>
              </div>
            </div>
          </div>
        </div>
        <Switch>
          <Route path="/cart" exact component={Cart} />
          <Route path="/registration" exact component={Registration} />
          <Route path="/product" exact component={Product} />
          <Route path="/login" exact component={Login} />
          <Route path="/account" exact component={Account}/>
          <Route path="/" exact component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
