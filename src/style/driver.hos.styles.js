import styled from "styled-components";

export const EldContainer = styled.div`
  font-family: Arial, sans-serif;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  border: 1px solid #ccc;
  #eld-container;
`;

export const TimeHeader = styled.div`
  display: grid;
  grid-template-columns: 120px repeat(24, 1fr);
  border-bottom: 1px solid #ccc;
  height: 30px;
`;

export const TimeCell = styled.div`
  text-align: center;
  font-size: 12px;
  border-right: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StatusLabel = styled.div`
  padding: 5px;
  font-size: 14px;
  border-right: 1px solid #ccc;
  display: flex;
  align-items: center;
  height: 50px;
`;

export const StatusRow = styled.div`
  display: grid;
  grid-template-columns: 120px repeat(24, 1fr);
  border-bottom: 1px solid #ccc;
  height: 50px;
  position: relative;
`;

export const HoursTotal = styled.div`
  font-size: 18px;
  font-weight: bold;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
`;

export const StatusBar = styled.div`
  position: absolute;
  height: 30px;
  background-color: #00070b;
  top: 10px;
  z-index: 1;
`;

export const RemarksRow = styled.div`
  display: grid;
  grid-template-columns: 120px repeat(24, 1fr);
  border-bottom: 1px solid #ccc;
  height: 50px;
  position: relative;
`;

export const RemarksHeader = styled.div`
  padding: 5px;
  font-size: 14px;
  font-weight: bold;
  border-right: 1px solid #ccc;
  display: flex;
  align-items: center;
`;

export const RemarksTotal = styled.div`
  font-size: 18px;
  font-weight: bold;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
`;

export const Location = styled.div`
  position: absolute;
  bottom: -15px;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  font-size: 11px;
  transform: rotate(180deg);
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LogSelectorContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
`;

export const LogSelectorLabel = styled.label`
  margin-right: 10px;
  font-weight: bold;
`;

export const LogSelector = styled.select`
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  min-width: 150px;
`;

export const DateDisplay = styled.div`
  margin-left: 20px;
  font-weight: bold;
  font-size: 16px;
`;

export const Dot = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: red;
  border-radius: 50%;
  top: 20px; /* Adjust as needed to position the dot vertically */
  z-index: 2;
  font-size: 18px,
  font-weight: bold,
`;