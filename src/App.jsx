import logo from "@/assets/LogoV4.png";
import { useNavigate } from "react-router-dom";

function App() {
    const navigate = useNavigate();

    const start = () => {
        navigate("/signin");
    };

    return (
        <div className="flex select-none flex-col justify-center items-center bg-gradient-to-br from-primary to-secondary w-screen h-screen relative">
            <p className="text-white text-sm font-medium">WELCOME TO</p>
            <img src={logo} className="h-40 mb-2.5 w-40" alt="emolink logo" />
            <p className="text-gray-300 text-center text-xs lg:pb-20">
                Experience the power of facial emotion recognition
                <br />
                <br />
                in our integrated video conferencing app
            </p>
            <button
                className="text-white border-white/50 border rounded-full w-52 h-10 absolute bottom-16 lg:bottom-20"
                onClick={start}
            >
                GET STARTED
            </button>
        </div>
    );
}

export default App;
