import { loadCategoryTodos } from "../../features/categorySlice";
import { useState, useEffect } from "react";
import { useDispatch, useSelector  } from "react-redux";
function CheckBoxCategory(){
    const todosCategory = useSelector((state) => state.categories.todos); //это уже 3! сколько вы хотите вызова к базе -да!
    const loadingCategory = useSelector((state) => state.categories.loading);
    const dispatch = useDispatch();
    useEffect(() => {
            dispatch(loadCategoryTodos());
        }, []);
return (

    <div className="flex-row float-start alert alert-dark">
        <h3>Сортировать</h3>
        <div className="mt-3">
        <select id="Sort" name="Sort"  className="form-select">
            <option value="Nothing">Отсутвует</option>
            <option value="SortDown">По Цене (Убывание)</option>
            <option value="SortUp">По Цене (По возрастанию)</option>
            <option value="SortA">От А до Я</option>
            <option value="SortZ">От Я до А</option>
        </select>

        </div>
        {todosCategory.map((todo) => (
            <div className="form-check mt-3" key={todo.id}>
            <input className="form-check-input" type="checkbox" value="" id={todo.id}/>
            <label className="form-check-label" htmlFor={todo.id}>
                {todo.title}
            </label>
        </div>
        ))}

    </div> 
);

}

export default CheckBoxCategory;