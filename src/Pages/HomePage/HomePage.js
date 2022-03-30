import "./HomePage.css"
import React from "react";

import cartImage from "../../images/cartimage.png"
import 'font-awesome/css/font-awesome.min.css';

function Home() {
  return (
    <div>
      <div className="Topright">
        <div className="hotbar-button">
          <img src={cartImage} alt=""
            width="50"
            height="50"
          />
        </div>
      </div>
      <div className="Middleright">
        <div className="searchbar">
          <div className="fa fa-search"></div>
          <input type="text" placeholder="Search..."></input>
          <div className="fa fa-times"></div>
        </div>
      </div>

      <div className="HomePage">
        <header><b>WorldWide Frames</b> - <i>See A Better World</i></header>
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