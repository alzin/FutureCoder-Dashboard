"use client"

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { unwrapResult } from '@reduxjs/toolkit';

import { getCourseById, updateCourse } from '@/states/courses/handleRequests';

const FormInfoBox = ({ id }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { findCourse, loading } = useSelector((state) => state.courses);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        teacher: "",
        price: "",
        course_outline: "",
        duration_in_session: "",
        course_start_date: "",
        min_age: "",
        max_age: "",
        imagePath: "",
        payment_url: ""
    });

    useEffect(() => {
        dispatch(getCourseById({ courseId: id }));
    }, [dispatch, id]);

    useEffect(() => {
        if (findCourse) {
            setFormData({
                title: findCourse.title,
                description: findCourse.description,
                teacher: findCourse.teacher,
                price: findCourse.price,
                course_outline: findCourse.course_outline,
                duration_in_session: findCourse.duration_in_session,
                course_start_date: findCourse.course_start_date,
                min_age: findCourse.min_age,
                max_age: findCourse.max_age,
                imagePath: findCourse.imagePath,
                payment_url: findCourse.payment_url
            });
        }
    }, [findCourse]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resultAction = await dispatch(updateCourse({ courseId: id, newCourseData: formData }));
            unwrapResult(resultAction); // This will throw an error if the action was rejected
            router.push("/courses");
        } catch (error) {
            console.error('Edit course failed', error);
        }
    }

    return (
        <>
            {findCourse ? (
                <form className="default-form" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="form-group col-lg-12 col-md-12">
                            <label>Course Title</label>
                            <input
                                type="text"
                                name="title"
                                placeholder="Enter Title of Course"
                                value={formData.title}
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
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group col-lg-12 col-md-12">
                            <label>Course Outline</label>
                            <textarea
                                type="text"
                                name="course_outline"
                                placeholder="Enter Course Outline of Course"
                                value={formData.course_outline}
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
                                value={formData.teacher}
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
                                value={formData.price}
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
                                value={formData.duration_in_session}
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
                                value={formData.course_start_date}
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
                                value={formData.min_age}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group col-lg-6 col-md-12">
                            <label>Course Maximum age</label>
                            <input
                                type="number"
                                name="max_age"
                                min={Number(formData.min_age) + 1}
                                placeholder="Enter Maximum Age for Course"
                                value={formData.max_age}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group col-lg-6 col-md-12">
                            <label>Image path</label>
                            <input
                                type="text"
                                name="imagePath"
                                placeholder="Enter Image Path of Course"
                                value={formData.imagePath}
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