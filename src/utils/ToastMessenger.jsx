// ToastMessenger.jsx
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

/**
 * @param {{ status: "SUCCESS" | "ERROR", message: string }} props
 */

export default function ToastMessenger({ status, message }) {
    useEffect(() => {
        if (!status || !message) return;

        if (status === "SUCCESS") toast.success(message);
        if (status === "ERROR") toast.error(message);
    }, []);

    return <ToastContainer />;
}