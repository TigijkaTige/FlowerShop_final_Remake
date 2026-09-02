import ShopCard from "./ShopCard";
import { useState, useEffect } from "react";
import { useDispatch, useSelector  } from "react-redux";
import { loadProductTodos } from "../../features/productSlice";

function CardCollection() {
    const dispatch = useDispatch(); //диспетчер для отправки действий по изменению состояний
    const products = useSelector((state) => state.products.todos); //получаем состояние для чтения
    const loading = useSelector((state) => state.products.loading);
        useEffect(() => {
        dispatch(loadProductTodos());
    }, []);
    return (
    <>
        {loading ? (
                <div className="d-flex align-items-center">
                    <strong role="status">Загрузка товаров...</strong>
                    <div
                        className="spinner-border ms-auto"
                        aria-hidden="true"
                    ></div>
                </div>
            ) : (
    
        <div className="row row-cols-1 row-cols-md-3">
            {products.map((product) => (
                <ShopCard
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    cost={product.cost}
                />
            ))}
        </div>
            )}
    </>
    );
}
//может и не нужна
export default CardCollection;