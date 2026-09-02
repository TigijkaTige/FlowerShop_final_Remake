import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadOrderAdminTodos } from "../../features/orderSlice";
import AdminOrders from "./AdminOrders";
//import { useNavigate } from "react-router";

function OrderCurrentList() {
    const dispatch = useDispatch(); //диспетчер для отправки действий по изменению состояний
    const orders = useSelector((state) => state.orders.current); //получаем состояние для чтения
    const loading = useSelector((state) => state.orders.loading);
    //const navigate = useNavigate();


    useEffect(() => {
        dispatch(loadOrderAdminTodos());
    }, [dispatch]);

    return (
        <>
            {loading ? (
                <div className="d-flex align-items-center">
                    <strong role="status">Загрузка текущих заказов...</strong>
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
                                    <AdminOrders
                                    key={order.id}
                                    id ={order.id}
                                    email={order.user.email}
                                    phone={order.user.phoneNumber}
                                    orderDate={order.orderDate}
                                    deliverDate={order.deliverDate}
                                    address ={order.address}
                                    delivered ={order.delivered}
                                    summa={order.summa}
                                    />                               
                                ))}
                            </div>
                        </>
                        :
                        <>
                            <h1>Текущих заказов - Нет</h1>
                        </>}
                </div>
        )}
        </>
    );
}

export default OrderCurrentList;
