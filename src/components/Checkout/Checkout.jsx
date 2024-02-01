import { useState } from "react";
import { collection, getDocs, where, query, documentId, writeBatch, addDoc } from "firebase/firestore";
import { useCart } from "../../context/CartContext";
// import OrderForm from '../OrderForm/OrderForm';
import { db } from "../../services/firebase/firebaseConfig";
import { Form, Button } from 'react-bootstrap';

const Checkout = () => {
    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [buyerInfo, setBuyerInfo] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const { cart, total, clearCart } = useCart();
    const [outOfStock, setOutOfStock] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBuyerInfo({
            ...buyerInfo,
            [name]: value
        });
    }

    const createOrder = async () => {
        setLoading(true);
        try {
            const objOrder = {
                buyer: { 
                    name: buyerInfo.name,
                    email: buyerInfo.email,
                    phone: buyerInfo.phone
                },
                userData,
                items: cart,
                total 
            }


            if (outOfStock.length === 0) {
                batch.commit();

                const orderCollection = collection(db, 'orders');
                const { id } = await addDoc(orderCollection, objOrder);
                
                setOrderId(id);

                clearCart();
            } else {
              
                showNotification('error', 'Hay productos que no tienen stock disponible');
            }
        } catch (error) {
            
            showNotification('error', 'Hubo un error al crear la orden');
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <h1>Se está generando su orden, espere por favor...</h1>
    }

    if (orderId) {
        return <h1>El id de su compra es: {orderId}</h1>
    }

    return (
        <div className="text-center"> 
            <h1>Checkout</h1>
            <Form className="mx-auto w-25 mt-4"> 
                <Form.Group controlId="formName">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese su nombre" name="name" value={buyerInfo.name} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group controlId="formEmail" className="mt-3"> 
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Ingrese su email" name="email" value={buyerInfo.email} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group controlId="formPhone" className="mt-3"> 
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control type="tel" placeholder="Ingrese su teléfono" name="phone" value={buyerInfo.phone} onChange={handleInputChange} />
                </Form.Group>

                <Button variant="dark" onClick={createOrder} className="mt-3"> 
                    Generar orden
                </Button>
            </Form>
        </div>
    );
}

export default Checkout;
