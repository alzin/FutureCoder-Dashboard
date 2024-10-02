"use client"

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { unwrapResult } from '@reduxjs/toolkit';

import { getTestimonialById, updateTestimonial } from '@/states/testimonials/handleRequests';

const FormInfoBox = ({ id }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { findTestimonial, loading } = useSelector((state) => state.testimonials);

    const [formData, setFormData] = useState({
        description: "",
        rating: "",
    });

    useEffect(() => {
        dispatch(getTestimonialById({ testimonialId: id }));
    }, [dispatch, id]);

    useEffect(() => {
        if (findTestimonial) {
            setFormData({
                description: findTestimonial.description,
                rating: findTestimonial.rating,
            });
        }
    }, [findTestimonial]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resultAction = await dispatch(updateTestimonial({ testimonialId: id, newTestimonialData: formData }));
            unwrapResult(resultAction); // This will throw an error if the action was rejected
            router.push("/testimonials");
        } catch (error) {
            console.error('Edit Testimonial failed', error);
        }
    }

    return (
        <>
            {findTestimonial ? (
                <form className="default-form" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="form-group col-lg-6 col-md-12">
                            <label>Description</label>
                            <textarea
                                type="text"
                                name="description"
                                placeholder="Enter opinion of testimonials"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group col-lg-6 col-md-12">
                            <label>Rating</label>
                            <input
                                type="number"
                                name="rating"
                                min={0}
                                max={5}
                                placeholder="Enter rating of Future Coder"
                                value={formData.rating}
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