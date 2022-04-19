import React from 'react';
import Axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { useState } from 'react';

export default function Basket(props) {
  const { cartItems, onAdd, onRemove, setCartItems } = props;
  console.log(props);
  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.item_price, 0);
  const taxPrice = itemsPrice * 0.14;
  const shippingPrice = itemsPrice > 2000 ? 0 : 20;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  const checkOut = () => {
    if (cartItems.length != 0) {
      /*Axios.post("http://localhost:5000/checkout", cartItems).then((response) => {

      })*/
      console.log("checkout cleared");
      setCartItems([])
    }
  }

  return (
    <aside className="block col-1">
      <h2>Cart Items</h2>
      <div>
        {cartItems.length === 0 && <div>Cart is empty</div>}
        {cartItems.map((item) => (
          <div key={item.id} className="row">
            <div className="col-2">{item.item_name}</div>
            <div className="col-2">
              <button onClick={() => onRemove(item)} className="remove">
                Remove
              </button>{' '}
              <button onClick={() => onAdd(item)} className="add">
                Add
              </button>
            </div>

            <div className="col-2 text-right">
              {item.qty} x ${item.item_price.toFixed(2)}
            </div>
          </div>
        ))}

        {cartItems.length !== 0 && (
          <>
            <hr></hr>
            <div className="row">
              <div className="col-2">Items Price</div>
              <div className="col-1 text-right">${itemsPrice.toFixed(2)}</div>
            </div>
            <div className="row">
              <div className="col-2">Tax Price</div>
              <div className="col-1 text-right">${taxPrice.toFixed(2)}</div>
            </div>
            <div className="row">
              <div className="col-2">Shipping Price</div>
              <div className="col-1 text-right">
                ${shippingPrice.toFixed(2)}
              </div>
            </div>

            <div className="row">
              <div className="col-2">
                <strong>Total Price</strong>
              </div>
              <div className="col-1 text-right">
                <strong>${totalPrice.toFixed(2)}</strong>
              </div>
            </div>
            <hr />
            <div className="row">
              <button onClick={checkOut}>
                Place Order
              </button>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}