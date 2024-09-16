"use client"
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "./Pagination";
import DeleteModal from './DeleteModal'
import { getBlogs } from "@/states/blogs/handleRequests";
import { useEffect } from "react";

const BlogListingsTable = () => {
  const dispatch = useDispatch();

  const { blogs, currentPage, totalCount } = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(getBlogs({ currentPage }));
  }, [])

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>List Of blogs : {totalCount}</h4>

        <div className="chosen-outer">
          <Link href={"/blogs/create"} className="theme-btn btn-style-one">
            Create New Blog
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
                <th>Blog Title</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody className="w-100">
              {blogs && blogs.length > 0 ? blogs.map((item) => (
                <tr key={item.id} >
                  <td>
                    {/* <!-- Job Block --> */}
                    <div className="job-block">
                      <div className="inner-box">
                        <h4>
                          <Link
                            href={`/blogs/${item.id}`}
                          >
                            {item.title}
                          </Link>
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
                          <button data-text="View Blog Detailes">
                            <Link data-text="View Blog Detailes" href={`/blogs/${item.id}`}>
                              <span className="la la-eye"></span>
                            </Link>
                          </button>
                        </li>
                        <li>
                          <button data-text="Edit Blog">
                            <Link data-text="Edit Blog" href={`/blogs/edit/${item.id}`}>
                              <span className="la la-pencil"></span>
                            </Link>
                          </button>
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
                blogs && blogs.length === 0 ?
                  <tr>
                    <td colSpan="3" className="text-center"> No Blogs Found. Create a new Blog to get started.</td>
                  </tr>
                  :
                  (
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
        {blogs?.length > 0 && <Pagination />}
      </div>
      {/* End table widget content */}
    </div>
  );
};

export default BlogListingsTable;
