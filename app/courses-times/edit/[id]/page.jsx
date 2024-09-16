import dynamic from "next/dynamic";
import EditCourseTime from "@/components/pages/courses-times/edit"

export const metadata = {
    title: "Edit Course time || Future Coders",
    description: "Future Coders",
};

const index = ({ params }) => {

    const id = params.id;
   
    return (
        <EditCourseTime id={id} />
    );
};

export default dynamic(() => Promise.resolve(index), {
    ssr: false,
});
