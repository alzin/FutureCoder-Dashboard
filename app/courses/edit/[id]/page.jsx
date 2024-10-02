import dynamic from "next/dynamic";
import EditCourse from "@/components/pages/courses/edit"

export const metadata = {
    title: "Edit Course || Future Coders",
    description: "Future Coders",
};

const index = ({ params }) => {

    const id = params.id;
   
    return (
        <EditCourse id={id} />
    );
};

export default dynamic(() => Promise.resolve(index), {
    ssr: false,
});
