import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from '@/states/users/usersSlice';
import { deleteUser, getUsers } from '@/states/users/handleRequests';

const DeleteModal = ({ id }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch()
    const { loading, currentPage, users } = useSelector((state) => state.users);

    const handleDelete = () => {
        dispatch(deleteUser({ userId: id })).unwrap().then(
            () => {
                handleClose();
                if (users.length === 1 && currentPage > 1) {
                    dispatch(setCurrentPage(currentPage - 1))
                    dispatch(getUsers({ currentPage: currentPage - 1 }))
                }

                else {
                    dispatch(getUsers({ currentPage }))
                }
            },
            (error) => {
                // Handle any errors here
                console.error("Failed to delete user:", error);
            }
        );
    }

    return (
        <>
            <button data-text="Delete User" onClick={handleShow}>
                <span className="la la-trash"></span>
            </button>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title className='text-primary'>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this User ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete} disabled={loading}>
                        Delete
                        {loading && (
                            <span
                                className="spinner-border spinner-border-sm mx-2"
                                role="status"
                                aria-live="polite"
                            ></span>
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DeleteModal;