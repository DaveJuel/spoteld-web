import React from "react";
import styled from "styled-components";

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <SpinnerWrapper>
      <Loader viewBox="0 0 50 50">
        <circle
          className="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="4"
        />
      </Loader>
      <Message>{message}</Message>
    </SpinnerWrapper>
  );
};

// Styled Components
const SpinnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 200px;
  text-align: center;
`;

const Loader = styled.svg`
  animation: rotate 2s linear infinite;
  width: 50px;
  height: 50px;

  & .path {
    stroke: #1976d2; /* Customize color */
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

const Message = styled.p`
  margin-top: 20px;
  font-size: 18px;
  color: #333;
`;

export default LoadingSpinner;
