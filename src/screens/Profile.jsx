import React, { useState } from "react";
import { NavTabs, NavTab, ActionButton, LeftSectionHeader, LeftSectionContainer } from "../style/view.styles";
import {
  ProfileContent,
  ProfileHeader,
} from "../style/profile.styles";
import MainLayout from "../components/Layout/MainLayout";
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
  const [activeTab, setActiveTab] = useState("vehicle");
  const [editing, setEditing] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);

  const toggleEdit = () => {
    setEditing(!editing);
  };

  const handleAddVehicle = () => {
    setSelectedVehicleId(null);
    setEditing(!editing);
  };

  // Create the left content (profile navigation)
  const leftContent = (
    <LeftSectionContainer >
      <LeftSectionHeader>
        <h2>Profile</h2>
      </LeftSectionHeader>
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
    </LeftSectionContainer>
  );

  // Create the right content (profile content)
  const rightContent = (
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
        {activeTab === "vehicle" && selectedVehicleId === null && !editing && (
          <VehicleList />
        )}
        {activeTab === "vehicle" && (selectedVehicleId !== null || editing) && (
          <VehicleForm setEditing={setEditing} />
        )}
      </>
    </ProfileContent>
  );

  return (
    <MainLayout
      leftContent={leftContent}
      rightContent={rightContent}
      initialSidebarWidth={240}
      initialSidebarState={true}
    />
  );
}
