import Wrapper from "@/layout/Wrapper";
import DashboadHome from "@/components/pages/dashboard"


export const metadata = {
  title: "Dashboard || Future Coder",
  description: "Future Coder",
};

export default function page() {

  return (
    <Wrapper>
      <DashboadHome />
    </Wrapper>
  );
}


