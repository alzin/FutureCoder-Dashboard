"use client"

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { unwrapResult } from '@reduxjs/toolkit';

import { addTestimonial } from '@/states/testimonials/handleRequests';

const FormInfoBox = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { loading } = useSelector((state) => state.testimonials);
    const [testimonialData, setTestimonialData] = useState({
        userId: "",
        description: "",
        rating: "",
    });

    const handleChange = (e) => {
        setTestimonialData({ ...testimonialData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const resultAction = await dispatch(addTestimonial({ testimonialData }));
            unwrapResult(resultAction); // This will throw an error if the action was rejected
            router.push("/testimonials");
        } catch (error) {
            console.error('Create Testimonial  failed', error);
        }
    }

    return (
        <form className="default-form" onSubmit={handleSubmit}>
            <div className="row">
                <div className="form-group col-lg-6 col-md-12">
                    <label>User Id</label>
                    <input
                        type="number"
                        min={0}
                        name="userId"
                        placeholder="Enter userId of Testimonial"
                        value={testimonialData.userId}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group col-lg-12 col-md-12">
                    <label>description</label>
                    <textarea
                        type="text"
                        name="description"
                        placeholder="Enter Opinion of Testimonials"
                        value={testimonialData.description}
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
                        value={testimonialData.rating}
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