import FormInfoBox from "./FormInfoBox";
import LogoCoverUploader from "./LogoCoverUploader";

const index = ({ id }) => {
    return (
        <div className="widget-content">
            <FormInfoBox id={id} />
            {/* compnay info box */}
        </div>
    );
};

export default index;
