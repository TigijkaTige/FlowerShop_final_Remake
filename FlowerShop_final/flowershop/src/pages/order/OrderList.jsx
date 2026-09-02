import { loadOrderTodos } from "../../features/orderSlice";
import OrderItem from "./OrderItem";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";



function OrderList() {
    const dispatch = useDispatch(); //диспетчер для отправки действий по изменению состояний
    const orders = useSelector((state) => state.orders.todos); //получаем состояние для чтения
    const loading = useSelector((state) => state.orders.loading);
    const navigate = useNavigate();


    useEffect(() => {
        dispatch(loadOrderTodos());
    }, [dispatch]);

    return (
        <>
            {loading ? (
                <div className="d-flex align-items-center">
                    <strong role="status">Загрузка ваших заказов...</strong>
                    <div
                        className="spinner-border ms-auto"
                        aria-hidden="true"
                    ></div>
                </div>
            ) : (
        <div className="container my-3">
            {orders && orders.length > 0  ?
                        <>
                            <div className="my-3">
                                {orders.map((order) => (
                                    <OrderItem
                                    key={order.id}
                                    orderDate={order.orderDate}
                                    deliverDate={order.deliverDate}
                                    address ={order.address}
                                    delivered ={order.delivered}
                                    summa={order.summa}
                                    items={order.items}

                                    />                               
                                ))}
                            </div>
                        </>
                        :
                        <>
                            <h1>Заказов ещё Нет</h1>
                        <button
                        type="button"
                        className="btn card"
                        onClick={() => navigate("/catalog")}>
                        Выберите что-то из каталога товаров
                    </button>
                        </>}
                </div>
        )}
        </>
    );
}

export default OrderList;
