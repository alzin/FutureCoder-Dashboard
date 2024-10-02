import dynamic from "next/dynamic";
import CreateTestimonial from "@/components/pages/testimonials/create"

export const metadata = {
    title: "Create Testimonial  || Future Coders",
    description: "Future Coders",
};

const index = () => {

    return (
        <CreateTestimonial />
    );
};

export default dynamic(() => Promise.resolve(index), {
    ssr: false,
});
