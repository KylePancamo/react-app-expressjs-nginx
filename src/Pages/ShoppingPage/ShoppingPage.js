import "./ShoppingPage.css"
import Header from './components/Header';
import Main from './components/Main';
import Basket from './components/Basket';
import { useEffect, useState } from 'react';
import Axios from "axios";

function ShoppingPage() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:5000/get-items").then((response) => {
      if (response.data) {
        setProducts(response.data.itemList);
      }
    })
  }, []);

  const [cartItems, setCartItems] = useState([]);
  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setCartItems( /*test*/
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };
  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };

  return (
    <div className="ShoppingPage">
      <h2>Browse Products</h2>
      <div className="row">
        <Main products={products} onAdd={onAdd}></Main>
        <Basket
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          setCartItems={setCartItems}></Basket>
      </div>
    </div>
  );
}

export default ShoppingPage;