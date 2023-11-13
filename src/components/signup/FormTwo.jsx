import { useEffect } from "react";
import InputErrorMessage from "../error/InputErrorMessage";
import { Ripple, initTE } from "tw-elements";
import Datepicker from "react-tailwindcss-datepicker";
import {
    calculateCurrentDateMinus12Years,
    calculateCurrentDateMinus60Years,
} from "@/utils/date";

function FormTwo(props) {
    useEffect(() => {
        initTE({ Ripple });
    }, []);

    const {
        gender,
        birthday,
        genderError,
        birthdayError,
        setBirthdayError,
        setGenderError,
        handleChange,
        handleDateChange,
        next,
        back,
    } = props;

    return (
        <div className="flex justify-start w-10/12 lg:h-4/5 sm:w-8/12 md:w-6/12 lg:w-4/12 items-center flex-col">
            <label
                htmlFor="gender"
                className="w-full py-1 text-sm text-slate-800 mt-3"
            >
                Gender
            </label>
            <select
                className={`w-full bg-white h-10 rounded-md px-3 focus:outline-0 border border-slate-300 focus:border-primary disabled:text-slate-400 focus:ring-1 ${
                    genderError
                        ? "animate-shake border-error ring-1 ring-error"
                        : ""
                }`}
                name="gender"
                id="gender"
                value={gender}
                onChange={handleChange}
                onFocus={setGenderError}
            >
                <option value="" hidden>
                    Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
            <InputErrorMessage message={genderError} />
            <label className="w-full py-1 text-sm text-slate-800 mt-3">
                Birthday
            </label>
            <div className="flex w-full" onClick={setBirthdayError}>
                <Datepicker
                    inputClassName={`w-full bg-white h-10 rounded-md px-3 focus:outline-0 border border-slate-300 focus:border-primary disabled:text-slate-400 focus:ring-1 ${
                        birthdayError
                            ? "animate-shake border-error ring-1 ring-error"
                            : ""
                    }`}
                    popoverDirection="down"
                    readOnly={true}
                    minDate={new Date(calculateCurrentDateMinus60Years())}
                    maxDate={new Date(calculateCurrentDateMinus12Years())}
                    startFrom={new Date(calculateCurrentDateMinus12Years())}
                    asSingle={true}
                    useRange={false}
                    value={birthday}
                    onChange={handleDateChange}
                />
            </div>
            <InputErrorMessage message={birthdayError} />
            
            <div className="flex flex-col-reverse w-full ">
                <button
                    className="h-10  w-full mt-3  border border-slate-400 rounded-md text-slate-400 font-semibold"
                    type="button"
                    onClick={back}
                >
                    Back
                </button>
                <button
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    className="h-10  w-full mt-10 bg-primary rounded-md text-white font-semibold"
                    type="button"
                    onClick={next}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default FormTwo;
