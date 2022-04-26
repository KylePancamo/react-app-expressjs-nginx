import "./HomePage.css"
import Deals from "./DealsOfTheDay"
import React from "react";
import header from "../../../src/images/oceanimagedesktopnew.jpg";

import 'font-awesome/css/font-awesome.min.css';

function Home(props) {

  if (props.location.alert) {
    alert(props.location.alert)
    props.location.alert = "";
  }

  return (
    <div>
      <div className="HomePage">
        
        <div className="HomeHeader">
        </div>
        <div className="DealsBanner">
          <h2>DEALS OF THE DAY</h2>
        </div>
        <div className="Frames">
          <div className="DoD">
            <Deals />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
