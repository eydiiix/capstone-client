function YesNoModal({condition, Yes=()=>{}, No=()=>{}, title='', description=''}) {
    return (
        <div
            className={`${
                condition ? "flex" : "hidden"
            } items-center justify-center bg-black/30 backdrop-blur-sm w-screen h-screen absolute right-0 top-0 z-50`}
        >
            <div className="bg-white w-72 h-fit pt-6 overflow-hidden shadow-lg rounded-lg">
                <h1 className="font-semibold text-center">{title}</h1>
                <h1 className="text-slate-700 text-[0.8rem] pb-2 text-center">
                    {description}
                </h1>
                <div className="flex border-t mt-4">
                    <button
                        className="h-10 w-full border-r px-6 font-semibold text-slate-500"
                        onClick={No}
                    >
                        No
                    </button>
                    <button
                        className="h-10 w-full px-6 font-semibold  text-error"
                        onClick={Yes}
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
}

export default YesNoModal;
