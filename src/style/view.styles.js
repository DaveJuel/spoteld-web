import styled from "styled-components";

export const StatusMessage = styled.p`
  margin-top: 20px;
  font-size: 14px;
  color: ${(props) => (props.type === "success" ? "#28a745" : "#dc3545")};
  text-align: center;
  font-weight: bold;
`;
