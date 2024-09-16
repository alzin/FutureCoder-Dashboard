import dynamic from "next/dynamic";
import EditBlog from "@/components/pages/blogs/edit-blog"

export const metadata = {
    title: "Edit Blog || Future Coder",
    description: "Future Coder",
};

const index = ({ params }) => {

    const id = params.id;
   
    return (
        <EditBlog id={id} />
    );
};

export default dynamic(() => Promise.resolve(index), {
    ssr: false,
});
