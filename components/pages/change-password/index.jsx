import MobileMenu from "@/components/header/MobileMenu";
import DashboardHeader from "@/components/header/DashboardHeader";
import DashboardSidebar from "@/components/header/DashboardSidebar";
import BreadCrumb from "@/components/BreadCrumb";
import Form from "./components/Form";
import MenuToggler from "@/components/MenuToggler";

const index = () => {
  return (
    <div className="page-wrapper dashboard">
      <span className="header-span"></span>
      {/* <!-- Header Span for hight --> */}

      <DashboardHeader />
      {/* End Header */}

      <MobileMenu />
      {/* End MobileMenu */}

      <DashboardSidebar />
      {/* <!-- End User Sidebar Menu --> */}

      {/* <!-- Dashboard --> */}
      <section className="user-dashboard">
        <div className="dashboard-outer">
          <BreadCrumb title="Change Password!" />
          {/* breadCrumb */}

          <MenuToggler />
          {/* Collapsible sidebar button */}

          <div className="ls-widget">
            <div className="widget-title">
              <h4>Change Password</h4>
            </div>

            <div className="widget-content">
              <Form />
            </div>
          </div>
          {/* <!-- Ls widget --> */}
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
