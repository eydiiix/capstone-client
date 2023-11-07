import ChangePassword from "@/components/home/settings/ChangePassword";
import DeleteAccount from "@/components/home/settings/DeleteAccount";
import PersonalInforamtion from "@/components/home/settings/PersonalInforamtion";
import { Toaster } from "react-hot-toast";


function Settings() {

    return (
        <div className="flex pt-16 flex-col h-full w-full overflow-scroll overflow-x-hidden">
            <Toaster />
            <PersonalInforamtion />
            <hr />
            <ChangePassword />
            <hr />
            <DeleteAccount />
        </div>
    );
}

export default Settings;
