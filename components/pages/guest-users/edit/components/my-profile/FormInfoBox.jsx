"use client"

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { unwrapResult } from '@reduxjs/toolkit';

import { getGuestUserById, updateGuestUser } from '@/states/guestUsers/handleRequests';

const FormInfoBox = ({ id }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { findGuestUsers, loading } = useSelector((state) => state.guestUsers);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        age: "",
        email: ""
    });

    useEffect(() => {
        dispatch(getGuestUserById({ guestUserId: id }));
    }, [dispatch, id]);

    useEffect(() => {
        if (findGuestUsers) {
            setFormData({
                firstName: findGuestUsers.firstName,
                lastName: findGuestUsers.lastName,
                age: findGuestUsers.age,
                email: findGuestUsers.email
            });
        }
    }, [findGuestUsers]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resultAction = await dispatch(updateGuestUser({ guestUserId: id, newGuestUserData: formData }));
            unwrapResult(resultAction); // This will throw an error if the action was rejected
            router.push("/guest-users");
        } catch (error) {
            console.error('Edit Guest Users failed', error);
        }
    }

    return (
        <>
            {findGuestUsers ? (
                <form className="default-form" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="form-group col-lg-6 col-md-12">
                            <label>FirstName</label>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="Enter FirstName of Guest User"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group col-lg-6 col-md-12">
                            <label>LastName</label>
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Enter LastName of Guest User"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group col-lg-6 col-md-12">
                            <label>Email</label>
                            <input
                                type="text"
                                name="email"
                                placeholder="Enter Email of Guest User"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group col-lg-6 col-md-12">
                            <label>Age</label>
                            <input
                                type="number"
                                name="age"
                                min={0}
                                placeholder="Enter Age of Guest User"
                                value={formData.age}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group col-lg-6 col-md-12 w-100">
                            <button type="submit" className="theme-btn btn-style-one" disabled={loading}>
                                Save
                                {loading && (
                                    <span
                                        className="spinner-border spinner-border-sm mx-2"
                                        role="status"
                                        aria-live="polite"
                                    ></span>
                                )}
                            </button>
                        </div>
                    </div>
                </form >
            ) : (
                <div className="w-100 d-flex mb-5">
                    <div className="spinner-border text-primary mx-auto" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )}
        </>
    );
};

export default FormInfoBox;