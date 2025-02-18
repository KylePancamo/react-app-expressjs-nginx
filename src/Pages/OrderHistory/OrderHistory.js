import { render } from "@testing-library/react";
import Axios from "axios";
import React, { useState, useEffect, useMemo } from 'react';
import "./OrderHistory.css"
import 'font-awesome/css/font-awesome.min.css';
import { Redirect } from 'react-router-dom'

import {
    Link,
} from "react-router-dom";

function OrderHistory(props) {

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('login')) === "true") {
            Axios.get("http://localhost:5000/orders").then((response) => {
                if (response.data) {
                    setItemInfo(response.data);
                }
            })
        }
    }, [localStorage.getItem('login')]);


    const [orderInfo, setOrderInfo] = useState([]);
    const [itemInfo, setItemInfo] = useState([]);
    const [orders, setOrders] = useState([]);


    const useSortableData = (items, config = { key: 'null', direction: 'null' }) => {
        console.log(items);

        const [sortedConfig, setSortedConfig] = useState(config);

        const sortedItems = useMemo(() => {
            let sortableItems = [...items];
            if (sortedConfig !== null) {
                sortableItems.sort((a, b) => {
                    if (a[sortedConfig.key] < b[sortedConfig.key]) {
                        return sortedConfig.direction === 'ascending' ? -1 : 1;
                    }
                    if (a[sortedConfig.key] > b[sortedConfig.key]) {
                        return sortedConfig.direction === 'ascending' ? 1 : -1;
                    }
                    return 0;
                });
            }
            return sortableItems;
        }, [itemInfo, sortedConfig]);

        const requestSort = key => {
            let direction = 'ascending';
            if (sortedConfig.key === key && sortedConfig.direction === 'ascending') {
                direction = 'descending';
            }
            setSortedConfig({ key, direction });
        }
        return { items: sortedItems, requestSort, sortedConfig }
    }

    const { items, requestSort, sortedConfig } = useSortableData(itemInfo);

    const getClassNamesFor = (name) => {
        if (!sortedConfig) {
            return;
        }
        return sortedConfig.key === name ? sortedConfig.direction : undefined;
    }

    return (
        <div className="order-background">
            <div className="updateproduct-wrapper">
                <div className="updateproduct-form-item-wrapper">
                    <h2>Item History</h2>
                    <div className="container">
                        <table className="tables">
                            <thead>
                                <tr className="tr">
                                    <th>
                                        <button
                                            type="button"
                                            onClick={() => requestSort('order_num')}
                                            className={getClassNamesFor('order_num')}>
                                            Order Id:
                                        </button>
                                    </th>
                                    <th>
                                        <button
                                            type="button"
                                            onClick={() => requestSort('item_id')}
                                            className={getClassNamesFor('item_id')}>
                                            Item Id
                                        </button>
                                    </th>
                                    <th>
                                        <button
                                            type="button"
                                            onClick={() => requestSort('item_name')}
                                            className={getClassNamesFor('item_name')}>
                                            Item Name
                                        </button>
                                    </th>
                                    <th>
                                        <button
                                            type="button"
                                            onClick={() => requestSort('item_description')}
                                            className={getClassNamesFor('item_description')}>
                                            Item Description
                                        </button>
                                    </th>
                                    <th>
                                        <button
                                            type="button"
                                            onClick={() => requestSort('quantity')}
                                            className={getClassNamesFor('quantity')}>
                                            Quantity
                                        </button>
                                    </th>
                                    <th>
                                        <button
                                            type="button"
                                            onClick={() => requestSort('total_price')}
                                            className={getClassNamesFor('total_price')}>
                                            Total Price
                                        </button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    items.map(index => {
                                        return (
                                            <tr>
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
                                {(JSON.parse(localStorage.getItem('login')) === "false" || !JSON.parse(localStorage.getItem('login'))) &&
                                    <Redirect to={{ alert: "Please login to view your orders!" }} />
                                }
                            </tbody>
                            <tbody>
                                {
                                    !items.length &&
                                    <>
                                        <div className="fa fa-info-circle" /> No orders have been placed
                                    </>
                                }
                            </tbody>
                            <Link to="/account">Back to Account Page</Link>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderHistory;