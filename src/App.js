import React from "react";
import Registration from "./Pages/RegistrationPage/RegistrationPage";
import Home from "./Pages/HomePage/HomePage"
import Product from "./Pages/ProductPage/ProductPage"
import SignIn from "./Pages/SignInPage/SignInPage"
import "./GeneralStyles.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  const basename = process.env.REACT_APP_BASENAME || null;
  return ( 
    <Router basename={basename}>
      <div>
        <nav>
          <Link to="/">Home</Link>
          &nbsp;
          <Link to="/registration">Register</Link>
          &nbsp;
          <Link to="/product">Product</Link>
          &nbsp;
          <Link to="/signin">Sign In</Link>
        </nav>

        <Switch>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/registration">
            <Registration />
          </Route>
          <Route path="/product">
            <Product />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;