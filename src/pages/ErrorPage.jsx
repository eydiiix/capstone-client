import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col w-screen justify-center items-center  h-screen">
            <h1 className="text-[6rem] text-slate-800 font-bold">404</h1>
            <h1 className="text-slate-700 font-semibold text-sm">Whoops!</h1>
            <p className="text-slate-500 text-sm py-1">
                We couldn't find site you looking for...
            </p>
            <button
                onClick={() => navigate("/")}
                className="h-10 w-[180px] text-slate-500 rounded mt-16 border-2 border-slate-400 "
            >
                <FontAwesomeIcon
                    className="text-slate-500 pr-4"
                    icon={faArrowLeft}
                />
                back to home
            </button>
        </div>
    );
}

export default ErrorPage;
