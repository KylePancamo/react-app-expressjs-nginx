import "./ShoppingPage.css"
import Header from './components/Header';
import Main from './components/Main';
import Basket from './components/Basket';
import { useEffect, useState } from 'react';
import Axios from "axios";

function ShoppingPage(props) {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (props.location.cart) {
      props.location.cart.map(element => {
        cartItems.push(element);
      })

      for (var i = 0; i < cartItems.length; i++) {
        onAdd(cartItems[i]);
      }
      window.history.replaceState({}, document.title)
    }
    if (props.location.state) {
      onAdd(props.location.state);
    }
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
      <div className="Middleright">
        <div className="searchbar">
          <div className="fa fa-search"></div>
          <input 
          type="text" 
          placeholder="Search..."
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
          />
          <button 
          className="fa fa-times"
          onClick={() => {
            setSearchTerm("");
          }}/>
        </div>
      </div>
      <div className="row">
        <Main
          products={products}
          onAdd={onAdd}
          cartItems={cartItems}
          searchTerm={searchTerm}>
        </Main>
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