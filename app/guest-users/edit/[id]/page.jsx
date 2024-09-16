import dynamic from "next/dynamic";
import EditGuestUsers from "@/components/pages/guest-users/edit"

export const metadata = {
    title: "Edit Guest Users || Future Coders",
    description: "Future Coders",
};

const index = ({ params }) => {

    const id = params.id;
   
    return (
        <EditGuestUsers id={id} />
    );
};

export default dynamic(() => Promise.resolve(index), {
    ssr: false,
});
