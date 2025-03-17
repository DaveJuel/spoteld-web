import React, { useState } from "react";
import AuthContainer from "../components/Elements/AuthContainer";
import AuthForm from "../components/Elements/AuthForm";

export default function Register() {
  const [formData, setFormData] = useState({ email: "", password: "", name: "" });
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
      setMessage("Registration successful! Proceed to verification.");
    }, 2000);
  };

  return (
    <AuthContainer imageUrl={`${process.env.PUBLIC_URL}/routeimg.jpg`}>
      <AuthForm
        title="Create Your Account"
        description="Fill in your details to register."
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        loading={loading}
        buttonText="Register"
        linkText="Already have an account?"
        linkUrl="/login"
      />
      {message && <p style={{ color: "green" }}>{message}</p>}
    </AuthContainer>
  );
}
