import MobileMenu from "@/components/header/MobileMenu";
import DashboardHeader from "@/components/header/DashboardHeader";
import DashboardEmployerSidebar from "@/components/header/DashboardSidebar";
import BreadCrumb from "@/components/BreadCrumb";
import MenuToggler from "@/components/MenuToggler";

import JobListingsTable from "./components/JobListingsTable";

const index = () => {
  return (
    <div className="page-wrapper dashboard">
      <span className="header-span"></span>
      {/* <!-- Header Span for hight --> */}

      {/* <LoginPopup /> */}
      {/* End Login Popup Modal */}

      <DashboardHeader />
      {/* End Header */}

      <MobileMenu />
      {/* End MobileMenu */}

      <DashboardEmployerSidebar />
      {/* <!-- End User Sidebar Menu --> */}

      {/* <!-- Dashboard --> */}
      <section className="user-dashboard">
        <div className="dashboard-outer">
          <BreadCrumb title="All Subscribers" />
          {/* breadCrumb */}

          <MenuToggler />
          {/* Collapsible sidebar button */}

          <div className="row">
            <div className="col-lg-12">
              {/* <!-- Ls widget --> */}
              <div className="ls-widget">
                <JobListingsTable />
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
