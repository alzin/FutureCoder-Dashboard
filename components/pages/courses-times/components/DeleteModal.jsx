import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from '@/states/courses/coursesSlice';
import { deleteCourse, getCourses } from '@/states/courses/handleRequests';

const DeleteModal = ({ id }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch()
    const { loading, currentPage, courses } = useSelector((state) => state.courses);

    const handleDelete = () => {
        dispatch(deleteCourse({ courseId: id })).unwrap().then(
            () => {
                handleClose();
                if (courses.length === 1 && currentPage > 1) {
                    dispatch(setCurrentPage(currentPage - 1))
                    dispatch(getCourses({ currentPage: currentPage - 1 }))
                }

                else {
                    dispatch(getCourses({ currentPage }))
                }
            },
            (error) => {
                // Handle any errors here
                console.error("Failed to delete course:", error);
            }
        );
    }

    return (
        <>
            <button data-text="Delete Courses" onClick={handleShow}>
                <span className="la la-trash"></span>
            </button>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title className='text-primary'>Delete Courses</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this Courses?</Modal.Body>
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
