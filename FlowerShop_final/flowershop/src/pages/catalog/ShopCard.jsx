import { Link } from "react-router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCartTodo } from "../../features/cartSlice";

function ShopCard({ id, title, cost }) {
    const [showButton, setShowButton] = useState(true);
    const [count, setCount] = useState(1);
    const dispatch = useDispatch(); 
    const handleClick = () => {
        dispatch(addCartTodo({productId: id, CountPr: 1}))
        setShowButton(!showButton);
    };

    return (
        <div className="col mb-3 ">
            <div className="card border text-decoration-none h-100">
                <div className="card-header"></div>
                <img className="d-block mx-auto img-fluid col-10 mt-3" src={`http://localhost:5176/Products/Picture/${id}?x=400&y=400`} />
                <Link className="card-body text-decoration-none" to={`/catalog/about/${id}`}>
                    <h3 className="card-title"> {title}</h3>
                    <span className="card-title"> {cost} руб.</span>
                </Link>
                <div className="card-footer border-0 bg-transparent mb-2 text-center">
                    {showButton ?
                        <button className="btn btn-outline-success col-12" onClick={handleClick} type="submit" >Добавить в корзину</button>
                        :
                        <>
                            <button className="btn btn-outline-danger col-5" type="submit"
                                onClick={ () => dispatch(addCartTodo({productId:id, CountPr: -1}))}>-</button>
                            <span className="card-title ps-3 pe-3">{count}</span>
                            <button className="btn btn-outline-success col-5" type="submit"
                                onClick={ () => dispatch(addCartTodo({productId:id, CountPr: 1}))}>+</button>
                        </>
                    }
                </div>

            </div>
        </div>
    );
}

export default ShopCard;
