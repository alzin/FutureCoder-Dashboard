"use client"
import Link from "next/link";
import Pagination from "./Pagination";
import DeleteModal from './DeleteModal'
import EditModal from "./EditModal";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSubscribers } from "@/states/subscribers/handleRequests";

const JobListingsTable = () => {

  const dispatch = useDispatch();
  const { subscribers, currentPage, totalCount } = useSelector(state => state.subscribers)

  useEffect(() => {
    dispatch(getSubscribers({ currentPage }));
  }, [])

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>List Of Subscribers : {totalCount}</h4>

        <div className="chosen-outer">
          <Link href={"/subscribers/create"} className="theme-btn btn-style-one">
            Create New Subscriber
          </Link>
        </div>
      </div>
      {/* End filter top bar */}

      {/* Start table widget content */}
      <div className="widget-content">
        <div className="table-outer">
          <table className="default-table manage-job-table">
            <thead>
              <tr>
                <th>Subscriber Email</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody className="w-100">
              {subscribers && subscribers.length > 0 ? subscribers.map((item) => (
                <tr key={item.id}>
                  <td>
                    {/* <!-- Job Block --> */}
                    <div className="job-block">
                      <div className="inner-box">
                        <h4 className={item.email_verified ? "text-success" : "text-danger"}>
                          {item.email}
                        </h4>
                      </div>
                    </div>
                  </td>
                  {/* <td className="applied">
                    <a href="#">3+ Applied</a>
                  </td> */}
                  <td>
                    {item.created_at}
                  </td>
                  {/* <td className="status">Active</td> */}
                  <td>
                    <div className="option-box">
                      <ul className="option-list">
                        <li>
                          <EditModal id={item.id} email={item.email} />
                        </li>
                        <li>
                          <DeleteModal id={item.id} />
                          {/*  */}
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              )) :
                subscribers && subscribers.length === 0 ?
                  <tr>
                    <td colSpan="3" className="text-center"> No subscribers Found. Create a new subscriber to get started.</td>
                  </tr>
                  : (
                    <tr>
                      <td colSpan={5} className="">
                        <div className="mx-auto spinner-border text-primary d-flex justify-content-center" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                      </td>
                    </tr>
                  )
              }
            </tbody>
          </table>
        </div>
        {subscribers?.length > 0 && <Pagination />}

      </div>
      {/* End table widget content */}
    </div>
  );
};

export default JobListingsTable;
