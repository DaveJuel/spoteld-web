import React, { useState } from "react";
import styled from "styled-components";
import { FaRoute, FaMapMarkedAlt, FaUserCircle, FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function SidebarNav() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Sidebar isOpen={sidebarOpen}>
      <SidebarToggle onClick={toggleSidebar}>
        {sidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
      </SidebarToggle>
      <SidebarContent>
        <NavItem>
          <IconWrapper>
            <FaRoute size={20} />
          </IconWrapper>
          {sidebarOpen ? (
            <NavLabel>Route</NavLabel>
          ) : (
            <TooltipLabel>Route</TooltipLabel>
          )}
        </NavItem>
        <NavItem>
          <IconWrapper>
            <FaMapMarkedAlt size={20} />
          </IconWrapper>
          {sidebarOpen ? (
            <NavLabel>Trips</NavLabel>
          ) : (
            <TooltipLabel>Trips</TooltipLabel>
          )}
        </NavItem>
        <NavItem>
          <IconWrapper>
            <FaUserCircle size={20} />
          </IconWrapper>
          {sidebarOpen ? (
            <NavLabel>Profile</NavLabel>
          ) : (
            <TooltipLabel>Profile</TooltipLabel>
          )}
        </NavItem>
      </SidebarContent>
    </Sidebar>
  );
}

const Sidebar = styled.div`
  width: ${(props) => (props.isOpen ? "240px" : "70px")};
  background: #2c3e50;
  height: 100%;
  transition: width 0.3s ease;
  position: relative;
  color: white;
`;

const SidebarToggle = styled.button`
  position: absolute;
  top: 20px;
  right: 10px;
  background: transparent;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
  padding: 5px;
  z-index: 2;
`;

const SidebarContent = styled.div`
  padding-top: 60px;
  overflow: hidden;
`;

const NavItem = styled.div`
  padding: 15px 20px;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  position: relative;

  &:hover {
    background: #34495e;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 30px;
`;

const NavLabel = styled.span`
  margin-left: 10px;
  white-space: nowrap;
`;

const TooltipLabel = styled.span`
  position: absolute;
  left: 70px;
  background: #34495e;
  padding: 5px 10px;
  border-radius: 4px;
  white-space: nowrap;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 10;

  ${NavItem}:hover & {
    visibility: visible;
    opacity: 1;
  }

  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: -5px;
    margin-top: -5px;
    border-width: 5px 5px 5px 0;
    border-style: solid;
    border-color: transparent #34495e transparent transparent;
  }
`;
