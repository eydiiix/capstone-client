import InputErrorMessage from "@/components/error/InputErrorMessage";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Ripple, initTE } from "tw-elements";

function FormOne(props) {
    useEffect(() => {
        initTE({ Ripple });
    }, []);

    const {
        firstname,
        lastname,
        firstnameError,
        lastnameError,
        setLastnameError,
        setFirstnameError,
        handleChange,
        next,
    } = props;

    return (
        <div className="flex justify-start sm:w-8/12 md:w-6/12 lg:w-4/12 items-center flex-col">
            <label
                htmlFor="firstname"
                className="w-full py-1 text-sm text-slate-800 mt-3"
            >
                First Name
            </label>
            <input
                className={`w-full h-10 rounded-md px-3 focus:outline-0 border border-slate-300 focus:border-primary disabled:text-slate-400 focus:ring-1 ${
                    firstnameError
                        ? "animate-shake border-error ring-1 ring-error"
                        : ""
                }`}
                type="text"
                id="firstname"
                onChange={handleChange}
                onFocus={setFirstnameError}
                name="firstname"
                value={firstname}
            />
            <InputErrorMessage message={firstnameError} />
    
            <label
                htmlFor="lastname"
                className="w-full py-1 text-sm text-slate-800 mt-3"
            >
                Last Name
            </label>
            <input
                className={`w-full h-10 rounded-md px-3 focus:outline-0 border border-slate-300 focus:border-primary disabled:text-slate-400 focus:ring-1 ${
                    lastnameError
                        ? "animate-shake border-error ring-1 ring-error"
                        : ""
                }`}
                type="text"
                id="lastname"
                onChange={handleChange}
                onFocus={setLastnameError}
                name="lastname"
                value={lastname}
            />
            <InputErrorMessage message={lastnameError} />

            <button
                data-te-ripple-init
                data-te-ripple-color="light"
                type="button"
                className={`h-10  w-full mt-8 bg-primary rounded-md text-white font-semibold`}
                onClick={next}
            >
                Next
            </button>
            <p className="text-center  mt-3 text-slate-500 text-sm">
                Already have an account?
                <Link
                    className="ml-0.5 text-primary font-semibold"
                    to={"/signin"}
                >
                    Sign In
                </Link>
            </p>
        </div>
    );
}

export default FormOne;
