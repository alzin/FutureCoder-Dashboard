"use client"

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { unwrapResult } from '@reduxjs/toolkit';

import { addUser } from '@/states/users/handleRequests';

const FormInfoBox = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { loading } = useSelector((state) => state.users);
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        age: "",
        email: "",
        password: "",
        timeZone: "Asia/Damascus",
    });

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const resultAction = await dispatch(addUser({ userData }));
            unwrapResult(resultAction); // This will throw an error if the action was rejected
            router.push("/users");
        } catch (error) {
            console.error('Create User  failed', error);
        }
    }

    return (
        <form className="default-form" onSubmit={handleSubmit}>
            <div className="row">
                <div className="form-group col-lg-6 col-md-12">
                    <label>First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="Enter First Name of User"
                        value={userData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group col-lg-6 col-md-12">
                    <label>Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Enter Last Name of User"
                        value={userData.lastName}
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
                        placeholder="Enter Age of User"
                        value={userData.age}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group col-lg-6 col-md-12">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Last Name of User"
                        value={userData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group col-lg-6 col-md-12">
                    <label>Password</label>
                    <input
                        type="text"
                        name="password"
                        placeholder="Enter Password of User"
                        value={userData.password}
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