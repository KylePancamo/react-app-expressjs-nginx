import { render } from "@testing-library/react";
import Axios from "axios";
import React, { useState, useEffect, useMemo } from 'react';
import "./OrderHistory.css"
import 'font-awesome/css/font-awesome.min.css';

function OrderHistory() {

    const [orderInfo, setOrderInfo] = useState([]);
    const [itemInfo, setItemInfo] = useState([]);
    const [orders, setOrders] = useState([]);


    useEffect(() => {
        Axios.get("/api/orders").then((response) => {
            if (response.data) {
                setItemInfo(response.data);
            }

        })
    }, []);

    const useSortableData = (items, config = { key: 'null', direction: 'null' }) => {
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
        <div className="order-list">
            <div className="container">
                <table className="tables">
                    <caption>Order History</caption>
                    <thead>
                        <tr className="tr">
                            <th>
                                <button
                                    type="button"
                                    onClick={() => requestSort('order_num')}
                                    className={getClassNamesFor('order_num')}>
                                    Order Id
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
                                    <tr key={index.item_id}>
                                        <td>{index.order_num}</td>
                                        <td>{index.quantity}</td>
                                        <td>{index.total_price}</td>
                                    </tr>
                                )
                            })
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
                </table>
                <table className="tables">
                    <caption>Item History</caption>
                    <thead>
                        <tr className="tr">
                            <th>
                                <button
                                    type="button"
                                    onClick={() => requestSort('order_num')}
                                    className={getClassNamesFor('order_num')}>
                                    Order Id
                                </button>
                            </th>
                            <th>
                                <button
                                    type="button"
                                    onClick={() => requestSort('id')}
                                    className={getClassNamesFor('id')}>
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
                                    onClick={() => requestSort('item_price')}
                                    className={getClassNamesFor('item_price')}>
                                    Item Price
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map(index => {
                                return (
                                    <tr key={index.id}>
                                        <td>{index.order_num}</td>
                                        <td>{index.id}</td>
                                        <td>{index.item_name}</td>
                                        <td>{index.item_description}</td>
                                        <td>{index.item_price}</td>
                                    </tr>
                                )
                            })
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
                </table>
            </div>
        </div>
    );
}

export default OrderHistory;