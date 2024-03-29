import ItemCount from '../ItemCount/ItemCount';
import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import styles from './ItemDetail.module.css';

const ItemDetail = ({ id, name, img, description, price, stock }) => {
  const [quantityAdded, setQuantityAdded] = useState(0);
  const [loading, setLoading] = useState(true); 

  const { addItem } = useContext(CartContext);

  const handleOnAdd = (quantity) => {
    setQuantityAdded(quantity);

    const item = {
      id,
      name,
      price,
      img,
      stock,
      description,
    };

    addItem(item, quantity);
  };

  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false); 
    }, 1000); 

    return () => clearTimeout(timeout); 
  }, []);

  if (loading) {
    return (
      <div className={`text-light ${styles.mensaje}`}>
        <h3 className={`${styles.h3} h3`}>Cargando el producto...</h3>
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Cargando..</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-6">
          <article className="card bg-dark text-white">
            <header className="card-header">
              <h2 className="card-title">{name}</h2>
            </header>
            <img
              src={`/assets/${img}`}
              alt={name}
              className="card-img-top img-fluid"
              style={{ maxWidth: '400px', maxHeight: '500px', margin: 'auto' }}
            />
            <div className="card-body">
              <p className="card-text">Descripción: {description}</p>
              <p className="card-text">Precio: {price}</p>
              <p className="card-text">Stock: {stock}</p>
            </div>
            <footer className="card-footer">
              {quantityAdded > 0 ? (
                <Link to="/cart" className="Option text-light font-weight-bold fs-4">
                  ¡Finalizar compra!
                </Link>
              ) : (
                <ItemCount initial={1} stock={stock} onAdd={handleOnAdd} />
              )}
            </footer>
          </article>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
