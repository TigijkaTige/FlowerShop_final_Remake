import { useLocation, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { detailsProductTodo  } from "../../features/productSlice";
import { useDispatch, useSelector  } from "react-redux";
import { addCartTodo } from "../../features/cartSlice";

function AboutProduct() {
    let location = useLocation();
    const dispatch = useDispatch(); //диспетчер для отправки действий по изменению состояний
    const navigate = useNavigate();
    const todo = useSelector((state) => state.products.todo);
    const id = location.pathname.substring(15);

    const handleAddInCart = async (e) => {
        //try {
            dispatch(addCartTodo({productId:id, CountPr: 1}))
            navigate("/cart");
        // }
        // catch(e){
        //     navigate("/login");
        // }
    };
    useEffect(() => {
        dispatch(detailsProductTodo(id));
    }, []);


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-5">      
                <img className="mt-5 img-fluid" src={`http://localhost:5176/Products/Picture/${id}?x=500&y=500`} />
                </div>
                <div className="col-md-7 d-flex align-items-center">
                <div className="ms-5" >
                    <h1>{todo.title}</h1>
                <label className="fs-3">категория - {todo?.category?.title}</label>
                <h3 className="mt-5">{todo.cost} ₽</h3>
                <button className="btn btn-outline-success col-12 mt-3" type="submit" onClick={handleAddInCart} >Добавить в корзину</button>
                    </div>
            </div>
            </div>
            <div className="mt-3 ">
                <label className="form-label fs-5">{todo.description}</label>
            </div>

        </div>
    );
    
}

export default AboutProduct;
