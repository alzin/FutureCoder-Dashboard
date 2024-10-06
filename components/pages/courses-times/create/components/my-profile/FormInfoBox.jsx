"use client"

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { unwrapResult } from '@reduxjs/toolkit';

import { addCoursesTimes } from '@/states/coursesTimes/handleRequests';

const FormInfoBox = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { loading } = useSelector((state) => state.coursesTimes);
    const [courseTimeData, setCourseTimeData] = useState({
        courseId: "",
        SessionTimings: "",
        startTime: "",
        endTime: "",
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });

    function getCurrentTime() {
        const currentTime = new Date();
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const hours = String(currentTime.getHours()).padStart(2, '0');
        const minutes = String(currentTime.getMinutes()).padStart(2, '0');
        return {
            time: `${hours}:${minutes}`,
            date: `${year}-${month}-${day}`
        };
    }

    const handleChange = (e) => {
        setCourseTimeData({ ...courseTimeData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const courseTimeDataClone = { ...courseTimeData, startTime: courseTimeData.startTime + ":00", endTime: courseTimeData.endTime + ":00" }

        try {
            const resultAction = await dispatch(addCoursesTimes({ courseTimeData: courseTimeDataClone }));
            unwrapResult(resultAction); // This will throw an error if the action was rejected
            router.push("/courses-times");
        } catch (error) {
            console.error('Create Course Time failed', error);
        }
    }

    return (
        <form className="default-form" onSubmit={handleSubmit}>
            <div className="row">
                <div className="form-group col-lg-6 col-md-12">
                    <label>Course Id</label>
                    <input
                        type="number"
                        name="courseId"
                        placeholder="Enter Id of Course"
                        value={courseTimeData.courseId}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group col-lg-6 col-md-12">
                    <label>Course Date</label>
                    <input
                        type="date"
                        min={getCurrentTime().date}
                        name="SessionTimings"
                        placeholder="yyyy-mm-dd"
                        value={courseTimeData.SessionTimings}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group col-lg-6 col-md-12">
                    <label>Course Start Time</label>
                    <input
                        type="time"
                        name="startTime"
                        placeholder="Enter startTime of Course"
                        value={courseTimeData.startTime}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group col-lg-6 col-md-12">
                    <label>Course End Time</label>
                    <input
                        type="time"
                        name="endTime"
                        placeholder="Enter endTime of Course"
                        value={courseTimeData.endTime}
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