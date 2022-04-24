import Axios from "axios";
import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";


function DealsOfTheDay() {

    const history = useHistory();

    const [productDeals, setProductDeals] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:5000/DoD-items").then((response) => {
            setProductDeals(response.data);
        })
    }, [])


    const viewProduct = (product) => {
        history.push({
            pathname: '/product-page',
            state: product
          })
    }
    console.log(productDeals)
    return (
        <div className="frame-sets">
            {productDeals.map(index => {
                return (
                    <div className="wrapper" key={index.id}>
                        <i>{index.percentOff}%  Percent off</i>
                        <div>
                            <img
                                src={index.pathname}
                                width={100}
                                height={100}
                            />
                        </div>
                        <div>
                            {index.item_name}
                        </div>
                        <div>
                            Discounted Price: ${index.item_price}
                        </div>
                        <button onClick={() => viewProduct(index)} className="product-view-button">View product</button>
                    </div>

                )
            })
            }
        </div>
    )
}

export default DealsOfTheDay