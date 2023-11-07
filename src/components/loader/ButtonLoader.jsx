import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function ButtonLoader({name='', condition, size='lg', children}) {

    return (
        <>
            {condition ? (
                <FontAwesomeIcon icon={faSpinner} size={size} spin pulse />
            ) : (
                name
            )}
        </>
    );
}

export default ButtonLoader;
