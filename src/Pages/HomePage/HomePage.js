import "./HomePage.css"
import Deals from "./DealsOfTheDay"
import React from "react";

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
        <div className="head">
          <b>WorldWide Frames</b> - <i>See A Better World</i>
        </div>
          <header></header>

        </div>
        <h2>Deals of the Day</h2>
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
