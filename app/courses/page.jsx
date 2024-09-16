import dynamic from "next/dynamic";
import Courses from "@/components/pages/courses";

export const metadata = {
  title: "Courses List || Future Coders",
  description: "Future Coders",
};

const index = () => {
  return (
    <>
      <Courses />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
