import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const CartView = () => {
  const { cart, total, removeItem } = useCart();

  const handleRemoveItem = (productId) => {
    removeItem(productId, 1);
  };

  return (
    <div className="container mt-5 bg-dark p-4">
      <h1 className="text-light">Tus Productos</h1>
      <div className="row">
        <div className="col-md-8">
          {cart.map((prod) => (
            <div key={prod.id} className="card mb-3 bg-secondary">
              <img
                src={`assets/${prod.img}`}
                alt={prod.name}
                className="card-img-top"
                style={{ maxWidth: '300px', maxHeight: '400px' }}
              />
              <div className="card-body">
                <h3 className="card-title text-light">{prod.name}</h3>
                <p className="card-text text-light">Cantidad: {prod.quantity}</p>
                <p className="card-text text-light">Precio por unidad: ARS ${prod.price}</p>
                <p className="card-text text-light border-top border-bottom border-white fw-bold">Subtotal: ARS ${prod.quantity * prod.price}</p>
                <button onClick={() => handleRemoveItem(prod.id)} className="btn btn-danger">
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="col-md-4">
          <div className="card bg-secondary">
            <div className="card-body">
              <h3 className="card-title text-light text-decoration-underline">Resumen</h3>
              <p className="card-text text-light">Total: ARS ${total}</p>
              <p className="card-title text-light">Imp. IVA 21%</p>
              <h4 className="card-text text-light mt-3 border-top border-bottom border-white fw-bold">
                FINAL: ARS ${(total * 1.21).toFixed(2)}
              </h4>
              <Link to="/checkout" className="btn btn-success">
                Checkout
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CartView;
