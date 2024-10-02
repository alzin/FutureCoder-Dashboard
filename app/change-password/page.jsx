import dynamic from "next/dynamic";
import ChangePassword from "@/components/pages/change-password";

export const metadata = {
  title: "Change Password || Future Coder ",
  description: "Future Coder ",
};

const index = () => {
  return (
    <>
      <ChangePassword />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
