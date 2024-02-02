import ItemCount from '../ItemCount/ItemCount';
import{ useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/CartContext';


const ItemDetail = ({ id, name, img, description, price, stock }) => {
  
  const [quantityAdded, setQuantityAdded] = useState(0)

  const { addItem } = useContext(CartContext)

  const handleOnAdd = (quantity) => {
    setQuantityAdded(quantity);
  
    const item = {
      id, name, price
    };
  
    addItem(item, quantity);
  };
  
  
  return (
    <div className='container mt-5'>
      <div className='row justify-content-center'>
        <div className='col-12 col-lg-6'>
          <article className='card bg-dark text-white'>
            <header className='card-header'>
              <h2 className='card-title'>{name}</h2>
            </header>
            <img
              src={`/assets/${img}`}
              alt={name}
              className='card-img-top img-fluid'
              style={{ maxWidth: '400px', maxHeight: '500px', margin: 'auto' }}
            />
            <div className='card-body'>
              <p className='card-text'>Descripción: {description}</p>
              <p className='card-text'>Precio: {price}</p>
              <p className='card-text'>Stock: {stock}</p>
            </div>
            <footer className='card-footer'>
              {
                quantityAdded > 0 ? (
                  <Link to='/cart' className='Option text-light font-weight-bold fs-4'>¡Finalizar compra!</Link>
                ) : (
                  <ItemCount initial={1} stock={stock} onAdd={handleOnAdd} />
                )
              }
            </footer>
          </article>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
