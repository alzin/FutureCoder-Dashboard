import MobileMenu from "@/components/header/MobileMenu";
import DashboardHeader from "@/components/header/DashboardHeader";
import DashboardSidebar from "@/components/header/DashboardSidebar";
import BreadCrumb from "@/components/BreadCrumb";
import MenuToggler from "@/components/MenuToggler";

import BlogListingsTable from "./components/BlogListingsTable";

const index = () => {
  return (
    <div className="page-wrapper dashboard">
      <span className="header-span"></span>

      <DashboardHeader />
      <MobileMenu />
      <DashboardSidebar />

      {/* <!-- Dashboard --> */}
      <section className="user-dashboard">
        <div className="dashboard-outer">
          <BreadCrumb title="All Blogs" />
          {/* breadCrumb */}

          <MenuToggler />
          {/* Collapsible sidebar button */}

          <div className="row">
            <div className="col-lg-12">
              {/* <!-- Ls widget --> */}
              <div className="ls-widget">
                <BlogListingsTable />
              </div>
            </div>
          </div>
          {/* End .row */}
        </div>
        {/* End dashboard-outer */}
      </section>
      {/* <!-- End Dashboard --> */}

      {/* <CopyrightFooter /> */}
      {/* <!-- End Copyright --> */}
    </div>
    // End page-wrapper
  );
};

export default index;
