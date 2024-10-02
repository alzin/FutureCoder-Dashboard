import dynamic from "next/dynamic";
import CreateCourseTime from "@/components/pages/courses-times/create"

export const metadata = {
    title: "Create Course Time  || Future Coders",
    description: "Future Coders",
};

const index = () => {

    return (
        <CreateCourseTime />
    );
};

export default dynamic(() => Promise.resolve(index), {
    ssr: false,
});
