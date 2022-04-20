import "./AddProductPage.css"
import React, { useState } from 'react';
import Axios from "axios";

function AddProduct()
{
    const [productID, setProductID] = useState(0);
    const [modelName, setModelName] = useState("");
    const [manuName, setManuName] = useState("");
    const [itemDesc, setItemDesc] = useState("");
    const [price, setPrice] = useState(0);
    const [errorMsg, setErrorMsg] = useState("");

    const addproduct = () => {
        Axios.post("http://localhost:5000/addproduct",
            {
                productID: productID,
                modelName: modelName,
                itemDesc: itemDesc,
                price: price,
            }).then((response) => {
                if (response.data.message) {
                    setErrorMsg(response.data.message);
                } else {
                    setProductID("");
                    setModelName("");
                    setItemDesc("");
                    setPrice("");
                    setErrorMsg("Item added successfully");
                }
            });
    };

    return (
            <div class = "addproduct-container">
                <h1>Add a New Product</h1>
                <form>
                    <input type="text" placeholder="Product ID"
                    onChange={(e) => {
                        setProductID(e.target.value);
                    }}/>
                </form>
                <form>
                    <input type="text" placeholder="Model Name" 
                     onChange={(e) => {
                        setModelName(e.target.value);
                    }}/>
                </form>
                <form>
                    <input type="text" placeholder="Description" 
                     onChange={(e) => {
                        setItemDesc(e.target.value);
                    }}/>
                </form>
                <form>
                    <input type="text" placeholder="Manufacturer Name" 
                    onChange={(e) => {
                        setManuName(e.target.value);
                    }}/>
                </form>
                <form>
                    <input type="text" placeholder="Price" 
                    onChange={(e) => {
                        setPrice(e.target.value);
                    }}/>
                </form>
                <div>
                        <button onClick={addproduct}> <b>Add Product</b></button>
                </div>
                <form action="http://localhost:3000/admin">
                    <input type="submit" value="Back to Admin Tools" />
                </form>
                <h2>{errorMsg}</h2>
            </div>
    );
}
export default AddProduct;