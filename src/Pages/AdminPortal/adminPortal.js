
import "./adminPortal.css"
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";

import UpdatePage from "../UpdateProductPage/UpdateProductPage"
import PromoCode from "../DiscountCodePage/DiscountCodePage"
import AddProduct from "../AddProductPage/AddProductPage"

function AdminPortal() {

    const [portalType, setPortalType] = useState('update');

    let history = useHistory();
    useEffect(() => {
        Axios.get("http://localhost:5000/signin").then((response) => {
            if (response.data.user) {
                if (!(response.data.user.username == "admin")) {
                    history.push("/");
                }
            }
            else if (!(response.data.user)) {
                history.push("/");
            }
        })
    }, [])

    return (
        <div className="admin-background">
            <div className="portal-text">
                
            </div>
            <div className="admin-wrapper">
                <div className="admin-form-wrapper">
                <h2>Admin Portal</h2>
                    <div className="discountbutton-wrapper">
                        <form>
                            <input type="submit" value="ADD PROMO CODE" onClick={(e) => {
                                e.preventDefault();
                                setPortalType("promo")
                            }} />
                        </form>
                    </div>
                    <div className="addbutton-wrapper">
                        <form action="http://localhost:3000/addproduct">
                            <input type="submit" value="ADD PRODUCT" onClick={(e) => {
                                e.preventDefault();
                                setPortalType("product")
                            }} />
                        </form>
                    </div>
                    <div className="updatebutton-wrapper">
                        <form>
                            <input type="submit" value="UPDATE PRODUCT" onClick={(e) => {
                                e.preventDefault();
                                setPortalType("update")
                            }} />
                        </form>
                    </div>
                </div>
                <div className="loaded-component">
                    {portalType == "update" &&
                        <UpdatePage />
                    }
                    {portalType == "promo" &&
                        <PromoCode />
                    }
                    {portalType == "product" &&
                        <AddProduct />
                    }
                </div>
            </div>
        </div>
    );
}

export default AdminPortal;