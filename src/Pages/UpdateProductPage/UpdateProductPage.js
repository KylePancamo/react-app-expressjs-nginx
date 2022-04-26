import "./UpdateProductPage.css"
import React, { useEffect, useState } from 'react';
import Axios from "axios";

function UpdateProduct() {
    const [productID, setProductID] = useState("");
    const [modelName, setModelName] = useState("");
    const [manuName, setManuName] = useState("");
    const [itemDesc, setItemDesc] = useState("");
    const [price, setPrice] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const [products, setProducts] = useState([]);
    useEffect(() => {
        Axios.get("http://localhost:5000/get-items").then((response) => {
            if (response.data) {
                setProducts(response.data.itemList);
                console.log("Consoles")
            }
        })
    }, [!productID]);

    const updateproduct = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:5000/updateproduct",
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
                    setErrorMsg("Product updated successfully");
                }
            });
    };

    const searchproduct = () => {
        Axios.post("http://localhost:5000/searchproduct",
            {
                productID: productID,
            }).then((response) => {
                if (response.data.err) {
                    setErrorMsg(response.data.err);
                } else {
                    setModelName(response.data.modelName);
                    setItemDesc(response.data.itemDesc);
                    setPrice(response.data.price);
                    setErrorMsg("");
                }
            });
    };

    return (
        <div className="updateproduct-wrapper">
            <div className="updateproduct-form-wrapper">
                <h2>Update an Existing Product</h2>
                <form>
                    <input type="number" placeholder="Enter a Product ID" value={productID}
                        onChange={(e) => {
                            setProductID(e.target.value);
                        }} />
                </form>
                <div className="searchbutton-wrapper">
                    <button onClick={searchproduct}> <b>Search</b></button>
                </div>
                &nbsp;
                <div className="product-display">
                    <form>
                        <input type="text" value={modelName}
                            onChange={(e) => {
                                setModelName(e.target.value);
                            }} />
                            Model Name
                    </form>
                    <form>
                        <input type="text" value={itemDesc}
                            onChange={(e) => {
                                setItemDesc(e.target.value);
                            }} />
                            Item Description
                    </form>
                    <form>
                        <input type="text" value={price}
                            onChange={(e) => {
                                setPrice(e.target.value);
                            }} />
                            Item Price
                    </form>
                </div>
                <div className="submitbutton-wrapper">
                    <button onClick={updateproduct}> <b>Update Product</b></button>
                </div>
                <div className="errormessage"><h2>{errorMsg}</h2></div>
            </div>
            <div className="updateproduct-form-item-wrapper">
                <h2>List of Items:</h2>
                <div className="container">
                    <table className="tables">
                        <thead>
                            <tr className="tr">
                                <th>
                                    Item Id
                                </th>
                                <th>
                                    Image
                                </th>
                                <th>
                                    Item Name
                                </th>
                                <th>
                                    Item Description
                                </th>
                                <th>
                                    Item Price
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map(index => {
                                    return (
                                        <tr>
                                            <td>{index.id}</td>
                                            <td><img
                                                src={index.pathname}
                                                width={50} />
                                            </td>
                                            <td>{index.item_name}</td>
                                            <td>{index.item_description}</td>
                                            <td>${index.item_price}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
export default UpdateProduct;