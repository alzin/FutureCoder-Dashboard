"use client"
import MobileMenu from "@/components/header/MobileMenu";;
import DashboardHeader from "@/components/header/DashboardHeader";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogById } from "@/states/blogs/handleRequests";
import { notFound } from "next/navigation";

const index = ({ id }) => {

    const dispatch = useDispatch()
    const { findBlog } = useSelector(state => state.blogs)

    useEffect(() => {
        dispatch(getBlogById({ blogId: id }))
    }, [])

    useEffect(() => {
        if (findBlog) {
            if (!findBlog.title) {
                notFound()
            }
        }
    }, [id,findBlog])

    return (

        <>
            {/* <!-- Header Span --> */}
            <span className="header-span"></span>

            <DashboardHeader />
            {/* <!--End Main Header --> */}

            <MobileMenu />
            {/* End MobileMenu */}
            {/* <!-- Job Detail Section --> */}
            {findBlog ?
                <section className="job-detail-section">
                    {/* <!-- Upper Box --> */}
                    <div className="upper-box" style={{ height: "400px" }}>
                        <Image
                            className=" object-fit-contain"
                            fill={true}
                            src={findBlog.ImagePath}
                            alt="logo"
                        />
                    </div>
                    {/* <!-- Upper Box --> */}

                    {/* <!-- job-detail-outer--> */}
                    <div className="job-detail-outer">
                        <div className="auto-container">
                            <div className="row">

                                <div className="content-column col-lg-8 col-md-12 col-sm-12">
                                    {/*  job-detail */}

                                    <div className="job-detail">
                                        <h4>Blog Title :</h4>
                                        <p>
                                            {findBlog.title}
                                        </p>
                                    </div>
                                    <div className="job-detail">
                                        <h4>Blog Description :</h4>
                                        <p>
                                            {findBlog.description}
                                        </p>
                                    </div>
                                    {/* End job-detail */}

                                    {/* <!-- Related Jobs --> */}

                                </div>
                                {/* End .content-column */}


                                {/* End .sidebar-column */}
                            </div>
                        </div>
                    </div>
                    {/* <!-- job-detail-outer--> */}
                </section>
                :
                <div className=" d-flex my-5 mh-100">
                    <div className="spinner-border text-primary mx-auto" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>

            }
            {/* <!-- End Job Detail Section --> */}

            {/* {company ? <FooterDefault footerStyle="alternate5" /> : ""} */}
            {/* <!-- End Main Footer --> */}
        </>
    );
};

export default index;
