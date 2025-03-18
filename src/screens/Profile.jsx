import React, { useState } from "react";
import {
  MainContainer,
  ContentWrapper,
  LeftSection,
  RightSection,
  ActionButton,
  NavTabs,
  NavTab,
} from "../style/view.styles";
import {
  ProfileNav,
  ProfileNavHeader,
  ProfileContent,
  ProfileHeader,
} from "../style/profile.styles";
import SidebarNav from "../components/Nav/Sidebar";
import {
  FaUser,
  FaEdit,
  FaSave,
  FaTruck,
  FaPlus,
  FaList,
} from "react-icons/fa";

import DriverForm from "../components/Elements/DriverForm";
import VehicleForm from "../components/Elements/VehicleForm";
import VehicleList from "../components/Elements/VehicleList";

export default function Profile() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(240);
  const [activeTab, setActiveTab] = useState("vehicle");
  const [editing, setEditing] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);

  // Function to handle sidebar state changes
  const handleSidebarChange = (isOpen, width) => {
    setSidebarOpen(isOpen);
    setSidebarWidth(width);
  };

  const toggleEdit = () => {
    setEditing(!editing);
  };

  const handleAddVehicle = () => {
    setSelectedVehicleId(null);
    setEditing(!editing);
  };

  return (
    <MainContainer>
      <SidebarNav
        onStateChange={handleSidebarChange}
        sidebarOpen={sidebarOpen}
      />
      <ContentWrapper sidebarWidth={sidebarWidth}>
        <LeftSection>
          <ProfileNav>
            <ProfileNavHeader>
              <h2>Profile</h2>
            </ProfileNavHeader>
            <NavTabs>
              <NavTab
                active={activeTab === "vehicle"}
                onClick={() => {
                  setActiveTab("vehicle");
                  setSelectedVehicleId(null);
                }}
              >
                <FaTruck />
                <span>Vehicles</span>
              </NavTab>
              <NavTab
                active={activeTab === "driver"}
                onClick={() => {
                  setActiveTab("driver");
                  setSelectedVehicleId(null);
                }}
              >
                <FaUser />
                <span>Driver</span>
              </NavTab>
            </NavTabs>
          </ProfileNav>
        </LeftSection>
        <RightSection>
          <ProfileContent>
            <ProfileHeader>
              <h1>
                {activeTab === "driver"
                  ? "Driver Profile"
                  : activeTab === "carrier"
                  ? "Carrier Profile"
                  : selectedVehicleId
                  ? `Edit Vehicle`
                  : "Vehicles"}
              </h1>
              {activeTab !== "vehicle" || selectedVehicleId ? (
                <ActionButton onClick={toggleEdit}>
                  {editing ? <FaSave /> : <FaEdit />}
                  {editing ? " Save" : " Edit"}
                </ActionButton>
              ) : (
                <ActionButton onClick={handleAddVehicle}>
                  {!editing ? <FaPlus /> : <FaList />}
                  {!editing ? "Add Vehicle" : "Saved Vehicles"}
                </ActionButton>
              )}
            </ProfileHeader>

            <>
              {activeTab === "driver" && (
                <DriverForm editing={editing} setEditing={setEditing} />
              )}

              {activeTab === "vehicle" &&
                selectedVehicleId === null &&
                !editing && <VehicleList />}

              {activeTab === "vehicle" &&
                (selectedVehicleId !== null || editing) && (
                  <VehicleForm setEditing={setEditing} />
                )}
            </>
          </ProfileContent>
        </RightSection>
      </ContentWrapper>
    </MainContainer>
  );
}
