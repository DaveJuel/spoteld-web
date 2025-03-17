import React from "react";
import styled from "styled-components";
import FullButton from "../Buttons/FullButton";

const AuthForm = ({ title, description, formData, handleInputChange, handleSubmit, loading, buttonText, children,  linkText,
    linkUrl, }) => (
  <FormWrapper>
    <h1>{title}</h1>
    <p>{description}</p>
    <Form onSubmit={handleSubmit}>
      {Object.keys(formData).map((key) => (
        <Input
          key={key}
          type={key === "password" ? "password" : "text"}
          name={key}
          placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
          value={formData[key]}
          onChange={handleInputChange}
          required
        />
      ))}
      {children}
      <FullButton  title={loading ? "Processing..." : buttonText} />
    </Form>
    {linkText && (
      <SwitchMessage>
        {linkText} <a href={linkUrl}>Click here</a>
      </SwitchMessage>
    )}
  </FormWrapper>
);

export default AuthForm;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 400px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SwitchMessage = styled.p`
  margin-top: 10px;
  color: #555;
  a {
    color: #007bff;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
`;