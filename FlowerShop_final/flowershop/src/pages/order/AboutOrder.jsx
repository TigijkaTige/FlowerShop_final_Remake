import { detailsOrderTodo } from "../../features/orderSlice";
import { useLocation, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
function AboutOrders() {
    let location = useLocation();
    const dispatch = useDispatch(); //диспетчер для отправки действий по изменению состояний
    const navigate = useNavigate();
    const todo = useSelector((state) => state.orders.todo);
    const id = location.pathname.substring(13);

    useEffect(() => {
        dispatch(detailsOrderTodo(id));
    }, []);
    return (
        <div className="row my-3">
            <div className="row mb-3" >
                <div className="m-3">
                    <h1>Id: {todo.id}</h1>
                    <p className="card-title fs-3"> Адрес: {todo.address}</p>
                </div>
                {todo.items?.map((item) => (
                    <div className="card-body mb-3" key={item.id}>
                        <img className="float-start img-fluid col-2 me-3" src={`http://localhost:5176/Products/Picture/${item.product.id}?x=300&y=300`} />
                        <h3 className="card-title"> {item.product.title}</h3>
                        <span className="card-title "> {item.product.cost} руб.</span>
                        <p className="card-title"> {item.countPr} штук(а\и)</p>
                    </div>))}
                <h1 className="m-3"> {todo.summa} руб.</h1>

                <div className="mb-4">
                    <button className="btn btn-outline-dark col-3 col-5 mt-3" type="submit" onClick={() => navigate("/order/all/current")}>Назад</button>
                </div>

            </div>
        </div>
    );
}

export default AboutOrders;