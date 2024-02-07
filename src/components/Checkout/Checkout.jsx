import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { Form, Button } from 'react-bootstrap';
import { useNotification } from "../../notification/NotificationService";
import { addDoc, collection, writeBatch, getDocs, query, where, documentId } from "firebase/firestore";
import { db } from "../../services/firebase/firebaseConfig";

const Checkout = () => {
    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [buyerInfo, setBuyerInfo] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const { cart, total, clearCart } = useCart();
    const { showNotification } = useNotification();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBuyerInfo({
            ...buyerInfo,
            [name]: value
        });
    }

    const createOrderHandler = async () => {
        setLoading(true);
        try {
            const batch = writeBatch(db);
            const outOfStock = [];

            const objOrder = {
                buyer: {
                    name: buyerInfo.name,
                    email: buyerInfo.email,
                    phone: buyerInfo.phone
                },
                items: cart,
                total
            };

            const emailPattern = /\S+@\S+\.\S+/;
            if (!emailPattern.test(buyerInfo.email)) {
                showNotification('error', 'Ingrese un correo electrónico válido');
                setLoading(false);
                return;
            }

            const phonePattern = /^[0-9]+$/;
            if (!phonePattern.test(buyerInfo.phone)) {
                showNotification('error', 'Ingrese un número de teléfono válido (solo números)');
                setLoading(false);
                return;
            }

            const ids = cart.map(prod => prod.id);
            const productsCollection = query(collection(db, 'products'), where(documentId(), 'in', ids));

            const querySnapshot = await getDocs(productsCollection);
            const { docs } = querySnapshot;

            docs.forEach(doc => {
                const fields = doc.data();
                const stockDb = fields.stock;

                const productsAddedToCart = cart.find(prod => prod.id === doc.id);
                const prodQuantity = productsAddedToCart.quantity;

                if (stockDb >= prodQuantity) {
                    batch.update(doc.ref, { stock: stockDb - prodQuantity });
                } else {
                    outOfStock.push({ id: doc.id, ...fields });
                }
            });

            if (outOfStock.length === 0) {
                await batch.commit();

                const orderCollection = collection(db, 'orders');
                const docRef = await addDoc(orderCollection, objOrder);

                setOrderId(docRef.id);
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
        return <h1 className="text-light fw-bold text-center mt-5 p-3 bg-secondary border rounded">Se está generando su orden, espere por favor...</h1>
    }

    if (orderId) {
        return <h1 className="text-light fw-bold text-center mt-5 p-3 bg-secondary border rounded">El id de su compra es: {orderId}</h1>
    }

    return (
        <div className="text-center">
            <h1 className="text-light">Checkout</h1>
            <Form className="mx-auto w-25 mt-4">
                <Form.Group controlId="formName">
                    <Form.Label className="text-light">Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese su nombre"
                        name="name"
                        value={buyerInfo.name}
                        onChange={handleInputChange}
                        pattern="[A-Za-z\s]+"
                        title="Ingrese un nombre válido sin caracteres especiales"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formEmail" className="mt-3">
                    <Form.Label className="text-light">Email</Form.Label>
                    <Form.Control type="email" placeholder="Ingrese su email" name="email" value={buyerInfo.email} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group controlId="formPhone" className="mt-3">
                    <Form.Label className="text-light">Teléfono</Form.Label>
                    <Form.Control type="tel" placeholder="Ingrese su teléfono" name="phone" value={buyerInfo.phone} onChange={handleInputChange} />
                </Form.Group>

                <Button variant="dark" onClick={createOrderHandler} className="mt-3">
                    Generar orden
                </Button>
            </Form>
        </div>
    );
}

export default Checkout;
