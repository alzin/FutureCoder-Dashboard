import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from '@/states/subscribers/subscribersSlice';
import { deleteSubscriber, getSubscribers } from '@/states/subscribers/handleRequests';

const DeleteModal = ({ id }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch()
    const { loading, currentPage, subscribers } = useSelector((state) => state.subscribers);

    const handleDelete = () => {
        dispatch(deleteSubscriber({ subscriberId: id })).unwrap().then(
            () => {
                // Deletion was successful, close the modal
                handleClose();
                if (subscribers?.length === 1 && currentPage > 1) {
                    dispatch(setCurrentPage(currentPage - 1))
                    dispatch(getSubscribers({ currentPage: currentPage - 1 }));
                }
                else {
                    dispatch(getSubscribers({ currentPage }));
                }
            },
            (error) => {
                // Handle any errors here
                console.error("Failed to delete Subscriber:", error);
            }
        );
    }

    return (
        <>
            <button data-text="Delete Subscriber" onClick={handleShow}>
                <span className="la la-trash"></span>
            </button>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title className='text-primary'>Delete Subscriber </Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this Subscriber ?</Modal.Body>
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
