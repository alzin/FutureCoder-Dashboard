import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteBlog, getBlogs } from '@/states/blogs/handleRequests';
import { setCurrentPage } from '@/states/blogs/blogsSlice';
import { useDispatch, useSelector } from "react-redux";

const DeleteModal = ({ id }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch()
    const { blogs, loading, currentPage } = useSelector((state) => state.blogs);

    const handleDelete = () => {
        dispatch(deleteBlog({ blogId: id })).unwrap().then(
            () => {
                // Deletion was successful, close the modal
                handleClose();
                if (blogs?.length === 1 && currentPage > 1) {
                    dispatch(setCurrentPage(currentPage - 1))
                    dispatch(getBlogs({ currentPage: currentPage - 1 }))
                }
                else {
                    dispatch(getBlogs({ currentPage }))
                }
            },
            (error) => {
                // Handle any errors here
                console.error("Failed to delete blog:", error);
            }
        );
    };

    return (
        <>
            <button data-text="Delete Blog" onClick={handleShow}>
                <span className="la la-trash"></span>
            </button>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title className='text-primary'>Delete Blog</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this Blog ?</Modal.Body>
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
