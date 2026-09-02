import React from 'react'
import { Modal, Button } from "react-bootstrap";

const DeleteConfirmation = ({ showModal, hideModal, confirmModal, id, message }) => {
    return (
        <Modal show={showModal} onHide={hideModal}>
        <Modal.Header closeButton>
        <Modal.Title>Подвердить удаление</Modal.Title>
        </Modal.Header>
        <Modal.Body><div className="alert alert-danger">{message}</div></Modal.Body>
        <Modal.Footer>
        <Button variant="default" onClick={hideModal}>
            Отмена
        </Button>
        <Button variant="danger" onClick={() => confirmModal(id) }>
            Удалить
        </Button>
        </Modal.Footer>
    </Modal>
    )
}

export default DeleteConfirmation;