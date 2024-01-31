import React, { useContext } from 'react';
import cart from './assets/ShoppingCart.png';
import styles from './CartWidget.module.css';
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const CartWidget = () => {
  const { totalQuantity } = useContext(CartContext);

  return (
    <Link to='/cart' className={`${styles['cart-widget-container']} ${totalQuantity > 0 ? styles['cart-widget-visible'] : ''}`}>
      <div>
        <img src={cart} alt="cart-widget" className={styles['cart-image']} />
      </div>
      <div className={styles['text-container']}>
        <span>Productos</span>
        <div>{totalQuantity}</div>
      </div>
    </Link>
  );
};

export default CartWidget;
