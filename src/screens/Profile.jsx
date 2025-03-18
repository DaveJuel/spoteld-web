import React, { useState } from "react";
import styled from "styled-components";
import SidebarNav from "../components/Nav/Sidebar";
import { FaUser, FaTruck, FaEdit, FaSave, FaCar, FaPlus, FaList } from "react-icons/fa";

// Import new components
import DriverForm from "../components/Elements/DriverForm";
import CarrierForm from "../components/Elements/CarrierForm";
import VehicleForm from "../components/Elements/VehicleForm";
import VehicleList from "../components/Elements/VehicleList";

export default function Profile() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(240);
  const [activeTab, setActiveTab] = useState("driver");
  const [editing, setEditing] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);

  // Function to handle sidebar state changes
  const handleSidebarChange = (isOpen, width) => {
    setSidebarOpen(isOpen);
    setSidebarWidth(width);
  };

  const [carrierProfile, setCarrierProfile] = useState({
    id: "CR-5678",
    companyName: "Fast Logistics Inc.",
    dot: "DOT-12345678",
    mcNumber: "MC-987654",
    email: "dispatch@fastlogistics.com",
    phone: "(555) 765-4321",
    address: "456 Commerce Dr, Businesstown, USA",
    fleetSize: 28,
    insuranceProvider: "SafeHaul Insurance",
    insurancePolicy: "INS-789012345",
    insuranceExpiry: "2026-03-30",
  });

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
                active={activeTab === "driver"}
                onClick={() => {
                  setActiveTab("driver");
                  setSelectedVehicleId(null);
                }}
              >
                <FaUser />
                <span>Driver</span>
              </NavTab>
              <NavTab
                active={activeTab === "carrier"}
                onClick={() => {
                  setActiveTab("carrier");
                  setSelectedVehicleId(null);
                }}
              >
                <FaTruck />
                <span>Carrier</span>
              </NavTab>
              <NavTab
                active={activeTab === "vehicle"}
                onClick={() => {
                  setActiveTab("vehicle");
                  setSelectedVehicleId(null);
                }}
              >
                <FaCar />
                <span>Vehicles</span>
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
                  {!editing ? <FaPlus />: <FaList />}
                  {!editing ? "Add Vehicle":"Saved Vehicles"}
                </ActionButton>
              )}
            </ProfileHeader>

            <>
              {activeTab === "driver" && <DriverForm editing={editing} setEditing={setEditing} />}

              {activeTab === "carrier" && (
                <CarrierForm
                  carrierProfile={carrierProfile}
                  editing={editing}
                  onChange={setCarrierProfile}
                />
              )}

              {activeTab === "vehicle" &&
                selectedVehicleId === null &&
                !editing && (
                  <VehicleList
                  />
                )}

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

const MainContainer = styled.div`
  display: flex;
  height: 100vh;
  background: #f0f4f8;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  padding: 0;
  gap: 20px;
  transition: all 0.3s ease;
  margin-left: 0;
`;

const LeftSection = styled.div`
  flex: 0 0 250px;
  height: 100%;
  border-right: 1px solid #ddd;
  background: white;
`;

const ProfileNav = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ProfileNavHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #eee;

  h2 {
    margin: 0;
    color: #333;
  }
`;

const NavTabs = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0;
`;

const NavTab = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${(props) => (props.active ? "#f0f7ff" : "transparent")};
  border-left: 3px solid
    ${(props) => (props.active ? "#2c3e50" : "transparent")};

  &:hover {
    background: ${(props) => (props.active ? "#f0f7ff" : "#f5f5f5")};
  }

  span {
    margin-left: 10px;
    font-size: 15px;
    color: ${(props) => (props.active ? "#2c3e50" : "#666")};
  }

  svg {
    color: ${(props) => (props.active ? "#2c3e50" : "#666")};
  }
`;

const RightSection = styled.div`
  flex: 1;
  height: 100%;
  overflow-y: auto;
  padding: 20px;
`;

const ProfileContent = styled.div`
  background: white;
  padding: 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const ProfileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;

  h1 {
    margin: 0;
    color: #333;
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  background: #2c3e50;
  color: white;
  border: none;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #34495e;
  }

  svg {
    margin-right: 5px;
  }
`;
