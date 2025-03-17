import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  FaRoute,
  FaMapMarkedAlt,
  FaUserCircle,
  FaChevronLeft,
  FaChevronRight,
  FaSignOutAlt,
} from "react-icons/fa";

const SidebarNav = ({ onStateChange, sidebarOpen }) => {
  const [isOpen, setIsOpen] = useState(sidebarOpen);
  const expandedWidth = 240;
  const collapsedWidth = 70;

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Notify parent component whenever sidebar state changes
  useEffect(() => {
    if (onStateChange) {
      onStateChange(isOpen, isOpen ? expandedWidth : collapsedWidth);
    }
  }, [isOpen, onStateChange]);

  const handleLogout = () => {
    window.location.href = "/login";
  };
  const handleOnClickTrips = () => {
    window.location.href = "/trips";
  };

  const handleOnClickProfile = () => {
    window.location.href = "/profile";
  };

  const handleOnClickRoutes = () => {
    window.location.href = "/routes";
  };

  return (
    <Sidebar isOpen={isOpen}>
      <SidebarToggle onClick={toggleSidebar}>
        {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
      </SidebarToggle>
      <SidebarContent>
        <NavItem onClick={handleOnClickRoutes}>
          <IconWrapper>
            <FaRoute size={20} />
          </IconWrapper>
          {isOpen ? (
            <NavLabel>Route</NavLabel>
          ) : (
            <TooltipLabel>Route</TooltipLabel>
          )}
        </NavItem>
        <NavItem onClick={handleOnClickTrips}>
          <IconWrapper>
            <FaMapMarkedAlt size={20} />
          </IconWrapper>
          {isOpen ? (
            <NavLabel>Trips</NavLabel>
          ) : (
            <TooltipLabel>Trips</TooltipLabel>
          )}
        </NavItem>
        <NavItem onClick={handleOnClickProfile}>
          <IconWrapper>
            <FaUserCircle size={20} />
          </IconWrapper>
          {isOpen ? (
            <NavLabel>Profile</NavLabel>
          ) : (
            <TooltipLabel>Profile</TooltipLabel>
          )}
        </NavItem>
        <NavItem onClick={handleLogout}>
          <IconWrapper>
            <FaSignOutAlt size={20} />
          </IconWrapper>
          {isOpen ? (
            <NavLabel>Logout</NavLabel>
          ) : (
            <TooltipLabel>Logout</TooltipLabel>
          )}
        </NavItem>
      </SidebarContent>
    </Sidebar>
  );
};

const Sidebar = styled.div`
  width: ${(props) => (props.isOpen ? "240px" : "70px")};
  background: #2c3e50;
  height: 100%;
  transition: width 0.3s ease;
  position: relative;
  color: white;
  flex-shrink: 0;
  z-index: 10;
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

export default SidebarNav;
