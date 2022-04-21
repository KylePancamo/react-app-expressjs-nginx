import "./AddProductPage.css"
import React, { useState } from 'react';
import Axios from "axios";

function AddProduct() {
    const [itemName, setItemName] = useState("");
    const [manuName, setManuName] = useState("");
    const [itemDesc, setItemDesc] = useState("");
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState();
    const [errorMsg, setErrorMsg] = useState("");

    const onFormSubmit = e => {
        if (!file) {
            setErrorMsg("Please upload a file before uploading!")
            e.preventDefault();
            return;
        }

        setErrorMsg("");
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", file);
        formData.append('itemInfo', itemName);
        formData.append('itemInfo', itemDesc);
        formData.append('itemInfo', price);

        
        Axios.post("http://localhost:5000/addproduct", formData).then((response) => {
                if (response.data.message) {
                    setErrorMsg(response.data.message);
                } else {
                    setItemName("");
                    setItemDesc("");
                    setPrice("");
                    setErrorMsg("Item added successfully");
                }
            });
    }

    return (
        <div class="addproduct-container">
            <h1>Add a New Product</h1>
            <form>
                <input type="text" required placeholder="Item Name"
                    onChange={(e) => {
                        setItemName(e.target.value);
                    }} />
            </form>
            <form>
                <input type="text" required placeholder="Description"
                    onChange={(e) => {
                        setItemDesc(e.target.value);
                    }} />
            </form>
            <form>
                <input type="text" required placeholder="Manufacturer Name"
                    onChange={(e) => {
                        setManuName(e.target.value);
                    }} />
            </form>
            <form>
                <input type="text" required placeholder="Price"
                    onChange={(e) => {
                        setPrice(e.target.value);
                    }} />
            </form>
            <form onSubmit={onFormSubmit}>
                <input type="file" name='image' onChange={(e) => {
                    setFile(e.target.files[0])
                }} />
                <div>
                    <button type="submit">Add Product</button>
                </div>
            </form>
            <form action="http://localhost:3000/admin">
                <input type="submit" value="Back to Admin Tools" />
            </form>
            {errorMsg && 
                <h2>{errorMsg}</h2>
            }
        </div>
    );
}
export default AddProduct;