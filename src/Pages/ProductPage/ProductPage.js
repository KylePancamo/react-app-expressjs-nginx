import "./ProductPage.css"
import { useHistory } from "react-router-dom";

function Product(props) {

    //console.log(props);

    const products = props.location.state;
    const cartItems = props.location.cart;
    const history = useHistory();

    const addToCart = (e) => {
        history.push({
            pathname: '/shopping-page',
            state: products,
            cart: cartItems,
        })
    }

    return (
        <div className="product-background">
            <div className="ProductPage">
                <div className="productrow">
                     {/* create an overall panel, with header 2, the image, and the button inside of it */}
                     <div className="container1">
                        <img
                            src={products.pathname}
                         width={500} />
                    </div>
                    <div className="container2">
                        <p><b>Names: </b> {products.item_name}</p>
                        <p><b>Manufacturer: </b>{products.manufacturer} </p>
                        <p><b>Cost: </b>{products.item_price}</p>
                        <button onClick={addToCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;