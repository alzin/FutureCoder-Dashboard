import dynamic from "next/dynamic";
import CreateReservation from "@/components/pages/reservations/create"

export const metadata = {
    title: "Create Reservation  || Future Coders",
    description: "Future Coders",
};

const index = () => {

    return (
        <CreateReservation />
    );
};

export default dynamic(() => Promise.resolve(index), {
    ssr: false,
});
