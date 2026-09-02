import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCartTodo} from "../../features/cartSlice";
import DeleteConfirmation from "../Todos/component/DeleteConfirmation";
function CartItem({ id, title, cost, countint }) {
    const [count, setCount] = useState(countint);
    const dispatch = useDispatch(); 
    useEffect(() => {
        setCount(countint);
    }, [countint]);
    const handleCountChange = (change) => {
        const newCount = count + change;
        if (newCount < 0) return; // предотвращаем отрицательное значение
        
        // Оптимистичное обновление UI
        setCount(newCount);
        
        // Отправляем запрос на сервер через addCartTodo
        dispatch(addCartTodo({ 
            productId: id, 
            CountPr: change 
        }));
    };



    return (
<div className="row my-3">
        <div className="card border mb-3 " >
        <div className="card-body ">
                <img className="float-start img-fluid col-2 me-3" src={`http://localhost:5176/Products/Picture/${id}?x=300&y=300`} />
            <h3 className="card-title"> {title} </h3>
            <span className="card-title "> {cost} руб.</span>
        <div className="text-end">
            <button className="btn btn-outline-danger col-1" type="submit" 
            onClick={() => handleCountChange(-1)}
            disabled={count <= 0}>-</button>
            <span className="card-title ps-3 pe-3">{count}</span>
            <button className="btn btn-outline-success col-1 " type="submit" 
            onClick={() => handleCountChange(1)}>+</button>
        </div>
    </div>
</div>
</div>
    );
}

export default CartItem;
