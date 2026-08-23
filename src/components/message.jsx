import { useEffect } from "react";

const MessageBox = ({ message, type = "success", onClose }) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div
            style={{
                position: "fixed",
                top: "20px",
                right: "20px",
                minWidth: "300px",
                padding: "15px 20px",
                borderRadius: "10px",
                color: "white",
                backgroundColor: type === "success" ? "#28a745" : "#dc3545",
                boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
                zIndex: 9999,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                animation: "slideIn 0.4s ease"
            }}
        >
            <span>{message}</span>

            <button
                onClick={onClose}
                style={{
                    background: "transparent",
                    border: "none",
                    color: "white",
                    fontSize: "20px",
                    cursor: "pointer",
                    marginLeft: "15px"
                }}
            >
                ×
            </button>
        </div>
    );
};

export default MessageBox;