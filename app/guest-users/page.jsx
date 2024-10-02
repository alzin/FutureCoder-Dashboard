import dynamic from "next/dynamic";
import GuestUsers from "@/components/pages/guest-users";

export const metadata = {
  title: "Guest Users List || Future Coders",
  description: "Future Coders",
};

const index = () => {
  return (
    <>
      <GuestUsers />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
