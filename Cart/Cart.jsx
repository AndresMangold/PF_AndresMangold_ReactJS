// import { useContext } from "react";
// import { CartContext } from '../../context/CartContext';
// import CartItem from '../CartItem/CartItem';
// import { Link } from 'react-router-dom';

// const Cart = () => {
//   const { cart, clearCart, totalQuantity, total } = useContext(CartContext);

//   if (totalQuantity === 0) {
//     return (
//       <div className="container mt-5">
//         <h1>No hay items en el carrito</h1>
//         <Link to='/' className='btn btn-primary mt-3'>Productos</Link>
//       </div>
//     );
//   }

//   return (
//     <div className="container mt-5">
//       <div className="card">
//         <div className="card-body">
//           <h3 className="card-title">Carrito de Compras</h3>
//           <ul className="list-group">
//             {cart.map(p => <CartItem key={p.id} {...p} />)}
//           </ul>
//           <div className="d-flex justify-content-between align-items-center mt-3">
//             <h5>Total: ${total}</h5>
//             <button onClick={() => clearCart()} className='btn btn-danger'>Limpiar Carrito</button>
//           </div>
//           <div className="mt-3">
//             <Link to='/checkout' className='btn btn-success'>CheckOut</Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;
