import dynamic from "next/dynamic";
import Blogs from "@/components/pages/blogs";

export const metadata = {
  title: "Blogs List || Future Coder",
  description: "Future-coder",
};

const index = () => {
  return (
    <>
      <Blogs />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
