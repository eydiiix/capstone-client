import Matching from "../loader/Matching";


const MatchingContainer = ({ matching, cancel }) => {
    return (
        <div
            className={`w-screen ${
                matching ? "opacity-100 z-[60] flex" : "opacity-0 z-0 hidden"
            } duration-200 transition-all ease-linear flex-col items-center justify-center p-10 bg-gradient-to-br from-primary to-secondary h-screen absolute top-0 left-0`}
        >
            <Matching />
            <h1 className="absolute top-14 text-lg font-medium text-white">
                Matching...
            </h1>
            <button
                className="absolute bottom-12 text-lg border px-4 py-1 rounded-l-full cursor-pointer rounded-r-full text-white z-10"
                onClick={cancel}
            >
                Cancel
            </button>
        </div>
    );
};

export default MatchingContainer;
