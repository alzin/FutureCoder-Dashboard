import dynamic from "next/dynamic";
import CreateSubscriber from "@/components/pages/subscribers/create"

export const metadata = {
    title: "Create Subscribers || Future Coder",
    description: "Future Coder",
};

const index = () => {

    return (
        <CreateSubscriber />
    );
};

export default dynamic(() => Promise.resolve(index), {
    ssr: false,
});
