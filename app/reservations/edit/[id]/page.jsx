import dynamic from "next/dynamic";
import EditCourse from "@/components/pages/reservations/edit"

export const metadata = {
    title: "Edit Reservation || Future Coders",
    description: "Future Coders",
};

const index = ({ params }) => {

    const id = params.id;
   
    return (
        <EditReservation id={id} />
    );
};

export default dynamic(() => Promise.resolve(index), {
    ssr: false,
});
