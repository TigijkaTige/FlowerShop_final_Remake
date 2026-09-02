import React ,{ useState, useEffect  } from 'react'
import { Modal, Button } from "react-bootstrap";

const  EditCategory = ( {showModal, hideModal, confirmModal, id, title} 
) => {
    const [titleEdit, setTitle] = useState(title ?? "");
    useEffect(() => { setTitle(title ?? ""); }, [title]);
    const handleAddTodo = (e) => {
        e.preventDefault();
    };
    return (
        <Modal show={showModal} onHide={hideModal}>
        <Modal.Header closeButton>
        <Modal.Title >Изменение Категории</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="alert alert-warning">{id} - {title}</div>
        <div className="row d-flex align-items-end">
                <div className="form-group col-12 ">
                    <label htmlFor="title" className="form-label">
                        Название:
                    </label>
                    <input
                        type="text"
                        id="title"
                        className="form-control"
                        value={titleEdit}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
        </div>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="default" onClick={hideModal}>
            Отмена
        </Button>
        <Button variant="warning" onClick={() => confirmModal(id, titleEdit)}>
            Изменить
        </Button>
        </Modal.Footer>
    </Modal>
    )
}
//По моей идеи при изменение открыветься сплываюшее окошко с полями как на форме (может даже совю форму открываем).. Думаю так должно быть легче.. но я не уверена...
export default EditCategory;