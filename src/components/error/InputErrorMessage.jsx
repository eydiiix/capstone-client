import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation as errorIcon } from "@fortawesome/free-solid-svg-icons";

function InputErrorMessage({ message }) {
    return (
        <>
            {message && (
                <p className="text-error w-full text-xs py-1">
                    <FontAwesomeIcon
                        className="text-error w-3 px-1"
                        icon={errorIcon}
                        size="lg"
                        shake
                    />
                    {message}
                </p>
            )}
        </>
    );
}

export default InputErrorMessage;
