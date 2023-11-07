function Tooltip({ name, children }) {
    return (
        <div className="group flex relative">
            <span
                className={`group-hover:opacity-100 transition-opacity bg-white text-slate-700 font-semibold text-xs rounded-l-full rounded-r-full absolute w-24 flex justify-center mt-5 translate-x-[-50px] left-0 px-2 py-1 translate-y-[-100%] opacity-0`}
            >
                {name}
            </span>
            {children}
        </div>
    );
}

export default Tooltip;
