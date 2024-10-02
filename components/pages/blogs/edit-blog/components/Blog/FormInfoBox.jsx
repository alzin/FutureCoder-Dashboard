"use client"

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { notFound, useRouter } from 'next/navigation';

import { getBlogById, updateBlog } from '@/states/blogs/handleRequests';

const FormInfoBox = ({ id }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { findBlog, loading } = useSelector((state) => state.blogs);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        imagePath: "",
    });

    useEffect(() => {
        dispatch(getBlogById({ blogId: id }));
    }, [dispatch, id]);

    useEffect(() => {
        
        if (findBlog) {
            if (!findBlog.title) {
                notFound()
            }
            setFormData({
                title: findBlog.title,
                description: findBlog.description,
                imagePath: findBlog.ImagePath,
            });
        }
    }, [findBlog]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(updateBlog({ blogId: id, newBlogData: formData })).unwrap().then(
            () => {
                router.push("/blogs");
            },
            (error) => {
                // Handle any errors here
                console.error("Edit Blog failed:", error);
            }
        );
    }

    return (
        <>
            {findBlog ? (
                <form className="default-form" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="form-group col-lg-12 col-md-12">
                            <label>Blog Title</label>
                            <input
                                type="text"
                                name="title"
                                placeholder="Enter New Blog Title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group col-lg-12 col-md-12">
                            <label>Blog Description</label>
                            <textarea
                                type="text"
                                name="description"
                                placeholder="Enter New Blog Description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group col-lg-6 col-md-12">
                            <label>Image Path</label>
                            <input
                                type="text"
                                name="imagePath"
                                placeholder="Enter New Image Path"
                                value={formData.imagePath}
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