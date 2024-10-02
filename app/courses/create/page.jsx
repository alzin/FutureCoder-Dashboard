import dynamic from "next/dynamic";
import CreateCourse from "@/components/pages/courses/create"

export const metadata = {
    title: "Create Course  || Future Coders",
    description: "Future Coders",
};

const index = () => {

    return (
        <CreateCourse />
    );
};

export default dynamic(() => Promise.resolve(index), {
    ssr: false,
});
