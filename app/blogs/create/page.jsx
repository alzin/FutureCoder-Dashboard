import dynamic from "next/dynamic";
import CreateBlog from "@/components/pages/blogs/create-blog"

export const metadata = {
    title: "Create Bolg  || Future Coder",
    description: "Future Coder",
};

const index = () => {

    return (
        <CreateBlog />
    );
};

export default dynamic(() => Promise.resolve(index), {
    ssr: false,
});
