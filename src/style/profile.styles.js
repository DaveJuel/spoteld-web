import styled from "styled-components";


export const ProfileNav = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const ProfileNavHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #eee;

  h2 {
    margin: 0;
    color: #333;
  }
`;

export const ProfileContent = styled.div`
  background: white;
  padding: 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

export const ProfileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;

  h1 {
    margin: 0;
    color: #333;
  }
`;
