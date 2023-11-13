import { interestList } from "@/pages/SignUp";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function InterestContainer({ interestBtn, back }) {
    return (
        <div className="flex flex-col h-screen w-screen absolute justify-center gap-7 items-center top-0 left-0 z-[30] bg-gradient-to-br from-primary to-secondary">
            <button
                className="text-white"
                onClick={back}
            >
                <FontAwesomeIcon icon={faArrowLeft} size="lg" />
            </button>
            <h1 className="text-white text-lg">Choose your preference</h1>
            <div className="lg:w-2/4 w-10/12 md:8/12 flex lg:gap-4 gap-2 mb-10 justify-center flex-wrap ">
                {interestList.map((value, i) => {
                    return (
                        <button
                            className="text-white hover:bg-white/10 hover:scale-[.9] duration-200 transition-all ease-in lg:px-6 px-2 text-sm py-1 lg:py-1 border rounded-md"
                            key={i}
                            onClick={() => interestBtn(value)}
                        >
                            {value}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default InterestContainer;
