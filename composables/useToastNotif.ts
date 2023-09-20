import { useToast, ToastProps } from "vue-toast-notification";

const options: ToastProps = {
    position: "top-left",
    duration: 100000,
    pauseOnHover: true,
    // closeOnClick: false,
    // pauseOnFocusLoss: false,
    // containerClassName: "custom-toast",
    // transition: {
    //     enter: "custom-toast-animation-bounce-active",
    //     leave: "custom-toast-animation-bounce-leave",
    //     move: "custom-toast-animation-bounce-move",
    // },
};
export default function useToastNotif() {
    const toast = useToast();
    const successToast = (message: string) =>
        toast.open({ message, type: "success", ...options });
    const errorToast = (message: string) =>
        toast.open({ message, type: "error", ...options });
    const infoToast = (message: string) =>
        toast.open({ message, type: "info", ...options });
    const warningToast = (message: string) =>
        toast.open({ message, type: "warning", ...options });
    return { toast, successToast, errorToast, infoToast, warningToast };
}
