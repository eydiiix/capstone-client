import { Link } from "react-router-dom";


const TermsModal = ({ agreedToTerms, setAgreedToTerms, handleAgree, handleDecline }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">
                    <Link to="/terms" className="text-primary">
                        Terms and Conditions
                    </Link>
                </h2>
                <div className="flex items-center mb-4">
                    <input
                        type="checkbox"
                        checked={agreedToTerms}
                        onChange={() => setAgreedToTerms(!agreedToTerms)}
                        className="mr-2"
                    />
                    <span>
                        By clicking, you are agreed to Terms and Condition.
                        (Click the Terms and Condition above for more info)
                    </span>
                </div>
                <div className="flex">
                    <button
                        className={`bg-primary text-white px-4 py-2 rounded-md font-semibold ${
                            !agreedToTerms ? "cursor-not-allowed opacity-50" : ""
                        } mr-2`}
                        onClick={handleAgree}
                        disabled={!agreedToTerms}
                    >
                        Agree
                    </button>
                    <button
                        className="bg-red-300 text-red-600 px-4 py-2 rounded-md font-semibold"
                        onClick={handleDecline}
                    >
                        Decline
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TermsModal;
