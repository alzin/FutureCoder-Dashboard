import dynamic from "next/dynamic";
import Reservations from "@/components/pages/reservations"

export const metadata = {
  title: "Reservations List || Future Coders",
  description: "Future Coders",
};

const index = () => {
  return (
    <>
      <Reservations />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
