import dynamic from "next/dynamic";
import CoursesTimes from "@/components/pages/courses-times";

export const metadata = {
  title: "Courses Times List || Future Coders",
  description: "Future Coders",
};

const index = () => {
  return (
    <>
      <CoursesTimes />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
