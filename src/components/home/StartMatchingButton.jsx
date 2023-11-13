import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function StartMatchingButton({ onClick }) {
    return (
        <button
            onClick={onClick}
            className=" flex items-center lg:flex-row flex-col-reverse justify-between py-6 lg:px-10 px-4 bg-gradient-to-br from-primary to-secondary rounded-3xl lg:rounded-xl mb-24 lg:mb-0 text-white font-bold  lg:h-16 h-32 w-60 lg:w-96"
        >
            <span className="lg:pr-5 justify-center flex w-full">
                START VIDEO CALL
            </span>
            <FontAwesomeIcon
                className="lg:pl-10 h-8 w-8 lg:border-l-2  border-white"
                icon={faVideo}
            />
        </button>
    );
}

export default StartMatchingButton;
