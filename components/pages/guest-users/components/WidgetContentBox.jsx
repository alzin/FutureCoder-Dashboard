"use client";

import Pagination from "./Pagination";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Link from "next/link";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import DeleteModal from "./DeleteModal";
import { useEffect } from "react";
import { getGuestUsers } from "@/states/guestUsers/handleRequests";

const WidgetContentBox = () => {

  const dispatch = useDispatch();
  const { guestUsers, totalCount, currentPage } = useSelector(state => state.guestUsers)

  useEffect(() => {
    dispatch(getGuestUsers({ currentPage }));
  }, [])

  return (
    <div className="widget-content">
      <div className="tabs-box">
        <Tabs>
          <div className="aplicants-upper-bar">
            {/* <h6>Senior Product Designer</h6> */}

            <TabList className="aplicantion-status tab-buttons clearfix w-100">
              <Tab className="tab-btn totals ms-0"> Total(s): {totalCount}</Tab>
              {/* <Link href={"/guest-users/create"} className="theme-btn btn-style-one ms-auto">
                Create New Guest Users
              </Link> */}
            </TabList>
          </div>

          <div className="tabs-content">
            <TabPanel>
              <div className="row pb-3">
                {guestUsers && guestUsers.length > 0 ?
                  guestUsers.map((item) => (
                    <div
                      className="candidate-block-three col-lg-4 col-md-6 col-sm-12"
                      key={item.id}
                    >
                      <div className="inner-box">
                        <div className="content ps-0">

                          <ul className="candidate-info justify-content-between">
                            <li className="ps-0">
                              <span>FirstName : </span>
                              {item.firstName}
                            </li>

                            <li className="ps-0">
                              <span>LastName : </span>
                              {item.lastName}
                            </li>

                            <li className="ps-0">
                              <span>Age :</span>
                              {item.age}
                            </li>

                            <li className={`ps-0 ${item.email_verified ? "text-success" : "text-danger"}`}>
                              <span>Email :</span>
                              {item.email}
                            </li>
                          </ul>
                        </div>
                        {/* End content */}

                        <div className="option-box">
                          <ul className="option-list">
                            {/* <li>
                              <button data-text="Edit Course">
                                <Link data-text="Edit Course" href={`/guest-users/edit/${item.id}`}>
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
                  guestUsers && guestUsers.length === 0 ?
                    <div className="text-center">
                      <span> No guestUsers Found . Create new course for get started</span>
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
      {guestUsers?.length > 0 && <Pagination />}
    </div>
  );
};

export default WidgetContentBox;
