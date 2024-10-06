"use client";

import Pagination from "./Pagination";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Link from "next/link";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import DeleteModal from "./DeleteModal";
import { useEffect } from "react";
import { getCoursesTimes } from "@/states/coursesTimes/handleRequests";

const WidgetContentBox = () => {

  const dispatch = useDispatch();
  const { coursesTimes, totalCount, currentPage } = useSelector(state => state.coursesTimes)

  const isOldDate = (timeString, dateString) => {
    const currentDate = new Date();
    const timeToCompare = new Date(`${dateString}T${timeString}`);
    return timeToCompare < currentDate;
  };

  useEffect(() => {
    const getTimeZone = () => {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    };

    const timezone = getTimeZone();

    dispatch(getCoursesTimes({ currentPage, timezone }));
  }, [])

  return (
    <div className="widget-content">
      <div className="tabs-box">
        <Tabs>
          <div className="aplicants-upper-bar">
            {/* <h6>Senior Product Designer</h6> */}

            <TabList className="aplicantion-status tab-buttons clearfix w-100">
              <Tab className="tab-btn totals ms-0"> Total(s): {totalCount}</Tab>
              <Link href={"/courses-times/create"} className="theme-btn btn-style-one ms-auto">
                Create New Course Time
              </Link>
            </TabList>
          </div>

          <div className="tabs-content">
            <TabPanel>
              <div className="row pb-3">
                {coursesTimes && coursesTimes.length > 0 ?
                  coursesTimes.map((item) => (
                    <div
                      className="candidate-block-three col-lg-4 col-md-12 col-sm-12"
                      key={item.id}
                    >
                      <div className="inner-box flex-column">
                        <div className="content ps-0">
                          <ul className="candidate-info">

                            <li className="ps-0 w-100">
                              <Link href={`/courses/${item.courseId}`}>
                                <span>Course Name :</span>
                                {item.courseName}
                              </Link>
                            </li>

                            <li className={`ps-0 w-100 ${isOldDate(item.startTime, item.SessionTimings) ? "text-danger" : ""}`}>
                              <span>Course Date : </span>
                              {item.SessionTimings}
                            </li>

                            <li className={`ps-0 w-100 ${isOldDate(item.startTime, item.SessionTimings) ? "text-danger" : ""}`}>
                              <span>Time : </span>
                              {item.startTime} - {item.endTime}
                            </li>

                          </ul>
                        </div>
                        {/* End content */}

                        <div className="option-box">
                          <ul className="option-list">
                            {/* <li>
                              <button data-text="View Course Time">
                                <Link data-text="View Course Time" href={`/courses-times/${item.id}`}>
                                  <span className="la la-eye"></span>
                                </Link>
                              </button>
                            </li> */}
                            {/* <li>
                              <button data-text="Edit Course Time">
                                <Link data-text="Edit Course Time" href={`/courses-times/edit/${item.id}`}>
                                  <span className="la la-pencil"></span>
                                </Link >
                              </button>
                            </li> */}
                            <li>
                              <DeleteModal id={item.id} />
                            </li>
                          </ul>
                        </div>
                        {/* End admin options box */}
                      </div>
                    </div>
                  )) :
                  coursesTimes && coursesTimes.length === 0 ?
                    <div className="text-center">
                      <span> No course time Found . Create new course for get started</span>
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
      {coursesTimes?.length > 0 && <Pagination />}
    </div>
  );
};

export default WidgetContentBox;
