import React, { useState } from "react";
import AuthContainer from "../components/Elements/AuthContainer";
import AuthForm from "../components/Elements/AuthForm";

export default function VerifyOTP() {
  const [formData, setFormData] = useState({ otp: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setMessage("OTP Verified! Redirecting to dashboard...");
      window.location.href = "/home";
    }, 2000);
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
      {message && <p style={{ color: "green" }}>{message}</p>}
    </AuthContainer>
  );
}
