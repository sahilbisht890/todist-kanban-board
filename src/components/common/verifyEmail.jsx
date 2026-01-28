import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("loading"); 
  // loading | success | error
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await axiosInstance.get(
          `auth/verify-email/${token}`
        );

        const data = res.data;

        setStatus("success");
        setMessage(data.message || "Email verified successfully");

        setTimeout(() => {
          navigate("/");
        }, 3000);

      } catch (error) {
        setStatus("error");
        setMessage(error.message || "Invalid or expired verification link");
      }
    };

    if (token) verifyEmail();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        
        {status === "loading" && (
          <>
            <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-700">
              Verifying your email...
            </h2>
            <p className="text-gray-500 mt-2">
              Please wait while we confirm your email address.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="text-green-500 text-4xl mb-4">✓</div>
            <h2 className="text-xl font-semibold text-green-600">
              Email Verified
            </h2>
            <p className="text-gray-600 mt-2">{message}</p>
            <p className="text-sm text-gray-400 mt-4">
              Redirecting to login...
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="text-red-500 text-4xl mb-4">✕</div>
            <h2 className="text-xl font-semibold text-red-600">
              Verification Failed
            </h2>
            <p className="text-gray-600 mt-2">{message}</p>

            <button
              onClick={() => navigate("/register")}
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Go to Register
            </button>
          </>
        )}

      </div>
    </div>
  );
};

export default VerifyEmail;
