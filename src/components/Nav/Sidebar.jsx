import React, { useState, useEffect } from "react";
import {
  FaRoute,
  FaMapMarkedAlt,
  FaUserCircle,
  FaChevronLeft,
  FaChevronRight,
  FaSignOutAlt,
} from "react-icons/fa";
import {
  Sidebar,
  SidebarToggle,
  SidebarContent,
  NavItem,
  IconWrapper,
  TooltipLabel,
  NavLabel,
} from "../../style/sidebar.styles";
import { logoutUser } from "../../utils/AuthHandler";

const SidebarNav = ({ onStateChange, sidebarOpen }) => {
  const [isOpen, setIsOpen] = useState(sidebarOpen);
  const expandedWidth = 240;
  const collapsedWidth = 70;

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (onStateChange) {
      onStateChange(isOpen, isOpen ? expandedWidth : collapsedWidth);
    }
  }, [isOpen, onStateChange]);

  const handleLogout = () => {
    logoutUser()
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

export default SidebarNav;
