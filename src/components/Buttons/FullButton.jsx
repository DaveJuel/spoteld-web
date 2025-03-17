import React from "react";
import styled from "styled-components";

export default function FullButton({ title, action, border }) {
  return (
    <Wrapper
      className="animate pointer radius8"
      onClick={action ? () => action() : null}
      border={border}
    >
      {title}
    </Wrapper>
  );
}

const Wrapper = styled.button`
  border: 1px solid ${(props) => (props.border ? "#707070" : "#EEA746")};
  background-color: ${(props) => (props.border ? "transparent" : "#008394")};
  width: 100%;
  padding: 15px;
  outline: none;
  color: ${(props) => (props.border ? "#008394" : "#EEA746")};
  :hover {
    background-color: ${(props) => (props.border ? "transparent" : "#EEA746")};
    border: 1px solid #EEA746;
    color: ${(props) => (props.border ? "#EEA746" : "#fff")};
  }
`;

