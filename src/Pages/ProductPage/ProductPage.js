import "./ProductPage.css"

function Product() {
    return (
        <div>
            <div className="App1">
                <div className="header1">
                    <b>WorldWide Frames</b> - <i>See A Better World</i>
                </div>
                {/* create an overall panel, with header 2, the image, and the button inside of it */}
                <div className="panel1">
                    <div className="header2">
                        <p>Name: </p>
                        <p>Manufacturer: </p>
                        <p>Cost: </p>
                    </div>
                    <button>Add to Cart</button>
                </div>
            </div>
        </div>
    );
}

export default Product;