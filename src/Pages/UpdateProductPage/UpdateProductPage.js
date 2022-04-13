import "./UpdateProductPage.css"

function UpdateProduct()
{
    return (
        <body>
            <div Class = "updateproduct-container">
                <h1>Update an Existing Product</h1>
                <form>
                        <input type="text" placeholder="Enter a Product ID" />
                </form>
                <form action="http://localhost:3000/updateproduct">
                    <input type="submit" value="Search" />
                </form>
                &nbsp;
                <div class="product-display">
                    <form>
                            <input type="text" />
                    </form>
                    <form>
                            <input type="text"  />
                    </form>
                    <form>
                            <input type="text" />
                    </form>
                </div>
                <form action="http://localhost:3000/updateproduct">
                    <input type="submit" value="Update" />
                </form>
                <form action="http://localhost:3000/admin">
                    <input type="submit" value="Back to Admin Tools" />
                </form>
            </div>
        </body>
    );
}
export default UpdateProduct;