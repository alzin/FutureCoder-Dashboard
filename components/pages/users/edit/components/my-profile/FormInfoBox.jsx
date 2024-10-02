"use client"

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { unwrapResult } from '@reduxjs/toolkit';

import { getUserById, updateUser } from '@/states/users/handleRequests';

const FormInfoBox = ({ id }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { finduser, loading } = useSelector((state) => state.users);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        age: "",
        email: "",
        timeZone: "",
    });

    useEffect(() => {
        dispatch(getUserById({ usersId: id }));
    }, [dispatch, id]);

    useEffect(() => {
        if (finduser) {
            setFormData({
                firstName: finduser.firstName,
                lastName: finduser.lastName,
                age: finduser.age,
                email: finduser.email,
                timeZone: finduser.timeZone,
            });
        }
    }, [finduser]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resultAction = await dispatch(updateUser({ usersId: id, newUsersData: formData }));
            unwrapResult(resultAction); // This will throw an error if the action was rejected
            router.push("/users");
        } catch (error) {
            console.error('Edit users failed', error);
        }
    }

    return (
        <>
            {finduser ? (
                <form className="default-form" onSubmit={handleSubmit}>
                    <div className="row">

                        <div className="form-group col-lg-6 col-md-12">
                            <label>FirstName</label>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="Enter FirstName of User"
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
                                placeholder="Enter LastName of User"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group col-lg-6 col-md-12">
                            <label>Age</label>
                            <input
                                type="number"
                                name="age"
                                placeholder="Enter Age of User"
                                value={formData.age}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group col-lg-6 col-md-12">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter Email of User"
                                value={formData.email}
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