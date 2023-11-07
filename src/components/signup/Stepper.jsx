function Stepper({ step, count }) {
    const stepperClassNames = {
        2: "w-1/3",
        3: "w-2/3",
        4: "w-full",
    };

    const stepperClassName = stepperClassNames[step] || "w-0";

    return (
        <div className="flex relative justify-around w-10/12 sm:w-8/12 md:w-6/12 pt-[50px] pb-[60px] lg:w-4/12 h-10">
            <span className="absolute flex translate-x-[-50%] left-[50%] lg:w-[78%] md:w-[75%] w-[80%] z-[-1] h-[3px] translate-y-[-10px] bg-slate-200">
                <span
                    className={`bg-blue-300 flex ease-in duration-200 transition-all h-full 
                        ${stepperClassName}`}
                ></span>
            </span>

            <div className="flex w-6 flex-col items-center justify-center">
                <span
                    className={`flex min-h-[18px] min-w-[18px] text-xs ${
                        count === 1 ? "animate-beat" : ""
                    } justify-center items-center  rounded-full ${
                        step >= 1 ? " bg-blue-500" : "bg-slate-500"
                    } text-white`}
                >
                    1
                </span>
                <p className="text-[.65rem] font-medium text-slate-700 w-16 text-center">
                    Step 1
                </p>
            </div>
            <div className="flex w-6 flex-col items-center justify-center">
                <span
                    className={`flex min-h-[18px] min-w-[18px] text-xs ${
                        count === 2 ? "animate-beat" : ""
                    } justify-center items-center rounded-full ${
                        step >= 2 ? "bg-blue-500" : "bg-slate-500"
                    } text-white`}
                >
                    2
                </span>
                <p className="text-[.65rem] font-medium text-slate-700 w-16 text-center">
                    Step 2
                </p>
            </div>

            <div className="flex w-6 flex-col items-center justify-center">
                <span
                    className={`flex min-h-[18px] min-w-[18px] text-xs ${
                        count === 3 ? "animate-beat" : ""
                    } justify-center items-center rounded-full ${
                        step >= 3 ? "bg-blue-500" : "bg-slate-500"
                    } text-white`}
                >
                    3
                </span>
                <p className="text-[.65rem] font-medium text-slate-700 w-16 text-center">
                    Step 3
                </p>
            </div>
            <div className="flex w-6 flex-col items-center justify-center text-[0.75rem]">
                <span
                    className={`flex min-h-[18px] min-w-[18px] text-xs ${
                        count === 4 ? "animate-beat" : ""
                    } justify-center items-center rounded-full ${
                        step >= 4 ? "bg-blue-500" : "bg-slate-500"
                    } text-white`}
                >
                    4
                </span>
                <p className="text-[.65rem] font-medium text-slate-700 w-16 text-center">
                    Final
                </p>
            </div>
        </div>
    );
}

export default Stepper;
