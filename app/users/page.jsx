import dynamic from "next/dynamic";
import Users from "@/components/pages/users";

export const metadata = {
  title: "Users List || Future Coders",
  description: "Future Coders",
};

const index = () => {
  return (
    <>
      <Users />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
