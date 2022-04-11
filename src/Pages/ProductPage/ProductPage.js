import "./ProductPage.css"
import image from "../../images/testglasses.jpg";

function Product() {
    let name = "Test Glasses";
    let manufacturer = "Stark Industries"
    let cost = 99.99;
    return (
        <div className="product-background">
            {/* create an overall panel, with header 2, the image, and the button inside of it */}
                <div className="container">
                    <div className="image1">
                        <img src={image}
                            alt=""
                            width="400"
                            height="400" />
                    </div>
                </div>
                <div className="container">
                    <p><b>Name: </b> {name}</p>
                    <p><b>Manufacturer: </b>{manufacturer} </p>
                    <p><b>Cost: </b>{cost}</p>
                    <button>Add to Cart</button>
                </div>
            </div>
    );
}

export default Product;
