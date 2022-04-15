import "./ProductPage.css"
import image from "../../images/testglasses.jpg";

function Product() {
    let name = "Test Glasses";
    let manufacturer = "Stark Industries"
    let cost = 99.99;
    return (
        <div className="product-background">
            <div className="ProductPage">
            {/* create an overall panel, with header 2, the image, and the button inside of it */}
                <div className="container1">
                        <img src={image}/>
                </div>
                <div className="container2">
                    <p><b>Names: </b> {name}</p>
                    <p><b>Manufacturer: </b>{manufacturer} </p>
                    <p><b>Cost: </b>{cost}</p>
                    <button>Add to Cart</button>
                </div>
            </div>
        </div>
    );
}

export default Product;