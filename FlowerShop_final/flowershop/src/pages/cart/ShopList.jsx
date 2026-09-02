import CartItem from "./CartItem";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCartTodos } from "../../features/cartSlice";

function ShopList() {
    const navigate = useNavigate();
    const dispatch = useDispatch(); //диспетчер для отправки действий по изменению состояний
    const items = useSelector((state) => state.carts.todos); //получаем состояние для чтения
    const loading = useSelector((state) => state.carts.loading);
    const summa =  useSelector((state) => state.carts.summa);
    useEffect(() => {
        dispatch(loadCartTodos());
    }, [dispatch]);

    return (
        <>
            {loading ? (
                <div className="d-flex align-items-center">
                    <strong role="status">Загрузка содержимого корзины...</strong>
                    <div
                        className="spinner-border ms-auto"
                        aria-hidden="true"
                    ></div>
                </div>
            ) : (
                <div className="container my-3">
                    {items && items.length > 0  ?
                        <>
                            <div className="my-3">
                                {items.map((item) => (
                                    <CartItem
                                    key={item.id}
                                    id={item.product.id}
                                    title={item.product.title}
                                    cost={item.product.cost}
                                    countint={item.countPr}
                                    />                               
                                ))}
                            </div>
                            <div >
                                <h3 className="mb-4">Сумма: {summa} руб.</h3>
                                <button className="btn btn-outline-success col-12 mt-3" type="button"
                                    onClick={() => navigate("/order/info")}
                                >Перейти к офоромлению заказа</button>
                            </div>
                        </>
                        :
                        <>
                            <h1>Корзина Пустая</h1>
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

export default ShopList;
