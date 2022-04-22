import "./HomePage.css"
import React from "react";


import 'font-awesome/css/font-awesome.min.css';

function Home(props) {

  if (props.location.alert) {
    alert(props.location.alert)
    props.location.alert="";
  }

  return (
    <div>
      <div className="Middleright">
        <div className="searchbar">
          <div className="fa fa-search"></div>
          <input type="text" placeholder="Search..."></input>
          <div className="fa fa-times"></div>
        </div>
      </div>

      <div className="HomePage">
        <div className="HomeHeader">
          <header><b>WorldWide Frames</b> - <i>See A Better World</i></header>
        </div>
        <h2><i>Items on Sale</i></h2>
        <div className="Frames">
          <div className="DoD">
            <h3>Deals of the Day</h3>
            <button>frame set 1</button>
            <button>frame set 2</button>
            <button>frame set 3</button>
          </div>
          <div className="Sunglasses">
            <h3>Sunglasses</h3>
            <button>frame set 4</button>
            <button>frame set 5</button>
            <button>frame set 6</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
