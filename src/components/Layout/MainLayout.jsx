import React, { useState } from "react";
import SidebarNav from "../Nav/Sidebar";
import { MainContainer, ContentWrapper, LeftSection, RightSection } from "../../style/view.styles";

/**
 * MainLayout - A reusable layout component with a retractable sidebar and two content sections
 * @param {Object} props
 * @param {React.ReactNode} props.leftContent - Content to render in the left section
 * @param {React.ReactNode} props.rightContent - Content to render in the right section
 * @param {number} props.initialSidebarWidth - Initial width of the sidebar in pixels
 * @param {boolean} props.initialSidebarState - Initial open/closed state of the sidebar
 */
const MainLayout = ({
  leftContent,
  rightContent,
  initialSidebarWidth = 240
}) => {
  const [sidebarWidth, setSidebarWidth] = useState(initialSidebarWidth);

  const handleSidebarChange = (isOpen, width) => {
    setSidebarWidth(width);
  };

  return (
    <MainContainer>
      <SidebarNav
        onStateChange={handleSidebarChange}
      />
      <ContentWrapper sidebarWidth={sidebarWidth}>
        <LeftSection>
          {leftContent}
        </LeftSection>
        <RightSection>
          {rightContent}
        </RightSection>
      </ContentWrapper>
    </MainContainer>
  );
};

export default MainLayout;