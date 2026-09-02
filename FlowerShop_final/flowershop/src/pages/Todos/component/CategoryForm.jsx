import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCategoryTodo } from "../../../features/categorySlice";

function CategoryForm() {
    const [title, setTitle] = useState("");

    const dispatch = useDispatch(); //диспетчер для отправки действий по изменению состояний

    const handleAddTodo = (e) => {
        e.preventDefault();
        dispatch(addCategoryTodo({ title }));
        setTitle("");
    };


    return (
    <form className="my-4" onSubmit={handleAddTodo}>
            <div className="row d-flex align-items-end">
                <div className="form-group col-12 ">
                    <label htmlFor="title" className="form-label">
                        Название:
                    </label>
                    <input
                        type="text"
                        id="title"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-outline-success col-12 mt-3"
                >
                    Добавить
                </button>
            </div>
        </form>
    );
}

export default CategoryForm;