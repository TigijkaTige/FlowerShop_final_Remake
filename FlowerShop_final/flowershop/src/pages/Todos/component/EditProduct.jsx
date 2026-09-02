import { useState, useEffect } from "react";
import { useDispatch, useSelector  } from "react-redux";
import { editProductTodo, detailsProductTodo  } from "../../../features/productSlice";
import { loadCategoryTodos } from "../../../features/categorySlice";
import { useLocation, useNavigate } from "react-router";
import UploadAndDisplayImage from "./Photo";

function EditProduct() {
    let location = useLocation()
    const todosCategory = useSelector((state) => state.categories.todos); //получаем состояние для чтения
    const loadingCategory = useSelector((state) => state.categories.loading);
    const todo = useSelector((state) => state.products.todo);
    const dispatch = useDispatch(); //диспетчер для отправки действий по изменению состояний
    const id = location.pathname.substring(21);
    const [title, setTitle] = useState("");
    const [cost, setCost] = useState("");
    const [description, setDes] = useState( "");
    const [categoryId, setCategory] = useState("");
    const [picture, setPicture] = useState(null);

    const navigate = useNavigate();


    const handleAddTodo = async (e) => {
        e.preventDefault();
        //console.log(imagePath)
        await dispatch(editProductTodo({id, title, cost, description, categoryId, picture }));
        //dispatch(loadProductTodos());
        navigate("/product");

    };
    useEffect(() => {
        dispatch(detailsProductTodo(id));
        dispatch(loadCategoryTodos());
    }, []);

    useEffect(() => 
        { setTitle(todo.title ?? ""); 
            setCost(todo.cost ?? ""); 
            setDes(todo.description?? ""); 
            setCategory(todo.categoryId ?? ""); 
        }, 
    [todo.title, todo.cost, todo.description, todo.categoryId]);

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
                <div className="form-group col-12 col-md-3">
                    <label htmlFor="image" className="form-label">
                        Нынешняя картинка:
                    </label>
                    <img src={`http://localhost:5176/Products/Picture/${id}?x=200&y=200`} alt={todo.title} />
                </div>
                <div  className="row d-flex align-items-end ">
                    <UploadAndDisplayImage selectedImage={picture} onChange={setPicture}/>
                </div>
                <div>
                <button
                type="button"
                    className="btn btn-outline-dark col-3 mt-3 me-3"
                    onClick={() => navigate("/product")
                    }
                >
                    Отмена
                </button>
                <button
                    type="submit"
                    className="btn btn-outline-success col-8 mt-3 "
                >
                    Сохранить
                </button>
                </div>
            </div>
        </form>
    );
}

export default EditProduct;
