import Product from './Product';

export default function Main(props) {
  const { products, onAdd, cartItems, searchTerm } = props;

  return (
    <main className="block col-2">
      <h2>Products</h2>
      <div className="row">
        {products.filter((val) => {
          if (searchTerm == "") {
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