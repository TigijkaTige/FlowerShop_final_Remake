import { useState, useEffect } from "react";
import { useDispatch, useSelector  } from "react-redux";
import { addProductTodo, loadProductTodos } from "../../../features/productSlice";
import { loadCategoryTodos } from "../../../features/categorySlice";
import UploadAndDisplayImage from "./Photo";

function ProductForm() {
    const todosCategory = useSelector((state) => state.categories.todos); //получаем состояние для чтения
    const loadingCategory = useSelector((state) => state.categories.loading);
    const dispatch = useDispatch(); //диспетчер для отправки действий по изменению состояний
    const [title, setTitle] = useState("");
    const [cost, setCost] = useState("");
    const [description, setDes] = useState("");
    const [categoryId, setCategory] = useState("");
    const [picture, setPicture] = useState(null);

    const handleAddTodo = async (e) => {
        e.preventDefault();
        await dispatch(addProductTodo({ title, cost, description, categoryId, picture }));
        dispatch(loadProductTodos());
        setTitle("");//стираем значения после добавления
        setCost("");
        setDes("");
        setPicture(null);
    };
    useEffect(() => {
        dispatch(loadCategoryTodos());
    }, []);
//чтобы первое в выпадающем списке был не 0
    useEffect(() => {
            if (!categoryId && todosCategory.length > 0) {
                setCategory(String(todosCategory[0].id));
            }
        }, [todosCategory, categoryId]);
    

    return (
    <form className="my-4" onSubmit={handleAddTodo}>
            <div className="row d-flex align-items-end">
                <div className="form-group ">
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
                <div  className="row d-flex align-items-end">
                    <div>
                        <label htmlFor="description" className="form-label">
                        Описание
                    </label>
                    <input
                        type="text"
                        id="description"
                        className="form-control"
                        value={description}
                        onChange={(e) => setDes(e.target.value)}/>
                    </div>
                </div>
                <div  className="form-group col-12 col-md-3">
                    <div>
                        <label htmlFor="cost" className="form-label">
                        Стоимость
                    </label>
                    <input
                        type="number"
                        id="cost"
                        className="form-control"
                        value={cost}
                        onChange={(e) => setCost(e.target.value)}/>
                    </div>
                </div>
                <div className="form-group col-12 col-md-3">
                    <label htmlFor="category" className="form-label">
                        Категория:
                    </label>
                    <select
                        id="category"
                        className="form-select"
                        value={categoryId}
                        onChange={(e) => setCategory(e.target.value)
                        }
                    >
                        {todosCategory.map((todo) => (
                            <option key={todo.id}  value={todo.id} >{todo.title}</option>
                        ))}
                    </select>
                </div>
                <div  className="row d-flex align-items-end">
                    <UploadAndDisplayImage selectedImage={picture} onChange={setPicture}/>
                </div>
                <button
                    type="submit"
                    className="btn btn-outline-success col-12 mt-3"
                >
                    Сохранить
                </button>
            </div>
        </form>
    );
}

export default ProductForm;
