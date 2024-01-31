import { Link } from 'react-router-dom';
import styles from './Item.module.css';

const Item = ({ id, name, img, price, stock }) => {
  return (
    <div className={`col col-12 col-md-4 mb-5 text-center p-3 ${styles.customCol}`}>
      <article className='card bg-dark text-white'>
        <header className='card-header'>
          <h2 className='card-title'>{name}</h2>
        </header>
        <picture>
          <img src={`/assets/${img}`} alt={name} className='card-img-top img-fluid' style={{ maxWidth: '300px', maxHeight: '400px' }} />
        </picture>
        <section className='card-body'>
          <p className='card-text'>Precio: ${price}</p>
          <p className='card-text'>Stock: {stock}</p>
        </section>
        <footer className='card-footer'>
          <Link to={`/item/${id}`} className='btn btn-dark'>
            Ver detalle
          </Link>
        </footer>
      </article>
    </div>
  );
};

export default Item;
