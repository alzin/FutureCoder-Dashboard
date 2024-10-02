"use client"
import DashboardHeader from "@/components/header/DashboardHeader";
import MobileMenu from "@/components/header/MobileMenu";
import Image from "next/image";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourseById } from "@/states/courses/handleRequests";

const index = ({ id }) => {

    const dispatch = useDispatch()
    const { findCourse } = useSelector(state => state.courses)

    useEffect(() => {
        dispatch(getCourseById({ courseId: id }))
    }, [])

    return (

        <>
            {/* <!-- Header Span --> */}
            <span className="header-span"></span>

            {/* End Login Popup Modal */}

            <DashboardHeader />
            {/* <!--End Main Header --> */}

            <MobileMenu />
            {/* End MobileMenu */}

            {/* <!-- Job Detail Section --> */}
            {findCourse ?
                <section className="candidate-detail-section">
                    <div className="upper-box" style={{ height: "400px" }}>
                        <Image
                            className=" object-fit-contain"
                            fill={true}
                            src={findCourse.imagePath}
                            alt="logo"
                        />
                    </div>
                    {/* <!-- Upper Box --> */}

                    <div className="candidate-detail-outer">
                        <div className="auto-container">
                            <div className="row">
                                <div className="content-column col-lg-8 col-md-12 col-sm-12">
                                    <div className="job-detail">

                                        <div
                                            className={`resume-outer theme-blue`}
                                        >
                                            <div className="upper-title">
                                                <h4>Description</h4>
                                            </div>

                                            <p>{findCourse.description}</p>

                                        </div>

                                    </div>
                                </div>
                                {/* End .content-column */}

                                <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
                                    <aside className="sidebar">
                                        <div className="sidebar-widget">
                                            <div className="widget-content">
                                                <ul className="job-overview">
                                                    <li>
                                                        <h5>Title : </h5>
                                                        <span>{findCourse.title}</span>
                                                    </li>
                                                    <li>
                                                        <h5>Teacher : </h5>
                                                        <span>{findCourse.teacher}</span>
                                                    </li>

                                                    <li>
                                                        <h5>Price : </h5>
                                                        <span>{findCourse.price}</span>
                                                    </li>
                                                    <li>
                                                        <h5>Age : </h5>
                                                        <span>{findCourse.min_age} - {findCourse.max_age}</span>
                                                    </li>
                                                    <li>
                                                        <h5>Course Outline : </h5>
                                                        <span>{findCourse.course_outline}</span>
                                                    </li>

                                                    <li>
                                                        <h5>Duration in Session: </h5>
                                                        <span>{findCourse.duration_in_session}</span>
                                                    </li>

                                                    <li>
                                                        <h5>Course Start Date : </h5>
                                                        <span>{findCourse.course_start_date}</span>
                                                    </li>



                                                </ul>
                                            </div>
                                        </div>

                                    </aside>
                                    {/* End .sidebar */}
                                </div>
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

            {/* {findCourse && findCourse ? <FooterDefault footerStyle="alternate5" /> : ""} */}
            {/* <!-- End Main Footer --> */}
        </>
    );
};

export default index;
