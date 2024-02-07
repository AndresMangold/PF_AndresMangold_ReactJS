import { useState } from 'react';
import Swal from 'sweetalert2';
import './ItemCount.module.css';


const ItemCount = ({ stock, initial, onAdd }) => {
    const [quantity, setQuantity] = useState(initial);

    const increment = () => {
        if (quantity < stock) {
            setQuantity(quantity + 1);
        }
    };

    const decrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleAddToCart = () => {
        if (quantity > 0) {
            Swal.fire({
                icon: 'success',
                title: 'Producto agregado al carrito',
                text: `Se agregaron ${quantity} producto(s) al carrito.`,
                confirmButtonText: 'OK',
            });
            onAdd(quantity);
        } else {
            Swal.fire({
                icon: 'info',
                title: 'Cantidad no válida',
                text: 'Seleccione al menos una unidad para agregar al carrito.',
                confirmButtonText: 'OK',
            });
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center text-center mb-3">
                <div className='col-1'>
                    <button className='btn btn-dark w-100 fs-5' onClick={decrement}>-</button>
                </div>
                <div className='col-1'>
                    <h4 className='Number'>{quantity}</h4>
                </div>
                <div className='col-1'>
                    <button className='btn btn-dark w-100 fs-5' onClick={increment}>+</button>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className='col-3 text-center'>
                    <button className='btn btn-dark w-100' onClick={handleAddToCart} disabled={!stock}>
                        Agregar al carrito
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ItemCount;
