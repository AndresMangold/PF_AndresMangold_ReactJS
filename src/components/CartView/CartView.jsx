import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const CartView = () => {
  const { cart, total, removeItem } = useCart();

  return (
    <div className="container mt-5 bg-dark p-4"> 
      <h1 className="text-light">Tus Productos</h1> 
      <div className="row">
        <div className="col-md-8">
          {cart.map(prod => (
            <div key={prod.id} className="card mb-3 bg-secondary">
              <img src={`assets/${prod.img}`} alt={prod.name} className="card-img-top" />
              <div className="card-body">
                <h3 className="card-title text-light">{prod.name}</h3>
                <p className="card-text text-light">Cantidad: {prod.quantity}</p>
                <p className="card-text text-light">Precio por unidad: ${prod.price}</p>
                <p className="card-text text-light">Subtotal: ${prod.quantity * prod.price}</p>
                <button onClick={() => removeItem(prod.id)} className="btn btn-danger">Remover</button>
              </div>
            </div>
          ))}
        </div>
        <div className="col-md-4">
          <div className="card bg-secondary">
            <div className="card-body">
              <h3 className="card-title text-light">Resumen</h3>
              <p className="card-text text-light">Total: ${total}</p>
              <Link to='/checkout' className='btn btn-success'>Checkout</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartView;
