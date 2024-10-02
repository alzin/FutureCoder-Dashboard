import dynamic from "next/dynamic";
import EditTestimonial from "@/components/pages/testimonials/edit"

export const metadata = {
    title: "Edit Testimonial || Future Coders",
    description: "Future Coders",
};

const index = ({ params }) => {

    const id = params.id;

    return (
        <EditTestimonial id={id} />
    );
};

export default dynamic(() => Promise.resolve(index), {
    ssr: false,
});
