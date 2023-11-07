import { Transition } from "@headlessui/react";

function TransitionOpacity({ show, children }) {
    return (
        <Transition
            className="absolute top-0 left-0"
            show={show}
            enter="transition-opacity duration-250"
            enterFrom="opacity-0 scale-50"
            enterTo="opacity-100 scale-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
        >
            {children}
        </Transition>
    );
}

export default TransitionOpacity;
