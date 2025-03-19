import styled from "styled-components";
export const MapWrapper = styled.div`
  height: 100%;
  position: relative;
  overflow: hidden;
`;

export const RouteInfo = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  background: white;
  padding: 10px 15px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  max-width: 300px;
  z-index: 1000;
  
  h3 {
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 16px;
  }
`;

export const RouteItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  
  .route-stats {
    font-size: 12px;
    color: #666;
  }
`;

export const RouteColorIndicator = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${props => props.color};
  margin-right: 8px;
`;

export const TotalInfo = styled.div`
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid #eee;
  font-weight: bold;
`;