import styled from "styled-components";

// New styled components for the stepping process
export const StepperContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  position: relative;
`;

export const StepperLine = styled.div`
  position: absolute;
  top: 15px;
  left: 40px;
  right: 40px;
  height: 2px;
  background-color: #e0e0e0;
  z-index: 1;
`;

export const StepperProgressLine = styled.div`
  position: absolute;
  top: 15px;
  left: 40px;
  height: 2px;
  background-color: #4a90e2;
  z-index: 2;
  transition: width 0.3s ease;
  width: ${props => (props.currentStep === 1 ? '0%' : props.currentStep === 2 ? '50%' : '100%')};
`;

export const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 3;
`;

export const StepCircle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-bottom: 8px;
  background-color: ${props => props.active ? '#4a90e2' : props.completed ? '#4a90e2' : '#e0e0e0'};
  color: ${props => props.active || props.completed ? 'white' : '#666'};
  transition: all 0.3s ease;
`;

export const StepLabel = styled.span`
  font-size: 12px;
  color: ${props => props.active ? '#4a90e2' : '#666'};
  font-weight: ${props => props.active ? 'bold' : 'normal'};
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

export const StepButton = styled.button`
  padding: 10px 20px;
  border-radius: 4px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &.previous {
    background-color: #f0f4f8;
    color: #4a90e2;
    border: 1px solid #4a90e2;
    
    &:hover {
      background-color: #e6eef5;
    }
  }
  
  &.next, &.confirm {
    background-color: #4a90e2;
    color: white;
    
    &:hover {
      background-color: #3a80d2;
    }
  }
  
  &.confirm {
    background-color: #2ecc71;
    
    &:hover {
      background-color: #27ae60;
    }
  }
`;

export const StepHint = styled.div`
  background-color: #f8f9fa;
  border-left: 4px solid #4a90e2;
  padding: 10px 15px;
  margin: 20px 0;
  font-size: 14px;
  color: #666;
`;
