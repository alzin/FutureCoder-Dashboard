import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from '@/states/guestUsers/guestUsersSlice';
import {deleteGuestUser,getGuestUsers } from '@/states/guestUsers/handleRequests';

const DeleteModal = ({ id }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch()
    const { loading, currentPage, guestUsers } = useSelector((state) => state.guestUsers);

    const handleDelete = () => {
        dispatch(deleteGuestUser({ guestUserId: id })).unwrap().then(
            () => {
                handleClose();
                if (guestUsers.length === 1 && currentPage > 1) {
                    dispatch(setCurrentPage(currentPage - 1))
                    dispatch(getGuestUsers({ currentPage: currentPage - 1 }))
                }

                else {
                    dispatch(getGuestUsers({ currentPage }))
                }
            },
            (error) => {
                // Handle any errors here
                console.error("Failed to delete Guest User:", error);
            }
        );
    }

    return (
        <>
            <button data-text="Delete Guest User" onClick={handleShow}>
                <span className="la la-trash"></span>
            </button>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title className='text-primary'>Delete Guest User</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this Guest User?</Modal.Body>
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
