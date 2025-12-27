import { useState, useRef } from "react";
import axios from "axios";
import { Scanner } from "@yudiel/react-qr-scanner"


export const Scan = () => {

    const isProcessingRef = useRef(false);

    const [status, setStatus] = useState("idle");

    const [message, setMessage] = useState("");
    const [memberInfo, setMemberInfo] = useState(null); 

    const handleScan = async (result) => {
        if (!result || isProcessingRef.current) return;
        isProcessingRef.current = true;

        const token = result[0].rawValue;

        // Avoid double-calling API
        if (status === "scanning") return;

        setStatus("scanning");
        setMessage("Verifying membership...");
        setMemberInfo(null);

        try {

            const res = await axios.get(`http://localhost:3000/api/qr?token=${token}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            const data = res.data;
            console.log(data);

            if (res.status === 404) {
                setStatus("expired");
                setMessage("Invalid, Expired, or Inactive Membership");
                setMemberInfo(data.membership);
                return;
            }

            if (res.status === 429) {
                setStatus("error");
                setMessage(data.message);
                return;
            }

            // Success
            setStatus("success");
            setMessage("Attendance logged successfully!");
            setMemberInfo(data.membership);

        } catch (err) {

            console.log(err);
            setStatus("error");
            setMessage(err.response.data.message || err);

        }

            setTimeout(() => {
                isProcessingRef.current = false;
                setStatus("idle");
            }, 3000);
    }

    const handleError = (err) => {
        console.error(err);
    };
    return (
        <div className="flex flex-col items-center justify-center p-4 gap-4">

            <h1 className="text-2xl font-bold text-center">Scan QR Code</h1>

            {/* CAMERA FRAME */}
            <div className="w-full max-w-sm border rounded-xl overflow-hidden shadow-lg">
                <Scanner
                    onScan={handleScan}
                    onError={handleError}
                    style={{ width: "100%" }}
                />
            </div>

            {/* STATUS BOX */}
            {status !== "idle" && (
                <div
                className={`w-full max-w-sm p-3 text-center rounded-lg
                    ${status === "scanning" ? "bg-blue-100 text-blue-700" : ""}
                    ${status === "success" ? "bg-green-100 text-green-700" : ""}
                    ${status === "expired" ? "bg-orange-100 text-orange-700" : ""}
                    ${status === "duplicate" ? "bg-purple-100 text-purple-700" : ""}
                    ${status === "error" ? "bg-red-100 text-red-700" : ""}
                `}
                >
                {message}
                </div>
            )}

            {/* MEMBER INFO */}
            {memberInfo && (
                <div className="w-full max-w-sm bg-white shadow-md p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-2">Member Info</h2>

                {memberInfo.clientName && (
                    <p><strong>Name:</strong> {memberInfo.clientName}</p>
                )}

                {memberInfo.validTill && (
                    <p>
                    <strong>Valid Till:</strong>{" "}
                    {new Date(memberInfo.validTill).toLocaleString()}
                    </p>
                )}

                {memberInfo.planName && (
                    <p>
                    <strong>Plan Name:</strong>{" "}
                    {memberInfo.planName}
                    </p>
                )}

                </div>
            )}

        </div>
  );
}