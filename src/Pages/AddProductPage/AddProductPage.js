import "./AddProductPage.css"

function AddProduct()
{
    return (
        <body>
            <div Class = "addproduct-container">
                <h1>Add a New Product</h1>
                <form>
                    <input type="text" placeholder="Product ID" />
                </form>
                <form>
                    <input type="text" placeholder="Model Name" />
                </form>
                <form>
                    <input type="text" placeholder="Manufacturer Name" />
                </form>
                <form>
                    <input type="text" placeholder="Price" />
                </form>
                <form action="http://localhost:3000/addproduct">
                    <input type="submit" value="Add Product" />
                </form>
                <form action="http://localhost:3000/admin">
                    <input type="submit" value="Back to Admin Tools" />
                </form>
            </div>
        </body>
    );
}
export default AddProduct;