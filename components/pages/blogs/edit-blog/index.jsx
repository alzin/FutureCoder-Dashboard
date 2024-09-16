import MobileMenu from "@/components/header/MobileMenu";
import DashboardHeader from "@/components/header/DashboardHeader";
import DashboardSidebar from "@/components/header/DashboardSidebar";
import BreadCrumb from "@/components/BreadCrumb";
import MenuToggler from "@/components/MenuToggler";

import Blog from "./components/Blog";


const index = ({id}) => {
    return (
        <div className="page-wrapper dashboard">
            <span className="header-span"></span>
          
            <DashboardHeader />
            {/* End Header */}

            <MobileMenu />
            {/* End MobileMenu */}

            <DashboardSidebar />
            {/* <!-- End User Sidebar Menu --> */}

            {/* <!-- Dashboard --> */}
            <section className="user-dashboard">
                <div className="dashboard-outer">
                    <BreadCrumb title="Edit Blog" />
                    {/* breadCrumb */}

                    <MenuToggler />
                    {/* Collapsible sidebar button */}

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="ls-widget">
                                <div className="tabs-box">
                                    <div className="widget-title">
                                    </div>
                                    <Blog id={id}/>
                                </div>
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
