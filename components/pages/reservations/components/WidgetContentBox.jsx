"use client";

import Pagination from "./Pagination";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Link from "next/link";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import DeleteModal from "./DeleteModal";
import { useEffect } from "react";
import { getBookings } from "@/states/bookings/handleRequests";
import { getTimeZone } from "@/utils/algorithms";

const WidgetContentBox = () => {

  const dispatch = useDispatch();
  const { bookings, totalCount, currentPage } = useSelector(state => state.bookings)

  useEffect(() => {
    const timezone = getTimeZone()
    console.log(timezone)
    dispatch(getBookings({ currentPage, timezone }));
  }, [])

  const isOldDate = (timeString, dateString) => {
    const currentDate = new Date();
    const timeToCompare = new Date(`${dateString}T${timeString}`);
    return timeToCompare < currentDate;
  };

  return (
    <div className="widget-content">
      <div className="tabs-box">
        <Tabs>
          <div className="aplicants-upper-bar">

            <TabList className="aplicantion-status tab-buttons clearfix w-100">
              <Tab className="tab-btn totals ms-0"> Total(s): {totalCount}</Tab>
              <Link href={"/reservations/create"} className="theme-btn btn-style-one ms-auto">
                Create New Reservations
              </Link>
            </TabList>
          </div>

          <div className="tabs-content">
            <TabPanel>
              <div className="row pb-3">
                {bookings && bookings.length > 0 ?
                  bookings.map((item) => (
                    <div
                      className="candidate-block-three col-lg-4 col-md-12 col-sm-12"
                      key={item.freeLessonId}
                    >
                      <div className="inner-box">
                        <div className="content ps-0 ">

                          <ul className="candidate-info justify-content-between flex-column align-items-start">
                            <li className="ps-0">
                              <span>Course Name : </span>
                              {item.courseName}
                            </li>

                            <li className="ps-0">
                              <span>User Name : </span>
                              {item.guestUserName}
                            </li>

                            <li className="ps-0">
                              <span>User Age :</span>
                              {item.userAge}
                            </li>

                            <li className="ps-0">
                              <span>User Email :</span>
                              {item.userEmail}
                            </li>

                            <li className={`ps-0 ${isOldDate(item.lessoStartTime, item.lessonDate) ? "text-danger" : ""}`}>
                              <span>Date :</span>
                              {item.lessonDate}
                            </li>

                            <li className={`ps-0 ${isOldDate(item.lessoStartTime, item.lessonDate) ? "text-danger" : ""}`}>
                              <span>Time :</span>
                              {item.lessoStartTime} - {item.lessoEndTime}
                            </li>

                            <li className="ps-0">
                              <span>Google Meet Url :</span>
                              <a href={item.googleMeetUrl} target="_blank" rel="noopener noreferrer">{item.googleMeetUrl}</a>
                            </li>


                          </ul>
                        </div>
                        {/* End content */}

                        <div className="option-box">
                          <ul className="option-list">
                            {/* <li>
                              <button data-text="Edit Reservation">
                                <Link data-text="Edit Reservation" href={`/reservations/edit/${item.id}`}>
                                  <span className="la la-pencil"></span>
                                </Link >
                              </button>
                            </li> */}
                            <li>
                              <DeleteModal id={item.freeLessonId} />
                            </li>
                          </ul>
                        </div>
                        {/* End admin options box */}
                      </div>
                    </div>
                  )) :
                  bookings && bookings.length === 0 ?
                    <div className="text-center">
                      <span> No Reservations Found . Create new Reservation for get started</span>
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
      {bookings?.length > 0 && <Pagination />}
    </div>
  );
};

export default WidgetContentBox;
