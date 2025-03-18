import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  height: 100vh;
  background: #f0f4f8;
  overflow: hidden;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  padding: 0;
  gap: 20px;
  transition: all 0.3s ease;
  margin-left: 0;
`;

export const LeftSection = styled.div`
  flex: 1;
  display: flex;
  min-width: 300px;
  max-width: 450px;
  height: 100%;
  border-right: 1px solid #ddd;
  background: white;
`;

export const RightSection = styled.div`
  flex: 2;
  height: 100%;
  overflow-y: auto;
  padding: 20px;
`;

export const FormContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  background: white;
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  background: #2c3e50;
  color: white;
  border: none;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #34495e;
  }

  svg {
    margin-right: 5px;
  }
`;

export const NavTabs = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0;
`;

export const NavTab = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${(props) => (props.active ? "#f0f7ff" : "transparent")};
  border-left: 3px solid
    ${(props) => (props.active ? "#2c3e50" : "transparent")};

  &:hover {
    background: ${(props) => (props.active ? "#f0f7ff" : "#f5f5f5")};
  }

  span {
    margin-left: 10px;
    font-size: 15px;
    color: ${(props) => (props.active ? "#2c3e50" : "#666")};
  }

  svg {
    color: ${(props) => (props.active ? "#2c3e50" : "#666")};
  }
`;



export const StatusMessage = styled.p`
  margin-top: 20px;
  font-size: 14px;
  color: ${(props) => (props.type === "success" ? "#28a745" : "#dc3545")};
  text-align: center;
  font-weight: bold;
`;
