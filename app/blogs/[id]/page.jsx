import dynamic from "next/dynamic";
import Blog from "@/components/pages/blogs/blog";

export const metadata = {
    title: "Blog Page || Future Coder",
    description: "Future Coder",
};

const BlogPage = ({ params }) => {

    const id = params.id;
   
    return (
        <Blog id={id} />
    );
};

export default dynamic(() => Promise.resolve(BlogPage), {
    ssr: false,
});
