import React, { useState, useEffect, useRef } from 'react';
import './Payment.scss'
import axios from 'axios';
import { useParams } from 'react-router';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
    const paypal = useRef();
    const navigate = useNavigate();
    const { id } = useParams();
    const [tourBooked, setTourBooked] = useState([]);
    const [user, setUser] = useState([]);
    const [paypalRendered, setPayPalRendered] = useState(false);
    const [tourDataLoaded, setTourDataLoaded] = useState(false);
    const [order, setOrder] = useState(null);
    const token = localStorage.getItem('token');
    const quantity = localStorage.getItem('numberPeople')

    useEffect(() => {
        // Rest API Tour booked 
        axios.get(`http://localhost:8080/api/tour/${id}`)
            .then((response) => {
                const tour = response.data.tour.tour;
                setTourBooked(tour);
                setTourDataLoaded(true);
            })
            .catch(error => console.log(error.message));
    }, [id]);

    useEffect(() => {
        if (tourDataLoaded && !paypalRendered) {
            window.paypal
                .Buttons({
                    createOrder: (data, actions, err) => {
                        return actions.order.create({
                            intent: "CAPTURE",
                            purchase_units: [
                                {
                                    amount: {
                                        description: tourBooked.tour_name,
                                        currency_code: "CAD",
                                        value: (quantity * tourBooked.tour_price) * 30 / 100
                                    },
                                },
                            ],
                        });
                    },
                    onApprove: async (data, actions) => {
                        const order = await actions.order.capture();
                        setOrder(order);
                    },
                    onError: (err) => {
                        console.log(err);
                    },
                })
                .render(paypal.current);
            setPayPalRendered(true);
        }
    }, [tourDataLoaded, paypalRendered, tourBooked]);

    let userId = null;
    if (token) {
        const decodedToken = jwtDecode(token);
        userId = decodedToken?.user_id;
    } else {
        navigate('/login');
    }

    useEffect(() => {
        if (order && order.status === 'COMPLETED') {
            toast.success('Payment successful ~ Wishing you a memorable experience');
            axios.put(`http://localhost:8080/api/booking/pay/${id}`, {
                "user_id": userId,
                "tour_id": tourBooked?._id
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => {
                    const pay = response.data;
                })
                .catch(error => console.log(error.message));
            navigate('/');
        } else if (order && order.status !== 'COMPLETED') {
            toast.error('Payment failed');
        }
    }, [order]);

    return (
        <>
            <div className='payment-container'>
                <div className='paypal' ref={paypal}></div>
                <button onClick={() => navigate(-1)}>Are you not ready to pay?</button>
            </div>
        </>
    );
};

export default Payment;
