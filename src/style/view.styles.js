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
  transition: all 0.3s ease;
  margin-left: 0;
`;

export const LeftSectionContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

export const LeftSectionHeader = styled.div`
padding: 20px;
border-bottom: 1px solid #eee;
position: sticky;
top: 0;
background: white;
z-index: 1;

h2 {
  margin: 0 0 10px 0;
  color: #333;
}
`;

export const FilterContainer = styled.div`
  select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: #f9f9f9;
  }
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
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
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
  background: ${({ disabled }) => (disabled ? "#bdc3c7" : "#2c3e50")};
  color: ${({ disabled }) => (disabled ? "#7f8c8d" : "white")};
  border: none;
  padding: 8px 16px;
  font-size: 14px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background 0.2s;

  &:hover {
    background: ${({ disabled }) => (disabled ? "#bdc3c7" : "#34495e")};
  }

  svg {
    margin-right: 5px;
    fill: ${({ disabled }) => (disabled ? "#7f8c8d" : "white")};
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

export const LocationFieldset = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #e0e0e0;
  padding: 10px 12px;
  margin-bottom: 20px;
  transition: all 0.2s ease;

  &:focus-within {
    border-color: #3a86ff;
    box-shadow: 0 0 0 2px rgba(58, 134, 255, 0.1);
  }
`;

export const LabelRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

export const Label = styled.label`
  font-weight: 600;
  margin: 0 auto 0 8px;
  color: #333;
  font-size: 14px;
`;

export const InputWrapper = styled.div`
  position: relative;
`;


export const StyledInput = styled.input`
  padding: 12px;
  padding-left: 12px;
  border: 1px solid #e0e0e0;
  font-size: 16px;
  width: 92%;
  transition: all 0.2s ease;
  background-color: ${props => props.$hasCoordinates ? '#e6f7ef' : '#fff'};
  border-color: ${props => props.$hasCoordinates ? '#34c759' : '#e0e0e0'};

  &:focus {
    outline: none;
    border-color: ${props => props.$hasCoordinates ? '#34c759' : '#3a86ff'};
    box-shadow: 0 0 0 2px ${props => 
      props.$hasCoordinates 
        ? 'rgba(52, 199, 89, 0.1)' 
        : 'rgba(58, 134, 255, 0.1)'
    };
  }

  &::placeholder {
    color: #aaa;
  }
`;

export const StyledSelect = styled.select`
  padding: 12px;
  padding-left: 12px;
  border: 1px solid #e0e0e0;
  font-size: 16px;
  width: 92%;
  transition: all 0.2s ease;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23555555' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
  
  &:focus {
    outline: none;
    border-color: #3a86ff;
    box-shadow: 0 0 0 2px rgba(58, 134, 255, 0.1);
  }
  
  &::placeholder {
    color: #aaa;
  }
`;

export const LocationDetails = styled.div`
  background-color: #f9f9f9;
  padding: 12px;
  margin-top: 8px;
  font-size: 14px;
`;

export const DetailItem = styled.div`
  margin-bottom: 4px;
  color: #555;
`;

export const CoordinatesWrapper = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 4px;
`;

export const Strong = styled.span`
  font-weight: 600;
  color: #333;
`;

export const DetailsToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;

  &:hover {
    color: #3a86ff;
  }
`;

const MapPinIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size || 24}
    height={props.size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

export const StyledMapPin = styled(MapPinIcon)`
  flex-shrink: 0;
`;


export const StatusMessage = styled.p`
  margin-top: 20px;
  font-size: 14px;
  color: ${(props) => (props.type === "success" ? "#28a745" : "#dc3545")};
  text-align: center;
  font-weight: bold;
`;
