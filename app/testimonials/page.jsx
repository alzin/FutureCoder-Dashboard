import dynamic from "next/dynamic";
import Testimonials from "@/components/pages/testimonials";

export const metadata = {
  title: "Testimonials List || Future Coders",
  description: "Future Coders",
};

const index = () => {
  return (
    <>
      <Testimonials />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
