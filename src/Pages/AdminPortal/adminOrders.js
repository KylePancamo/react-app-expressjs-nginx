import React, { useEffect, useState } from 'react';
import Axios from "axios";

function AdminOrders() {
    const[orderHistory, setOrderHistory] = useState([]);
    useEffect(() => {
        Axios.get("http://localhost:5000/admin-orders").then((response) => {
            setOrderHistory(response.data);
        })
    }, []);
    return (
        <div className="updateproduct-wrapper">
            <div className="updateproduct-form-item-wrapper">
                <h2>List of Items:</h2>
                <div className="container">
                    <table className="tables">
                        <thead>
                            <tr className="tr">
                                <th>
                                    Account Id
                                </th>
                                <th>
                                    Order number
                                </th>
                                <th>
                                    Item Id
                                </th>
                                <th>
                                    Item Name
                                </th>
                                <th>
                                    Item Description
                                </th>
                                <th>
                                    Quantity
                                </th>
                                <th>
                                    Total Price
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orderHistory.map(index => {
                                    return (
                                        <tr>
                                            <td>{index.account_id}</td>
                                            <td>{index.order_num}</td>
                                            <td>{index.item_id}</td>
                                            <td>{index.item_name}</td>
                                            <td>{index.item_description}</td>
                                            <td>{index.quantity}</td>
                                            <td>${index.total_price}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                        <tbody>
                        {
                            !orderHistory.length &&
                            <>
                                <div className="fa fa-info-circle" /> No orders have been placed
                            </>
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
export default AdminOrders;