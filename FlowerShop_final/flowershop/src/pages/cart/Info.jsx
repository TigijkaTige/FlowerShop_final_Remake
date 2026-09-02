import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addOrderTodo } from '../../features/orderSlice';
function OrderInfo() {
    const [address, setAdress] = useState("");
        const dispatch = useDispatch();
    // const [orderDate, setOrder] = useState(new Date());
    const [deliverDate, setDeliver] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); //хук для редиректа

    const handleOrder = async (e) => {
        //очистка предыдущих сообщений
        setError("");
        e.preventDefault();
        if (address != "" && deliverDate != null)//Давайте без проверки правильно ли почту\пароль\ник написали, а то он через раз работает
        {
            await dispatch(addOrderTodo({ deliverDate, address }));
            setMessage("Заказ создан!");//не знаю не работает
            setAdress("");
            
        }
        else {

            setError("Заполните все поля!")

        }
    };

    useEffect(() => {
        //проверяем, что сообщение не пустое
        if (message) {
            const timer = setTimeout(() => {
                setMessage("Ваш заказ обрабатывается");
                navigate("/order");

                //очистка таймера при размонтировании
                return () => clearTimeout(timer);
            }, 2000);
        }
    }, [message, navigate]);

    return (
        <>
        <form className="my-4"  onSubmit={handleOrder}>
            <div className="row d-flex align-items-end">
                <div className="form-group col-12 ">
                    <label htmlFor="adress" className="form-label">
                        Адрес (Город, улица, Дом):
                    </label>
                    <input
                        type="text"
                        id="adress"
                        className="form-control"
                        value={address}
                        onChange={(e) => setAdress(e.target.value)}
                    />
                </div>
                <div className="form-group col-12 ">
                    <label htmlFor="deliverDate" className="form-label">
                        Доставить к:
                    </label>
                    <input
                        type="datetime-local"
                        id="deliverDate"
                        className="form-control"
                        value={deliverDate}
                        onChange={(e) => setDeliver(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-outline-success col-12 mt-3"

                >
                    Купить
                </button>
                <h3 className="mt-4">В дальнейшем работник магазина с вами созванится для уточнения заказа, адреса, способа оплаты. Далее будет вам отправлен Курьер</h3>
            </div>
        </form>
         {/* выводим сообщения от сервера, когда они запишутся */}
            {message && (
                <div className="alert alert-success mt-4" role="alert">
                    {message}
                </div>
            )}
            {error && (
                <div className="alert alert-danger mt-4" role="alert">
                    {error}
                </div>
            )}
        </>
    );
}

export default OrderInfo;