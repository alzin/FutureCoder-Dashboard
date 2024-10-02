import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { updateSubscriber, getSubscribers } from '@/states/subscribers/handleRequests';
import { useDispatch, useSelector } from "react-redux";

const EditModal = ({ id, email }) => {
    const [show, setShow] = useState(false);
    const [newSubscriber, setNewSubscriber] = useState({
        email: email
    })

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch()
    const { loading, currentPage } = useSelector((state) => state.subscribers);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewSubscriber(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateSubscriber({ subscriberId:id, newSubscriber })).unwrap().then(
            () => {
                handleClose();
                dispatch(getSubscribers({ currentPage }));
            },
            (error) => {
                // Handle any errors here
                console.error("Failed to edit subscriber :", error);
            }
        );
    }

    return (
        <>
            <button data-text="Edit Subscriber" onClick={handleShow}>
                <span className="la la-pencil"></span>
            </button>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title className='text-primary'>Edit Subscriber</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="default-form" onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <div className="form-group col-lg-6 col-md-12">
                                <label>Subscriber Email</label>
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="Enter New Subscriber Email"
                                    value={newSubscriber.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <Modal.Footer>
                            <Button variant="primary" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button type='submit' variant="success" disabled={loading}>
                                Submit
                                {loading && (
                                    <span
                                        className="spinner-border spinner-border-sm mx-2"
                                        role="status"
                                        aria-live="polite"
                                    ></span>
                                )}
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>

            </Modal>
        </>
    );
};

export default EditModal;
