"use client"

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { unwrapResult } from '@reduxjs/toolkit';

import { addGuestUser } from '@/states/guestUsers/handleRequests';

const FormInfoBox = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { loading } = useSelector((state) => state.guestUsers);
    const [guestUserData, setGuestUserData] = useState({
        firstName: "",
        lastName: "",
        age: "",
        email: ""
    });

    const handleChange = (e) => {
        setGuestUserData({ ...guestUserData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const resultAction = await dispatch(addGuestUser({ guestUserData }));
            unwrapResult(resultAction); // This will throw an error if the action was rejected
            router.push("/guest-users");
        } catch (error) {
            console.error('Create Guest Users/ failed', error);
        }
    }

    return (
        <form className="default-form" onSubmit={handleSubmit}>
            <div className="row">
                <div className="form-group col-lg-6 col-md-12">
                    <label>FirstName</label>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="Enter FirstName of Guest User"
                        value={guestUserData.firstName}
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
                        value={guestUserData.lastName}
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
                        value={guestUserData.email}
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
                        value={guestUserData.age}
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
        </form>
    );
};

export default FormInfoBox;