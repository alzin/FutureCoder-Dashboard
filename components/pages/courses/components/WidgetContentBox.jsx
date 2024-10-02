"use client";

import Pagination from "./Pagination";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Link from "next/link";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import DeleteModal from "./DeleteModal";
import { useEffect } from "react";
import { getCourses } from "@/states/courses/handleRequests";

const WidgetContentBox = () => {

  const dispatch = useDispatch();
  const { courses, totalCount, currentPage } = useSelector(state => state.courses)

  useEffect(() => {
    dispatch(getCourses({ currentPage }));
  }, [])

  return (
    <div className="widget-content">
      <div className="tabs-box">
        <Tabs>
          <div className="aplicants-upper-bar">
            {/* <h6>Senior Product Designer</h6> */}

            <TabList className="aplicantion-status tab-buttons clearfix w-100">
              <Tab className="tab-btn totals ms-0"> Total(s): {totalCount}</Tab>
              <Link href={"/courses/create"} className="theme-btn btn-style-one ms-auto">
                  Create New Course
                </Link>
            </TabList>
          </div>

          <div className="tabs-content">
            <TabPanel>
              <div className="row pb-3">
                {courses && courses.length > 0 ?
                  courses.map((item) => (
                    <div
                      className="candidate-block-three col-lg-6 col-md-12 col-sm-12"
                      key={item.id}
                    >
                      <div className="inner-box">
                        <div className="content">
                          <figure className="image rounded-0">
                            <Image
                              width={90}
                              height={90}
                              src={item.imagePath}
                              alt="candidates"
                            />
                          </figure>

                          <ul className="candidate-info">
                            <li className="ps-0">
                              <span>Title : </span>
                              {item.title}
                            </li>

                            <li className="ps-0">
                              <span>Teacher : </span>
                              {item.teacher}
                            </li>

                            <li className="ps-0">
                              <span>Price :</span>
                              {item.price}
                            </li>

                            <li className="ps-0">
                              <span>Start Date :</span>
                              {item.course_start_date}
                            </li>
                          </ul>
                        </div>
                        {/* End content */}

                        <div className="option-box">
                          <ul className="option-list">
                            <li>
                              <button data-text="View Course">
                                <Link data-text="View Course" href={`/courses/${item.id}`}>
                                  <span className="la la-eye"></span>
                                </Link>
                              </button>
                            </li>
                            <li>
                              <button data-text="Edit Course">
                                <Link data-text="Edit Course" href={`/courses/edit/${item.id}`}>
                                  <span className="la la-pencil"></span>
                                </Link >
                              </button>
                            </li>
                            <li>
                              <DeleteModal id={item.id} />
                            </li>
                          </ul>
                        </div>
                        {/* End admin options box */}
                      </div>
                    </div>
                  )) :
                  courses && courses.length === 0 ?
                    <div className="text-center">
                      <span> No courses Found . Create new course for get started</span>
                    </div>
                    : (
                      <div className="spinner-border text-primary mx-auto" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    )
                }
              </div>
            </TabPanel>
            {/* End total applicants */}
          </div>
        </Tabs>
      </div>
      {courses?.length > 0 && <Pagination />}
    </div>
  );
};

export default WidgetContentBox;
