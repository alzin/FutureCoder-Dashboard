"use client";

import Pagination from "./Pagination";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useSelector, useDispatch } from "react-redux";
import DeleteModal from "./DeleteModal";
import Link from "next/link";
import { useEffect } from "react";
import { getUsers } from "@/states/users/handleRequests";
const WidgetContentBox = () => {

  const dispatch = useDispatch();
  const { users, totalCount, currentPage } = useSelector(state => state.users)


  useEffect(() => {
    dispatch(getUsers({ currentPage }))
  }, [])


  return (
    <div className="widget-content">
      <div className="tabs-box">
        <Tabs>
          <div className="aplicants-upper-bar">
            {/* <h6>Senior Product Designer</h6> */}

            <TabList className="aplicantion-status tab-buttons clearfix w-100">
              <Tab className="tab-btn totals ms-0"> Total(s): {totalCount}</Tab>
              {/* <Link href={"/users/create"} className="theme-btn btn-style-one ms-auto">
                Create New User
              </Link> */}
            </TabList>
          </div>

          <div className="tabs-content">
            <TabPanel>
              <div className="row pb-3">
                {users && users.length > 0 ?
                  users.map((item) => (
                    <div
                      className="candidate-block-three col-lg-4 col-md-6 col-sm-12"
                      key={item.id}
                    >
                      <div className="inner-box flex-column	">
                        <div className="content ps-0">
                          <ul className="candidate-info justify-content-between">
                            <li className="ps-0 w-100">
                              <span>UserName : </span>
                              {item.firstName} {item.lastName}
                            </li>

                            <li className="ps-0 w-100">
                              <span>Email : </span>
                              {item.email}
                            </li>

                            <li className="ps-0 w-100">
                              <span>Age :</span>
                              {item.age}
                            </li>

                            <li className="ps-0 w-100">
                              <span>Created :</span>
                              {item.created_at.split('T')[0]}
                            </li>

                            {/* <li className={`ps-0 ${item.is_visible ? "text-success" : "text-danger"}`}>
                              {item.is_visible ? <span>Visible</span> : <span>unVisible</span>}
                            </li> */}

                          </ul>
                        </div>
                        {/* End content */}

                        <div className="option-box">
                          <ul className="option-list">
                            <li>
                              <button data-text="Edit User">
                                <Link data-text="Edit User" href={`/users/edit/${item.id}`}>
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
                  users && users.length === 0 ?
                    <div className="text-center">
                      <span> No users Found . Create new course for get started</span>
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
      {users?.length > 0 && <Pagination />}
    </div>
  );
};

export default WidgetContentBox;
