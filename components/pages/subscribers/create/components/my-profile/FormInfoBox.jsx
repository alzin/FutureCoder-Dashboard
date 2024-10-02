"use client"

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { unwrapResult } from '@reduxjs/toolkit';
import { addSubscriber } from '@/states/subscribers/handleRequests';

const FormInfoBox = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { loading } = useSelector((state) => state.subscribers);
    const [subscriberData, setSubscriberData] = useState({
        email: ""
    });

    const handleChange = (e) => {
        setSubscriberData({ ...subscriberData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resultAction = await dispatch(addSubscriber({ subscriberData }));
            unwrapResult(resultAction); // This will throw an error if the action was rejected
            router.push("/subscribers");
        } catch (error) {
            console.error('Create Subscriber failed', error);
        }
    }

    return (
        <form className="default-form" onSubmit={handleSubmit}>
            <div className="row">
                <div className="form-group col-lg-6 col-md-12">
                    <label>Subscriber Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Subscriber Email"
                        value={subscriberData.email}
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