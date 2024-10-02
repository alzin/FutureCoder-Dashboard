import MobileMenu from "@/components/header/MobileMenu";
import DashboardHeader from "@/components/header/DashboardHeader";
import DashboardEmployerSidebar from "@/components/header/DashboardSidebar";
import BreadCrumb from "@/components/BreadCrumb";
import MenuToggler from "@/components/MenuToggler";

import WidgetContentBox from "./components/WidgetContentBox";

const index = () => {
  return (
    <div className="page-wrapper dashboard">
      <span className="header-span"></span>

      <DashboardHeader />
      {/* End Header */}

      <MobileMenu />
      {/* End MobileMenu */}

      <DashboardEmployerSidebar />
      {/* <!-- End User Sidebar Menu --> */}

      {/* <!-- Dashboard --> */}
      <section className="user-dashboard">
        <div className="dashboard-outer">
          <BreadCrumb title="All Courses Times!" />
          {/* breadCrumb */}

          <MenuToggler />
          {/* Collapsible sidebar button */}

          <div className="row">
            <div className="col-lg-12">
              {/* <!-- Ls widget --> */}
              <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-title">
                    {/* <h4>Applicant</h4>
                    <WidgetTopFilterBox /> */}
                  </div>
                  {/* End top widget filter bar */}

                  <WidgetContentBox />
                  {/* End widget-content */}
                </div>
              </div>
            </div>
          </div>
          {/* <Pagination /> */}
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
