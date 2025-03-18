import React, { useState } from "react";
import styled from "styled-components";
import SidebarNav from "../components/Nav/Sidebar";
import { FaUser, FaTruck, FaEdit, FaSave, FaCar, FaPlus } from "react-icons/fa";

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

  // Dummy profile data
  const [driverProfile, setDriverProfile] = useState({
    id: "DR-1234",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    licenseNumber: "DL-987654321",
    licenseExpiry: "2028-05-15",
    address: "123 Main Street, Anytown, USA",
    emergencyContact: "Jane Doe - (555) 987-6543",
    experience: "5 years",
    preferredRoutes: ["East Coast", "Midwest"],
  });

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

  // Vehicle data
  const [vehicles, setVehicles] = useState([
    {
      id: "VH-001",
      make: "Freightliner",
      model: "Cascadia",
      year: 2020,
      vin: "1FUJGBDV9LLXXXXXX",
      licensePlate: "TRK-1234",
      state: "CA",
      registrationExpiry: "2026-03-15",
      lastInspection: "2024-12-10",
      status: "active",
      notes: "Regular maintenance performed on schedule",
    },
    {
      id: "VH-002",
      make: "Peterbilt",
      model: "579",
      year: 2019,
      vin: "2PTRGLMD8KYXXXXXX",
      licensePlate: "TRK-5678",
      state: "TX",
      registrationExpiry: "2025-08-22",
      lastInspection: "2024-11-05",
      status: "maintenance",
      notes: "Needs transmission service",
    },
  ]);

  const [activeVehicleId, setActiveVehicleId] = useState("VH-001");

  // Default empty vehicle for new entries
  const emptyVehicle = {
    id: "",
    make: "",
    model: "",
    year: new Date().getFullYear(),
    vin: "",
    licensePlate: "",
    state: "",
    registrationExpiry: "",
    lastInspection: "",
    status: "inactive",
    notes: "",
  };

  // Get the currently selected vehicle
  const getSelectedVehicle = () => {
    if (!selectedVehicleId) return emptyVehicle;
    return vehicles.find((v) => v.id === selectedVehicleId) || emptyVehicle;
  };

  // Toggle edit mode
  const toggleEdit = () => {
    setEditing(!editing);
    // Reset vehicle selection when toggling edit mode
    if (editing) {
      setSelectedVehicleId(null);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setEditing(false);
    setSelectedVehicleId(null);
    // In a real app, you would save the data to the server here
  };

  // Handle vehicle selection
  const handleVehicleSelect = (vehicleId) => {
    setSelectedVehicleId(vehicleId);
    setEditing(true); // Enable editing when selecting a vehicle
  };

  // Handle setting active vehicle
  const handleSetActiveVehicle = (vehicleId) => {
    setActiveVehicleId(vehicleId);
  };

  // Handle vehicle delete
  const handleDeleteVehicle = (vehicleId) => {
    setVehicles(vehicles.filter((v) => v.id !== vehicleId));
    if (selectedVehicleId === vehicleId) {
      setSelectedVehicleId(null);
    }
    if (activeVehicleId === vehicleId) {
      setActiveVehicleId(vehicles.find((v) => v.id !== vehicleId)?.id || null);
    }
  };

  // Handle vehicle update
  const handleVehicleUpdate = (updatedVehicle) => {
    if (selectedVehicleId) {
      // Update existing vehicle
      setVehicles(
        vehicles.map((v) => (v.id === selectedVehicleId ? updatedVehicle : v))
      );
    } else {
      // Add new vehicle with generated ID
      const newVehicle = {
        ...updatedVehicle,
        id: `VH-${String(vehicles.length + 1).padStart(3, "0")}`,
      };
      setVehicles([...vehicles, newVehicle]);
      setSelectedVehicleId(newVehicle.id);
    }
  };

  // Add new vehicle
  const handleAddVehicle = () => {
    setSelectedVehicleId(null); // Set to null to indicate new vehicle
    setEditing(true);
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
                  <FaPlus /> Add Vehicle
                </ActionButton>
              )}
            </ProfileHeader>

            <form onSubmit={handleSubmit}>
              {activeTab === "driver" && (
                <DriverForm
                  driverProfile={driverProfile}
                  editing={editing}
                  onChange={setDriverProfile}
                />
              )}

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
                    vehicles={vehicles}
                    onSelect={handleVehicleSelect}
                    onSetActive={handleSetActiveVehicle}
                    onDelete={handleDeleteVehicle}
                    activeVehicleId={activeVehicleId}
                  />
                )}

              {activeTab === "vehicle" &&
                (selectedVehicleId !== null || editing) && (
                  <VehicleForm
                    vehicle={getSelectedVehicle()}
                    editing={editing}
                    onChange={handleVehicleUpdate}
                  />
                )}
            </form>
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
  border-radius: 8px;
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
  border-radius: 4px;
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
