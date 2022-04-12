import { render } from "@testing-library/react";
import Axios from "axios";
import React, { useState, useEffect } from 'react';
import "./OrderHistory.css"
import 'font-awesome/css/font-awesome.min.css';

function OrderHistory() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        Axios.get("/api/orders").then((response) => {
            if (response.data) {
                setOrders(response.data);
                console.log("rendered");
            }
            
        })
    }, []);



    return (
        <div className="order-list">
            <div className="container">
                <h2>Order History</h2>
                <table className="tables">
                    <thead>
                        <tr className="tr">
                            <th>Order Id</th>
                            <th>Item Name</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(index => {
                                return (
                                    <tr key={index.order_num}>
                                        <td>{index.order_num}</td>
                                        <td>{index.item_name}</td>
                                        <td>{index.quantity}</td>
                                        <td>{index.total_price}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                {
                    !orders.length &&
                    <>
                        <div className="fa fa-info-circle"/> No orders have been placed
                    </>
                }
            </div>
        </div>
    );
}

export default OrderHistory;