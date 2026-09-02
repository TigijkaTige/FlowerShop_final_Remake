import { useDispatch, useSelector } from "react-redux";
import { removeCategoryTodo, loadCategoryTodos, editCategoryTodo } from "../../../features/categorySlice";
import { useEffect, useState } from "react";
import DeleteConfirmation from "./DeleteConfirmation";
import EditCategory from "./EditCategory";

function CategoryList() {
    const dispatch = useDispatch(); //диспетчер для отправки действий по изменению состояний
    const todos = useSelector((state) => state.categories.todos); //получаем состояние для чтения
    const loading = useSelector((state) => state.categories.loading);
    const [id, setId] = useState(null);
    const [title, setTitle] = useState(null);
    const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
    const [displayConfirmationEditModal, setDisplayConfirmationEditModal] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState(null);
    //const [categoryMessage, setCategoryMessage] = useState(null);

    useEffect(() => {
        dispatch(loadCategoryTodos());
    }, []);
//     useEffect(() => {

// }, [dependencies]);
    
const showDeleteModal = (id) => {
    setId(id);
    setDeleteMessage(`вы уверены что хотите удалить категорию '${todos.find((x) => x.id === id).title}'?`);
    setDisplayConfirmationModal(true);
};
const showEditModal = (id, title) => {
    setId(id);
    setTitle(title);
    //setDeleteMessage(`вы уверены что хотите удалить категорию '${todos.find((x) => x.id === id).title}'?`);
    setDisplayConfirmationEditModal(true);
};

  // Hide the modal
const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
};
const hideConfirmationEditModal = () => {
    setDisplayConfirmationEditModal(false);
};

  // Handle the actual deletion of the item
    const submitDelete = (id) => {
        //setCategoryMessage(`категория '${todos.find((x) => x.id === id).title}' была успешно удалена.`);
        //Или там removeTodos(todo.id)?
        dispatch(removeCategoryTodo(id));
    setDisplayConfirmationModal(false);
};
    const submitEdit = (id, title) => {
        dispatch(editCategoryTodo({id, title: title}));
    setDisplayConfirmationEditModal(false);
};

    return (
        <>
            {loading ? (
                <div className="d-flex align-items-center">
                    <strong role="status">Загрузка категорий...</strong>
                    <div
                        className="spinner-border ms-auto"
                        aria-hidden="true"
                    ></div>
                </div>
            ) : (
                <div className="table-responsive my-4">
                    <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={submitDelete} hideModal={hideConfirmationModal}  id={id} message={deleteMessage}  />
                    <EditCategory  showModal={displayConfirmationEditModal} confirmModal={submitEdit} hideModal={hideConfirmationEditModal} id={id} title={title}/>
                    <table className="table table-hover table-striped align-middle">
                        <thead>
                            <tr className="table-dark">
                                <th>ID</th>
                                <th>Название</th>
                                <th className="text-center">Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todos.map((todo) => (
                                <tr
                                    key={todo.id}                           
                                >
                                    <td>{todo.id}</td>
                                    <td
                                    >
                                        {todo.title}
                                    </td>                               
                                    <td>
                                        <div className="d-flex align-items-center justify-content-center">
                                            <button
                                                className="btn btn-success btn-sm"
                                                onClick={() => showEditModal(todo.id, todo.title)
                                                    // dispatch(
                                                    //     editTodo(todo.id, todo.title)
                                                    // )
                                                }
                                                
                                            >
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </button>
                                            <button
                                                onClick={() =>showDeleteModal(todo.id)
                                                    // dispatch(                                                     
                                                    //     //removeTodo(todo.id)
                                                    // )
                                                }
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

export default CategoryList;
