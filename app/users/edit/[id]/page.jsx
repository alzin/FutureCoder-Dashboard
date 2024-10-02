import dynamic from "next/dynamic";
import EditUser from "@/components/pages/users/edit"

export const metadata = {
    title: "Edit User || Future Coders",
    description: "Future Coders",
};

const index = ({ params }) => {

    const id = params.id;

    return (
        <EditUser id={id} />
    );
};

export default dynamic(() => Promise.resolve(index), {
    ssr: false,
});
