import React from 'react';
import { useHistory } from "react-router-dom";
import {
  Link
} from "react-router-dom";

export default function Product(props) {
  const { product, onAdd, cartItems } = props;

  const history = useHistory();

  const viewProduct = (e) => {
    history.push({
      pathname: '/product-page',
      state: product,
      cart: cartItems
    })
  }

  return (
    <div className="products">
      <table>
        <thead>
          <tr>
            <th>
              {product.item_name}
            </th>
            <th>
              <img
                src={product.pathname}
                alt="Glasses"
                width={100} />
              <button onClick={viewProduct} className="product-button">View product</button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {product.manufacturer}
          </tr>
          <tr>
            <td>
              ${product.item_price}
            </td>
          </tr>
          <tr>
            <td>
              Product Id: {product.id}
            </td>
          </tr>
          <tr>
            <td>
              <button onClick={() => onAdd(product)}>Add To Cart</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  );
}