import React from "react";
import styled from "styled-components";

const AuthContainer = ({ children, imageUrl }) => (
  <Wrapper>
    <Container>
      <ImageSection>
        <Image src={imageUrl} alt="Auth Illustration" />
      </ImageSection>
      <FormSection>{children}</FormSection>
    </Container>
  </Wrapper>
);

export default AuthContainer;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f0f4f8;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ImageSection = styled.div`
  flex: 1;
  min-width: 300px;
  background-color: #e0e7ff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const FormSection = styled.div`
  flex: 1;
  min-width: 300px;
  padding: 40px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
