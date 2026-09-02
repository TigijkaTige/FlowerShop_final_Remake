import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelOrderTodo, confirmOrderTodo } from "../../features/orderSlice";
import { Link } from "react-router";
function AdminOrders({ id, email, phone, orderDate, deliverDate, address, delivered, summa }) {
    const dispatch = useDispatch();
    return (
        <div className="row my-3">
            <div className="card border mb-3 " >
                <div className="m-3" >
                    <Link className="card-title fs-2" to={`/order/about/${id}`}>Id: {id}</Link>
                    <h2 className="card-title">Почта: {email} &ensp; Номер телефона: {phone}</h2>
                    {!delivered ?
                        <h2 className="card-title">Заказ от {orderDate} &ensp; Доставить {deliverDate}</h2> :
                        <h2 className="card-title text-success">Доставлен {deliverDate}</h2>
                    }
                    <h3 className="card-title">Адрес: {address}</h3>
                </div>
                <h1 className="m-3"> {summa} руб.</h1>
                {!delivered ?
                    <div className="mb-4">
                        <button className="btn btn-outline-danger col-3 mt-3 m-3" type="submit"
                            onClick={() =>
                                dispatch(
                                    cancelOrderTodo(id)
                                )
                            }
                        >Отменить заказ</button>
                        <button className="btn btn-outline-success col-3 mt-3 m-3" type="submit" 
                        onClick={() =>
                                dispatch(
                                    confirmOrderTodo(id)
                                )
                            }
                        >Подвердить получение</button>
                    </div>
                    : <></>}
            </div>
        </div>
    );
}

export default AdminOrders;
