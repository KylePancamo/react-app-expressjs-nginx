import React, { useCallback, useEffect, useState } from 'react';
import Axios from 'axios'

export default function Basket(props) {
  const { cartItems, onAdd, onRemove, setCartItems } = props;

  const [totalPrice, setTotalPrice] = useState();

  const [discountCode, setDiscountCode] = useState();
  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.item_price, 0);
  const taxPrice = itemsPrice * 0.0825;
  const shippingPrice = itemsPrice > 2000 ? 0 : 20;

  const checkOut = async () => {
    if (JSON.parse(localStorage.getItem('login')) === "true") {
      if (cartItems.length != 0) {
        const { data } = await Axios.get("http://localhost:5000/signin");
        const accountId = data.user.account_id

        let checkOutData = { cartItems, totalPrice, accountId }
        Axios.post("http://localhost:5000/checkout", checkOutData).then((response) => {

        }, [])

        setCartItems([])
        alert("Your order has been placed!")
      }
    } else {
      alertUser();
    }
  }

  const alertUser = () => {
    alert("Please login to perform this operation!")
  }




  useEffect(() => {
    setTotalPrice(itemsPrice + taxPrice + shippingPrice)
    console.log(totalPrice);
  }, [cartItems])

  const checkCode = (e) => {  
    e.preventDefault();
    Axios.get("http://localhost:5000/get-discounts").then((response) => {
      if (response.data) {
        if (response.data[discountCode]) {
          setTotalPrice(totalPrice - (totalPrice * (response.data[discountCode] / 100)))
          alert("Discount code has been applied")
        } else {
          alert("Discount code does not exist!")
        }
      }
    })
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
              <div className="rowButton">
                <button onClick={checkOut}>
                  Place Order
                </button>
              </div>
              <div className="discount">
                <div className="discountInput">
                  <form>
                    <input
                      type="text"
                      placeholder="Enter Discount Code"
                      onChange={(event) => {
                        setDiscountCode(event.target.value);
                      }} />
                  </form>
                </div>
                <div className="apply">
                  <form onSubmit={checkCode}>
                    <input type="submit" value="Apply" />
                  </form>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </aside >
  );
}