"use client"

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { unwrapResult } from '@reduxjs/toolkit';

import { addBlog } from '@/states/blogs/handleRequests';

const FormInfoBox = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { loading } = useSelector((state) => state.blogs);
    const [blogData, setBlogData] = useState({
        title: "",
        description: "",
        imagePath: "https://i.postimg.cc/jjfjwTWs/image.png",
    });

    const handleChange = (e) => {
        setBlogData({ ...blogData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const resultAction = await dispatch(addBlog({ blogData }));
            unwrapResult(resultAction); // This will throw an error if the action was rejected
            router.push("/blogs");
        } catch (error) {
            console.error('Create Blog failed', error);
        }
    }

    return (
        <form className="default-form" onSubmit={handleSubmit}>
            <div className="row">
                <div className="form-group col-lg-12 col-md-12">
                    <label>Blog Title</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter Title of Blog"
                        value={blogData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group col-lg-12 col-md-12">
                    <label>Blog Description</label>
                    <textarea
                        type="text"
                        name="description"
                        placeholder="Enter description of Blog"
                        value={blogData.description}
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
                        value={blogData.imagePath}
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