import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContainer from "../components/Elements/AuthContainer";
import AuthForm from "../components/Elements/AuthForm";

export default function VerifyOTP() {
  const [formData, setFormData] = useState({ otp: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/auth/verify/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ otp: formData.otp }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        navigate("/login");
      } else {
        setMessage(result.message || "OTP verification failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContainer imageUrl={`${process.env.PUBLIC_URL}/routeimg.jpg`}>
      <AuthForm
        title="Verify OTP"
        description="Enter the OTP sent to your email."
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        loading={loading}
        buttonText="Verify"
      />
      {message && <p style={{ color: "red" }}>{message}</p>}
    </AuthContainer>
  );
}
