"use client"

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { unwrapResult } from '@reduxjs/toolkit';

import { addCourse } from '@/states/courses/handleRequests';

const FormInfoBox = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { loading } = useSelector((state) => state.courses);
    const [courseData, setCourseData] = useState({
        title: "",
        description: "",
        teacher: "",
        price: "",
        course_outline: "",
        duration_in_session: "",
        course_start_date: "",
        min_age: "",
        max_age: "",
        imagePath: "https://i.postimg.cc/jjfjwTWs/image.png",
        payment_url: ""
    });

    const handleChange = (e) => {
        setCourseData({ ...courseData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const resultAction = await dispatch(addCourse({ courseData }));
            unwrapResult(resultAction); // This will throw an error if the action was rejected
            router.push("/courses");
        } catch (error) {
            console.error('Create Course failed', error);
        }
    }

    return (
        <form className="default-form" onSubmit={handleSubmit}>
            <div className="row">
                <div className="form-group col-lg-12 col-md-12">
                    <label>Course Title</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter Title of Course"
                        value={courseData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group col-lg-12 col-md-12">
                    <label>Course Description</label>
                    <textarea
                        type="text"
                        name="description"
                        placeholder="Enter description of Course"
                        value={courseData.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group col-lg-6 col-md-12">
                    <label>Course Teacher</label>
                    <input
                        type="text"
                        name="teacher"
                        placeholder="Enter Teacher of Course"
                        value={courseData.teacher}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group col-lg-6 col-md-12">
                    <label>Course Price</label>
                    <input
                        type="number"
                        name="price"
                        min={0}
                        placeholder="Enter Price of Course"
                        value={courseData.price}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group col-lg-6 col-md-12">
                    <label>Course Outline</label>
                    <input
                        type="text"
                        name="course_outline"
                        placeholder="Enter Course Outline of Course"
                        value={courseData.course_outline}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group col-lg-6 col-md-12">
                    <label>Course Sessions</label>
                    <input
                        type="number"
                        min={0}
                        name="duration_in_session"
                        placeholder="Enter Number of Sessions in Course"
                        value={courseData.duration_in_session}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group col-lg-6 col-md-12">
                    <label>Course Started Date</label>
                    <input
                        type="date"
                        // pattern="\d{4}-\d{2}-\d{2}"
                        data-date=""
                        data-date-format="YYYY-MM-DD"
                        min={new Date().toISOString().split('T')[0]}
                        name="course_start_date"
                        placeholder="Enter Course Start Date of Course"
                        value={courseData.course_start_date}
                        onChange={handleChange}
                        required
                    />

                </div>
                <div className="form-group col-lg-6 col-md-12">
                    <label>Course Min Age</label>
                    <input
                        type="number"
                        name="min_age"
                        min={0}
                        placeholder="Enter Minimum  Age For Course"
                        value={courseData.min_age}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group col-lg-6 col-md-12">
                    <label>Course Maximum age</label>
                    <input
                        type="number"
                        name="max_age"
                        min={Number(courseData.min_age) + 1}
                        placeholder="Enter Maximum Age for Course"
                        value={courseData.max_age}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group col-lg-6 col-md-12">
                    <label>Image path</label>
                    <input
                        type="text"
                        name="imagePath"
                        placeholder="Enter Image Path of Blog"
                        value={courseData.imagePath}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group col-lg-6 col-md-12">
                    <label>Payment Url</label>
                    <input
                        type="text"
                        name="payment_url"
                        placeholder="Enter payment URL of Course"
                        value={formData.payment_url}
                        onChange={handleChange}
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