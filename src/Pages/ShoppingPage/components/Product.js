import React from 'react';

export default function Product(props) {
  const { product, onAdd } = props;
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
              width={100}/>
            </th>
          </tr>
        </thead>
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