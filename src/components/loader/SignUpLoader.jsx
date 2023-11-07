import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SignUpLoader() {
    return (
        <div className="flex h-screen w-screen gap-2 justify-center items-center z-50 backdrop-blur-sm bg-black/40 absolute top-0 left-0">
            <div className="flex justify-center items-center relative  p-4 shadow-lg bg-white rounded-md ">
                <FontAwesomeIcon
                    className="mr-3 text-primary"
                    icon={faSpinner}
                    spinPulse
                    size="lg"
                />
                <h1 className="text-[0.75rem] lg:text-sm font-semibold">
                    Please wait while we create your account...
                </h1>
            </div>
        </div>
    );
}

export default SignUpLoader;
