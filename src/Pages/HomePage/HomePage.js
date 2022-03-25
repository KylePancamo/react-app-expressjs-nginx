import "./HomePage.css"
import image from "../../images/cartimage.png"
import image2 from "../../images/searchbar.png"
function Home() {

  return (
    <div>
      <div className="App">
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
          </div>
        </div>
      </div>
      <div className="Topright">
        <div className="hotbar-button">
          <img src={image} alt=""
            width="55"
            height="50" />
        </div>
      </div>
      <div className="Middleright">
        <div className="hotbar-button">
          <img src={image2} alt=""
            width="55"
            height="50" />
        </div>
      </div>
    </div>

  );
}

export default Home;