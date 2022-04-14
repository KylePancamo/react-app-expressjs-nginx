import React from 'react';

export default function Product(props) {
  const { product, onAdd } = props;
  return (
    <div className="products">
      <table>
          <tr>
            <th>
              {product.item_name}
            </th>
            <th>
              {product.item_description}
            </th>
          </tr>
        <tbody>
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
        </tbody>
        <div>
          <button onClick={() => onAdd(product)}>Add To Cart</button>
        </div>
      </table>
    </div>

  );
}