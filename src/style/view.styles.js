import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 20px 0;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding-top: 80px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Sidebar = styled.div`
  width: 30%;
  background: #F5F5F5;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Body = styled.div`
  width: 70%;
  background: #F5F5F5;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const HeaderInfo = styled.div`
  margin-bottom: 20px;
`;

export const SearchBox = styled.div`
  margin-top: 10px;
  input {
    width: 93%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
`;

export const Section = styled.div`
  margin-top: 30px;

  h3 {
    margin-bottom: 10px;
  }

  p {
    line-height: 1.6;
  }
`;

export const ViewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
`;

export const ViewCard = styled.div`
  background: ${(props) => (props.isSelected ? "#d4edda" : "#f7f7f7")};
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: #e9f5ec;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  }

  h4 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  p {
    font-size: 14px;
    color: #666;
  }

  span {
    font-size: 12px;
    color: #999;
  }
`;

export const Button = styled.button`
  background-color: #008394;
  color: #EEA746;
  border: none;
  padding: 12px 24px;
  margin-top: 20px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 16px;

  &:hover {
    background-color: #EEA746;
    color: #F5F5F5;
  }
`;

export const ButtonRed = styled.button`
  background-color: #c52a2a;
  color: white;
  border: none;
  padding: 12px 24px;
  margin-top: 20px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 16px;

  &:hover {
    background-color: #45a049;
  }
`;

export const PaginationWrapper = styled.div`
  margin-top: 20px;
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  width: 800px;
  border-radius: 5px;
`;

export const FormField = styled.div`
  margin-bottom: 20px;
  label {
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
  }
  input,
  textarea {
    width: 93%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  button {
    padding: 10px 20px;
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`;

export const SelectBox = styled.select`
  width: 97%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: border 0.3s;
  &:focus {
    border-color: #4caf50;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  border: none;
  cursor: pointer;
  color: #333;
`;

export const SkillsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
`;

export const Skill = styled.span`
  background-color: #f1f1f1;
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 14px;
  color: #4caf50;
  font-weight: bold;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e0e0e0;
    cursor: pointer;
  }
`;

export const FileInput = styled.div`
  display: flex;
  flex-direction: column;
  input {
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 14px;
    margin-bottom: 8px;
    outline: none;
    cursor: pointer;
    transition: border 0.3s;
    &:focus {
      border-color: #4caf50;
    }
  }
  span {
    font-size: 14px;
    color: #888;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const PromptContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  text-align: lefct;
  background: #f9fafc;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 20px;
  margin: 0 auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const PromptMessage = styled.div`
  margin-bottom: 20px;

  h2 {
    font-size: 24px;
    color: #333;
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
    color: #666;
    line-height: 1.5;
  }
`;

export const StyledButton = styled(Button)`
  && {
    font-size: 16px;
    padding: 10px 20px;
    border-radius: 5px;
    text-transform: none;
  }
`;


export const PageWrapper = styled.div`
  min-height: 540px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  text-align: center;
  background: white;
  padding: 20px;
  border-radius: 5px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;
`;

export const Input = styled.input`
  padding: 15px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #bacad3;
  &:focus {
    outline: none;
    border-color: #49cb86;
    color: #4A4A4A;
  }
`;

export const Message = styled.p`
  margin-top: 20px;
  a {
    color: #008394;
    text-decoration: underline;
  }
`;

export const StatusMessage = styled.p`
  margin-top: 20px;
  font-size: 14px;
  color: ${(props) => (props.type === "success" ? "#28a745" : "#dc3545")};
  text-align: center;
  font-weight: bold;
`;
