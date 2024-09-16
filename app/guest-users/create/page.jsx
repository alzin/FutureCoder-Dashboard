import dynamic from "next/dynamic";
import CreateGuestUsers from "@/components/pages/guest-users/create"

export const metadata = {
    title: "Create Guest Users  || Future Coders",
    description: "Future Coders",
};

const index = () => {

    return (
        <CreateGuestUsers />
    );
};

export default dynamic(() => Promise.resolve(index), {
    ssr: false,
});
