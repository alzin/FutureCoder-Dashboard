import dynamic from "next/dynamic";
import Course from "@/components/pages/courses/course";

export const metadata = {
    title: "Course || Future Coders",
    description: "Future Coders",
};

const index = ({ params }) => {
    const id = params.id;


    return (
        <Course id={id} />
    );
};

export default dynamic(() => Promise.resolve(index), {
    ssr: false,
});
