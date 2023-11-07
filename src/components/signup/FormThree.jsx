import { useEffect, useState } from "react";
import {
    faCheck,
    faChevronDown,
    faChevronUp,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputErrorMessage from "../error/InputErrorMessage";
import { Ripple, initTE } from "tw-elements";

function FormThree(props) {
    useEffect(() => {
        initTE({ Ripple });
    }, []);

    const {
        interests,
        interestError,
        setInterestError,
        handleChange,
        options,
        handleOptionClick,
        reset,
        next,
        back,
    } = props;

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex justify-start w-10/12 lg:h-4/5 sm:w-8/12 md:w-6/12 lg:w-4/12 items-center flex-col">
            <label
                htmlFor="interests"
                className="w-full py-1 text-sm text-slate-800 mt-3"
            >
                Interest
            </label>
            <div className="flex w-full flex-col h-fit select-none">
                <div className=" relative">
                    <input
                        className={`w-full h-10 rounded-md px-3 pr-20 focus:outline-0 border border-slate-300 focus:border-primary disabled:text-slate-400 focus:ring-1 ${
                            interestError
                                ? "animate-shake border-error ring-1 ring-error"
                                : ""
                        }`}
                        onClick={toggleDropdown}
                        onFocus={setInterestError}
                        onChange={handleChange}
                        id="interests"
                        value={interests}
                        readOnly
                    />
                    <div className="absolute top-0 text-slate-500 h-10 right-2 flex">
                        {interests.length !== 0 && (
                            <button
                                type="button"
                                className=" w-8 h-10 bg-transparent"
                                onClick={reset}
                            >
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                        )}
                        <button
                            type="button"
                            className=" w-8 h-10 bg-transparent"
                            onClick={toggleDropdown}
                        >
                            <FontAwesomeIcon
                                icon={isOpen ? faChevronUp : faChevronDown}
                            />
                        </button>
                    </div>
                </div>
                {isOpen && (
                    <div className="rounded overflow-hidden p-1 overflow-y-auto gap-1 flex flex-col mt-2 h-fit max-h-52 border-2">
                        {options.map((option) => (
                            <li
                                key={option}
                                onClick={() => handleOptionClick(option)}
                                className={`px-4 py-2 border-b text-sm rounded h-10 flex items-center`}
                            >
                                {option}
                                <FontAwesomeIcon
                                    className={`ml-auto mr-2 border p-1 rounded h-2 ${
                                        interests.includes(option)
                                            ? "bg-blue-100 text-primary border-primary"
                                            : "text-white"
                                    }`}
                                    icon={faCheck}
                                />
                            </li>
                        ))}
                    </div>
                )}
            </div>
            <InputErrorMessage message={interestError} />
            <div className="flex flex-col-reverse w-full">
                <button
                    className="h-10 w-full mt-3 border border-slate-400 rounded-md text-slate-400 font-semibold"
                    type="button"
                    onClick={back}
                >
                    Back
                </button>
                <button
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    className="h-10 w-full mt-10 bg-primary rounded-md text-white font-semibold"
                    type="button"
                    onClick={next}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default FormThree;
