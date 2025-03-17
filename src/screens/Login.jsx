import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContainer from "../components/Elements/AuthContainer";
import AuthForm from "../components/Elements/AuthForm";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
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
        `${process.env.REACT_APP_API_URL}/api/auth/login/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        // Save the login token for further requests
        localStorage.setItem("loginToken", result.token);
        
        // Redirect to routes page
        navigate("/routes");
      } else {
        setMessage(result.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContainer imageUrl={`${process.env.PUBLIC_URL}/routeimg.jpg`}>
      <AuthForm
        title="Welcome Back!"
        description="Please enter your credentials to log in."
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        loading={loading}
        buttonText="Login"
        linkText="Don't have an account?"
        linkUrl="/register"
      />
      {message && <p style={{ color: "red" }}>{message}</p>}
    </AuthContainer>
  );
}
