import Product from './Product';
import React, { useState, useMemo } from 'react';

export default function Main(props) {
  const { products, onAdd, cartItems, searchTerm } = props;

  const [sortedConfig, setSortedConfig] = useState({ key: 'null', direction: 'null' });

  const useSortableData = (items) => {

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
    }, [products, sortedConfig]);

    const requestSort = key => {
      let direction = 'ascending';
      if (sortedConfig.key === key && sortedConfig.direction === 'ascending') {
        direction = 'descending';
      }
      setSortedConfig({ key, direction });
    }
    return { items: sortedItems, requestSort, sortedConfig }
  }

  const { items, requestSort} = useSortableData(products);

  const getClassNamesFor = (name) => {
    if (!sortedConfig) {
      return;
    }
    return sortedConfig.key === name ? sortedConfig.direction : undefined;
  }

  return (
    <main className="block col-2">
      <h2>Products</h2>
      <div className="sortable-header">
        <i>Sort by:</i>
      </div>
      <div className="sortable-items">
        <button className="clear"
          onClick={() => {
            setSortedConfig({ key: 'null', direction: 'null' })
          }}>
          <div className="fa fa-times"/>
        </button>
        <button
          onClick={() => requestSort('item_price')}
          className={getClassNamesFor('item_price')}>
          Price
        </button>
        <button
          onClick={() => requestSort('item_name')}
          className={getClassNamesFor('item_name')}>
          Item Name
        </button>
        <button
          onClick={() => requestSort('manufacturer')}
          className={getClassNamesFor('manufacturer')}>
          Manufacturer
        </button>
      </div>
      
      <div className="row">
        {items.filter((val) => {
          if (searchTerm == "") {
            return val
          } else if ((val.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()))) {
            return val
          } else if ((val.item_name.toLowerCase().includes(searchTerm.toLowerCase()))) {
            return val
          }
        }).map((product) => (
          <Product key={product.id} product={product} onAdd={onAdd} cartItems={cartItems}></Product>
        ))}
      </div>
    </main>
  );
}