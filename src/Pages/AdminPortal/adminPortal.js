
import "./adminPortal.css"
import React, { useEffect } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";

function AdminPortal()
{
    let history = useHistory();
    useEffect(() => {
        Axios.get("http://localhost:5000/signin").then((response) => {
            if (response.data.user) {
                if(!(response.data.user.username == "admin"))
                {
                    history.push("/");
                }
            }
            else if (!(response.data.user))
            {
                history.push("/");
            }
        })
      }, [])

    return (
            <div className = "admin-wrapper">
                <div className = "admin-form-wrapper">
                    <h2>Admin Portal</h2>
                    <div className = "discountbutton-wrapper">
                        <form action="http://localhost:3000/discountcode">
                            <input type="submit" value="ADD PROMO CODE" />
                        </form>
                    </div>
                    <div className = "addbutton-wrapper">
                        <form action="http://localhost:3000/addproduct">
                            <input type="submit" value="ADD PRODUCT" />
                        </form>
                    </div>
                    <div className = "updatebutton-wrapper">
                        <form action="http://localhost:3000/updateproduct">
                            <input type="submit" value="UPDATE PRODUCT" />
                        </form>
                    </div>
                </div>
            </div>
    );
}

export default AdminPortal;