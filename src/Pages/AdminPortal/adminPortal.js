import { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";

function adminPortal()
{
    return (
            <div class = "admin-container">
                <h1>Admin Portal</h1>
                <form action="http://localhost:3000/updateuser">
                    <input type="submit" value="Update a User" />
                </form>
                <form action="http://localhost:3000/discountcode">
                    <input type="submit" value="Add a Discount Code" />
                </form>
                <form action="http://localhost:3000/addproduct">
                    <input type="submit" value="Add a New Product" />
                </form>
                <form action="http://localhost:3000/updateproduct">
                    <input type="submit" value="Update a Product" />
                </form>
            </div>
    );
}
export default adminPortal;
