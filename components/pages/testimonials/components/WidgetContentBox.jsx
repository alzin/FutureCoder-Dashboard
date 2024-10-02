"use client";

import Pagination from "./Pagination";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useSelector, useDispatch } from "react-redux";
import DeleteModal from "./DeleteModal";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";
import { getTestimonials, toggleTestimonial } from "@/states/testimonials/handleRequests";
const WidgetContentBox = () => {

  const dispatch = useDispatch();
  const { testimonials, totalCount, currentPage } = useSelector(state => state.testimonials)
  // const [toggle, setToggle] = useState(null)
  const router = useRouter();


  useEffect(() => {
    dispatch(getTestimonials({ currentPage }))
  }, [])

  const handleToggleVisible = (testimonialId) => {
    dispatch(toggleTestimonial({ testimonialId })).unwrap().then(
      () => {
        dispatch(getTestimonials({ currentPage }))
      });
  }
  return (
    <div className="widget-content">
      <div className="tabs-box">
        <Tabs>
          <div className="aplicants-upper-bar">
            {/* <h6>Senior Product Designer</h6> */}

            <TabList className="aplicantion-status tab-buttons clearfix w-100">
              <Tab className="tab-btn totals ms-0"> Total(s): {totalCount}</Tab>
              <Link href={"/testimonials/create"} className="theme-btn btn-style-one ms-auto">
                Create New Testimonial
              </Link>
            </TabList>
          </div>

          <div className="tabs-content">
            <TabPanel>
              <div className="row pb-3">
                {testimonials && testimonials.length > 0 ?
                  testimonials.map((item) => (
                    <div
                      className="candidate-block-three col-lg-4 col-md-6 col-sm-12"
                      key={item.id}
                    >
                      <div className="inner-box flex-column	">
                        <div className="content ps-0">
                          <ul className="candidate-info justify-content-between">
                            <li className="ps-0 w-100">
                              <span>UserName : </span>
                              <Link href={`/users/${item.userId}`}>{item.user?.firstName} {item.user?.lastName} </Link>
                            </li>

                            <li className="ps-0 w-100">
                              <span>Email : </span>
                              {item.user?.email}
                            </li>

                            <li className="ps-0 w-100">
                              <span>Rating :</span>
                              {item.rating}
                            </li>

                            <li className="ps-0 w-100">
                              <span>Created :</span>
                              {item.created_at.split('T')[0]}
                            </li>

                            <li className="ps-0 w-100">
                              <span>Opinion :</span>
                              {item.description}
                            </li>
                            <li className={`ps-0 ${item.is_visible ? "text-success" : "text-danger"}`}>
                              {item.is_visible ? <span>Visible</span> : <span>unVisible</span>}
                            </li>

                          </ul>
                        </div>
                        {/* End content */}

                        <div className="option-box">
                          <ul className="option-list">
                            <li>
                              <button data-text="Toggle Show" onClick={() => handleToggleVisible(item.id)}>
                                {item.is_visible ? <span className="la la-times"></span> :
                                  <span className="la la-check"></span>}
                              </button>
                            </li>
                            <li>
                              <button data-text="Edit Course">
                                <Link data-text="Edit Course" href={`/testimonials/edit/${item.id}`}>
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
                  testimonials && testimonials.length === 0 ?
                    <div className="text-center">
                      <span> No testimonials Found . Create new course for get started</span>
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
      {testimonials?.length > 0 && <Pagination />}
    </div>
  );
};

export default WidgetContentBox;
