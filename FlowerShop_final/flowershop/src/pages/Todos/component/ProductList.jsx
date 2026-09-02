import { useDispatch, useSelector } from "react-redux";
import { removeProductTodo, loadProductTodos } from "../../../features/productSlice";
import { useEffect, useState} from "react";
import DeleteConfirmation from "./DeleteConfirmation";
import { Link, useNavigate } from "react-router";


function ProductList() {
    const dispatch = useDispatch(); //диспетчер для отправки действий по изменению состояний
    const todos = useSelector((state) => state.products.todos); //получаем состояние для чтения
    const loading = useSelector((state) => state.products.loading);
    const [id, setId] = useState(null);
    const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState(null);
        const navigate = useNavigate();

    useEffect(() => {
        dispatch(loadProductTodos());
    }, []);

    const showDeleteModal = (id) => {
    setId(id);
    setDeleteMessage(`вы уверены что хотите удалить продукт '${todos.find((x) => x.id === id).title}'?`);
    setDisplayConfirmationModal(true);
};


  // Hide the modal
const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
};

    const submitDelete = (id) => {
        dispatch(removeProductTodo(id));
    setDisplayConfirmationModal(false);
};

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
                <div className="table-responsive my-4">
                    <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={submitDelete} hideModal={hideConfirmationModal}  id={id} message={deleteMessage} />
                    <table className="table table-hover table-striped align-middle">
                        <thead>
                            <tr className="table-dark">
                                <th>ID</th>
                                <th>Название</th>
                                <th>Описание</th>
                                <th>Стоимость</th>
                                <th>Категория</th>
                                <th>Изображение</th>
                                <th className="text-center">Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todos.map((todo) => (
                                <tr
                                    key={todo.id}
                                >
                                    <td>{todo.id}</td>
                                    <td>{todo.title}</td>
                                    <td>{todo.description}</td>
                                    <td>{todo.cost} ₽</td>
                                    <td>{todo.category.title}</td>
                                    <td> <img src={`http://localhost:5176/Products/Picture/${todo.id}?x=300&y=300`} alt={todo.title} /></td>
                                    <td>
                                        <div className="d-flex align-items-center justify-content-center">
                                            <Link
                                            to = {`/product/editProduct/${todo.id}`} 
                                                className="btn btn-success btn-sm"                                                                         
                                            >
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </Link>
                                            <button
                                                onClick={() =>showDeleteModal(todo.id)}                                                   
                                                className="btn btn-danger btn-sm ms-3"
                                            >
                                                <i className="fa-sharp fa-solid fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}

export default ProductList;
