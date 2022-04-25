import "./DiscountCodePage.css"
import React, { useState } from 'react';
import Axios from "axios";


function DiscountCode()
{
    const [codeName, setCodeName] = useState("");
    const [discountAmount, setDiscountAmount] = useState(0);
    
    const submitDiscount = (e) => {
        e.preventDefault();
        if (!codeName || !discountAmount) {
            alert("Please fill out all the fields before continuing")
            return;
        }
        const data = {
            codename: codeName,
            discountamount: discountAmount
        }
        Axios.post("http://localhost:5000/discounts", data).then((response) => {
            if (response.data) {
                alert("Discount code created. Time to sell some orders!")
            }
        })
    }

    return (
            <div className = "discountcode-wrapper">
                <div className = "discountcode-form-wrapper">
                    <h2>Add a Discount Code</h2>
                    <form>
                        <input 
                        type="text" 
                        placeholder="Discount Code Name"
                        required
                        onChange={(event) => {
                            setCodeName(event.target.value)
                        }}/>
                    </form>
                    <form>
                            <input 
                            type="text" 
                            placeholder="Discount Amount by Percent" 
                            required
                            onChange={(event) => {
                                setDiscountAmount(event.target.value)
                            }}/>
                    </form>
                    <div className = "submitbutton-wrapper">
                        <form onSubmit={submitDiscount}>
                            <button type="submit">Create Discount Code</button>
                        </form>
                    </div>
                </div>
            </div>
    );
}
export default DiscountCode;