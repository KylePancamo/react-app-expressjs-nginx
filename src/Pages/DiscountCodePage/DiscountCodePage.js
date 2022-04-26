import "./DiscountCodePage.css"
import React, { useEffect, useState } from 'react';
import Axios from "axios";


function DiscountCode() {
    const [codeName, setCodeName] = useState("");
    const [discountAmount, setDiscountAmount] = useState(0);

    const [discountCodes, setDiscountCodes] = useState({});
    const [discountState, setDiscountState] = useState('');

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
                setDiscountState(response.data);
            }
        })
    }

    useEffect(() => {
        Axios.get("http://localhost:5000/get-discounts").then((response) => {
            setDiscountCodes(response.data);
            console.log("asds")
        })
    }, [discountState])

    let d = []
    Object.entries(discountCodes).forEach(([k, v]) => {
        d.push({ k, v })
    })

    const deleteDiscount = (props) => {
        console.log(props);
        Axios.post("http://localhost:5000/delete-discount", {data: props}).then((response) => {
            setDiscountState(response.data);
        })
    }

    return (
        <div className="discountcode-wrapper">
            <div className="discountcode-form-wrapper">
                <h2>Add a Discount Code</h2>
                <form>
                    <input
                        type="text"
                        placeholder="Discount Code Name"
                        required
                        onChange={(event) => {
                            setCodeName(event.target.value)
                        }} />
                </form>
                <form>
                    <input
                        type="text"
                        placeholder="Discount Amount by Percent"
                        required
                        onChange={(event) => {
                            setDiscountAmount(event.target.value)
                        }} />
                </form>
                <div className="submitbutton-wrapper">
                    <form onSubmit={submitDiscount}>
                        <button type="submit">Create Discount Code</button>
                    </form>
                </div>
            </div>
            <div className="discountcode-form-wrapper">
                <h2>Discount Codes</h2>
                <table className="tables">
                    <thead>
                        <tr>
                            <th>
                                Discount Code
                            </th>
                            <th>
                                Percent Off
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            d.map(index => {
                                return (
                                    <tr>
                                        <td>{index.k}</td>
                                        <td>{index.v}%</td>
                                        <td>
                                            <div className="discount-delete">
                                                <button type="submit" onClick ={() => deleteDiscount(index.k)}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default DiscountCode;