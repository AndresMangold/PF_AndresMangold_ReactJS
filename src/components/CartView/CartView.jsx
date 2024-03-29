import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useNotification, showBootstrapAlert } from "../../notification/NotificationService";

const CartView = () => {
  const { cart, total, removeItem } = useCart();
  const { showNotification } = useNotification();

  const handleRemoveItem = async (productId, productName) => {
    try {
      await removeItem(productId, 1);
      showNotification('success', `Producto ${productName} se removió exitosamente`);
      showBootstrapAlert('success', 'El producto se removió con éxito');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-5 bg-dark p-4">
      <h1 className="text-light">Tus Productos</h1>
      <div className="row">
        <div className="col-md-8">
          <div className="row row-cols-1 row-cols-md-2">
            {cart.length > 0 ? (
              cart.map((prod) => (
                <div key={prod.id} className="col mb-4">
                  <div className="card bg-secondary">
                    <img
                      src={`assets/${prod.img}`}
                      alt={prod.name}
                      className="card-img-top mx-auto mt-3"
                      style={{ maxWidth: '200px', maxHeight: '300px', boxShadow: '8px 4px 8px rgba(0, 0, 0, 0.5)' }}
                      onError={(e) => {
                        e.target.onerror = null;
                      }}
                    />
                    <div className="card-body">
                      <h3 className="card-title text-light">{prod.name}</h3>
                      <p className="card-text text-light">Cantidad: {prod.quantity}</p>
                      <p className="card-text text-light">Precio por unidad: ARS ${prod.price}</p>
                      <p className="card-text text-light border-top border-bottom border-white fw-bold">Subtotal: ARS ${prod.quantity * prod.price}</p>
                      <button onClick={() => handleRemoveItem(prod.id, prod.name)} className="btn btn-danger">
                        Remover
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-light">No hay productos en el carrito.</p>
            )}
          </div>
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

      <div id="messages-container"></div>
    </div>
  );
};

export default CartView;
