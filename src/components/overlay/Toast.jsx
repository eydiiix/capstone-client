
import {
    faCheck,
    faExclamation,
    faInfo,
    faQuestion,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CustomToast({
    show,
    dismiss,
    title,
    desc,
    bottom = false,
    type = "success"
}) {

    console.log(show);

    const typeMap = {
        error: {
            icon: faExclamation,
            primary_color: "bg-red-400",
            secondary_color: "bg-red-200",
            border_color: "border-red-200",
            text_color: "text-red",
        },
        info: {
            icon: faInfo,
            primary_color: "bg-blue-400",
            secondary_color: "bg-blue-200",
            border_color: "border-blue-200",
            text_color: "text-blue",
        },
        question: {
            icon: faQuestion,
            primary_color: "bg-yellow-400",
            secondary_color: "bg-yellow-200",
            border_color: "border-yellow-200",
            text_color: "text-yellow",
        },
        success: {
            icon: faCheck,
            primary_color: "bg-green-400",
            secondary_color: "bg-green-200",
            border_color: "border-green-200",
            text_color: "text-green",
        },
    };

    const { icon, primary_color, secondary_color, border_color, text_color } =
        typeMap[type] || typeMap["success"];

    return (
        <div
            className={`absolute bg-white z-50 transition-all lg:right-5 opacity-0 ease-in duration-[100ms] ${bottom ? "bottom-5" : "top-5"}
            }`}
        >
            <div
                className={`flex h-[90px] flex-col border pt-1 justify-between relative ${border_color}  w-96 shadow-lg rounded-md overflow-hidden select-none`}
            >
                <h1 className="pt-1 flex w-full font-semibold text-slate-800 items-center text-[.95rem]">
                    <FontAwesomeIcon
                        icon={icon}
                        className={`h-5 w-5 rounded-full ${text_color} ${secondary_color} p-2 scale-50`}
                    />
                    {title}
                </h1>
                <p className="px-3 text-sm text-slate-600">{desc}</p>
                <button
                    className="rounded-full bg-transparent absolute top-2 right-4 text-slate-400 focus:outline-none"
                    onClick={dismiss}
                >
                    <FontAwesomeIcon icon={faXmark} />
                </button>
                <footer
                    className={`flex flex-full mt-auto ${secondary_color} h-1`}
                >
                    <span className={`flex w-1/4 ${primary_color}`}></span>
                </footer>
            </div>
        </div>
    );
}

export default CustomToast;
