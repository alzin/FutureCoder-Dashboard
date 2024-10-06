import dynamic from "next/dynamic";
import CreateUser from "@/components/pages/users/create"

export const metadata = {
    title: "Create User || Future Coders",
    description: "Future Coders",
};

const index = () => {

    return (
        <CreateUser />
    );
};

export default dynamic(() => Promise.resolve(index), {
    ssr: false,
});
