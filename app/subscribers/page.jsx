import dynamic from "next/dynamic";
import Subscribers from "@/components/pages/subscribers";

export const metadata = {
  title: "Subscribers List || Future Coder",
  description: "Future Coder",
};

const index = () => {
  return (
    <>
      <Subscribers />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
