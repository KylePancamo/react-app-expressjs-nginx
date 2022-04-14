import React from 'react';
import { useState } from 'react';



export default function Checkout(props) {
    const [cartItems, setCartItems] = useState([]);
    console.log(props.location.state.cartItems);
    
    return (
        <div className="container">
            <h1>Checkout</h1>
            {props.location.state.cartItems[0].item_name}
        </div>
    )
}