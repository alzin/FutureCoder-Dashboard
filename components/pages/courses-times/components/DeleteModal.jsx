import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from '@/states/coursesTimes/coursesTimesSlice';
import { deleteCoursesTimes, getCoursesTimes } from '@/states/coursesTimes/handleRequests';

const DeleteModal = ({ id }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch()
    const { loading, currentPage, coursesTimes } = useSelector((state) => state.coursesTimes);

    const getTimeZone = () => {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
    };

    const handleDelete = () => {
        dispatch(deleteCoursesTimes({ coursesTimesId: id })).unwrap().then(
            () => {
                handleClose();
                if (coursesTimes.length === 1 && currentPage > 1) {
                    dispatch(setCurrentPage(currentPage - 1))
                    dispatch(getCoursesTimes({ currentPage: currentPage - 1, timezone: getTimeZone() }))
                }

                else {
                    dispatch(getCoursesTimes({ currentPage, timezone: getTimeZone() }))
                }
            },
            (error) => {
                // Handle any errors here
                console.error("Failed to delete Course Time:", error);
            }
        );
    }

    return (
        <>
            <button data-text="Delete Course Time" onClick={handleShow}>
                <span className="la la-trash"></span>
            </button>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title className='text-primary'>Delete Course Time</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this Course Time?</Modal.Body>
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
