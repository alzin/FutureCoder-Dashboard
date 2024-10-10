"use client"

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { unwrapResult } from '@reduxjs/toolkit';
import { getTimeZone } from '@/utils/algorithms';
import { addBooking } from '@/states/bookings/handleRequests';

const FormInfoBox = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { loading } = useSelector((state) => state.bookings);
    const [bookingData, setBookingData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        age: "",
        courseId: "",
        sessionTimings: "",
        timeZone: getTimeZone()
    });

    const handleChange = (e) => {
        setBookingData({ ...bookingData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const resultAction = await dispatch(addBooking({ bookingData }));
            unwrapResult(resultAction); // This will throw an error if the action was rejected
            router.push("/reservations");
        } catch (error) {
            console.error('Create Free Sission failed', error);
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
                        value={bookingData.firstName}
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
                        value={bookingData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group col-lg-6 col-md-12">
                    <label>Email</label>
                    <input
                        type="text"
                        name="email"
                        placeholder="Enter Email of User"
                        value={bookingData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group col-lg-6 col-md-12">
                    <label>Age</label>
                    <input
                        type="number"
                        min={0}
                        name="age"
                        placeholder="Enter Age of User"
                        value={bookingData.age}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group col-lg-6 col-md-12">
                    <label>Course Id</label>
                    <input
                        type="number"
                        min={0}
                        name="courseId"
                        placeholder="Enter Course Id"
                        value={bookingData.courseId}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group col-lg-6 col-md-12">
                    <label>Course Time Id</label>
                    <input
                        type="number"
                        min={0}
                        name="sessionTimings"
                        placeholder="Enter Course Time Id"
                        value={bookingData.sessionTimings}
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