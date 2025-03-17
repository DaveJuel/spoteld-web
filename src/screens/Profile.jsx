import React, { useState } from "react";
import styled from "styled-components";
import SidebarNav from "../components/Nav/Sidebar";
import { FaUser, FaTruck, FaEdit, FaSave } from "react-icons/fa";

export default function Profile() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(240);
  const [activeTab, setActiveTab] = useState("driver");
  const [editing, setEditing] = useState(false);

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
    preferredRoutes: ["East Coast", "Midwest"]
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
    insuranceExpiry: "2026-03-30"
  });

  // Toggle edit mode
  const toggleEdit = () => {
    setEditing(!editing);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setEditing(false);
    // In a real app, you would save the data to the server here
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
                onClick={() => setActiveTab("driver")}
              >
                <FaUser />
                <span>Driver</span>
              </NavTab>
              <NavTab 
                active={activeTab === "carrier"} 
                onClick={() => setActiveTab("carrier")}
              >
                <FaTruck />
                <span>Carrier</span>
              </NavTab>
            </NavTabs>
          </ProfileNav>
        </LeftSection>
        <RightSection>
          <ProfileContent>
            <ProfileHeader>
              <h1>{activeTab === "driver" ? "Driver Profile" : "Carrier Profile"}</h1>
              <ActionButton onClick={toggleEdit}>
                {editing ? <FaSave /> : <FaEdit />}
                {editing ? " Save" : " Edit"}
              </ActionButton>
            </ProfileHeader>

            {activeTab === "driver" ? (
              <form onSubmit={handleSubmit}>
                <ProfileGrid>
                  <FormGroup>
                    <Label>Driver ID</Label>
                    <Input value={driverProfile.id} disabled />
                  </FormGroup>
                  <FormGroup>
                    <Label>First Name</Label>
                    <Input 
                      value={driverProfile.firstName} 
                      disabled={!editing}
                      onChange={(e) => setDriverProfile({...driverProfile, firstName: e.target.value})}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Last Name</Label>
                    <Input 
                      value={driverProfile.lastName} 
                      disabled={!editing}
                      onChange={(e) => setDriverProfile({...driverProfile, lastName: e.target.value})}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Email</Label>
                    <Input 
                      value={driverProfile.email} 
                      disabled={!editing}
                      onChange={(e) => setDriverProfile({...driverProfile, email: e.target.value})}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Phone</Label>
                    <Input 
                      value={driverProfile.phone} 
                      disabled={!editing}
                      onChange={(e) => setDriverProfile({...driverProfile, phone: e.target.value})}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>License Number</Label>
                    <Input 
                      value={driverProfile.licenseNumber} 
                      disabled={!editing}
                      onChange={(e) => setDriverProfile({...driverProfile, licenseNumber: e.target.value})}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>License Expiry</Label>
                    <Input 
                      type="date" 
                      value={driverProfile.licenseExpiry} 
                      disabled={!editing}
                      onChange={(e) => setDriverProfile({...driverProfile, licenseExpiry: e.target.value})}
                    />
                  </FormGroup>
                  <FormGroup fullWidth>
                    <Label>Address</Label>
                    <Input 
                      value={driverProfile.address} 
                      disabled={!editing}
                      onChange={(e) => setDriverProfile({...driverProfile, address: e.target.value})}
                    />
                  </FormGroup>
                  <FormGroup fullWidth>
                    <Label>Emergency Contact</Label>
                    <Input 
                      value={driverProfile.emergencyContact} 
                      disabled={!editing}
                      onChange={(e) => setDriverProfile({...driverProfile, emergencyContact: e.target.value})}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Experience</Label>
                    <Input 
                      value={driverProfile.experience} 
                      disabled={!editing}
                      onChange={(e) => setDriverProfile({...driverProfile, experience: e.target.value})}
                    />
                  </FormGroup>
                </ProfileGrid>
              </form>
            ) : (
              <form onSubmit={handleSubmit}>
                <ProfileGrid>
                  <FormGroup>
                    <Label>Carrier ID</Label>
                    <Input value={carrierProfile.id} disabled />
                  </FormGroup>
                  <FormGroup fullWidth>
                    <Label>Company Name</Label>
                    <Input 
                      value={carrierProfile.companyName} 
                      disabled={!editing}
                      onChange={(e) => setCarrierProfile({...carrierProfile, companyName: e.target.value})}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>DOT Number</Label>
                    <Input 
                      value={carrierProfile.dot} 
                      disabled={!editing}
                      onChange={(e) => setCarrierProfile({...carrierProfile, dot: e.target.value})}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>MC Number</Label>
                    <Input 
                      value={carrierProfile.mcNumber} 
                      disabled={!editing}
                      onChange={(e) => setCarrierProfile({...carrierProfile, mcNumber: e.target.value})}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Email</Label>
                    <Input 
                      value={carrierProfile.email} 
                      disabled={!editing}
                      onChange={(e) => setCarrierProfile({...carrierProfile, email: e.target.value})}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Phone</Label>
                    <Input 
                      value={carrierProfile.phone} 
                      disabled={!editing}
                      onChange={(e) => setCarrierProfile({...carrierProfile, phone: e.target.value})}
                    />
                  </FormGroup>
                  <FormGroup fullWidth>
                    <Label>Address</Label>
                    <Input 
                      value={carrierProfile.address} 
                      disabled={!editing}
                      onChange={(e) => setCarrierProfile({...carrierProfile, address: e.target.value})}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Fleet Size</Label>
                    <Input 
                      type="number" 
                      value={carrierProfile.fleetSize} 
                      disabled={!editing}
                      onChange={(e) => setCarrierProfile({...carrierProfile, fleetSize: e.target.value})}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Insurance Provider</Label>
                    <Input 
                      value={carrierProfile.insuranceProvider} 
                      disabled={!editing}
                      onChange={(e) => setCarrierProfile({...carrierProfile, insuranceProvider: e.target.value})}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Insurance Policy</Label>
                    <Input 
                      value={carrierProfile.insurancePolicy} 
                      disabled={!editing}
                      onChange={(e) => setCarrierProfile({...carrierProfile, insurancePolicy: e.target.value})}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Insurance Expiry</Label>
                    <Input 
                      type="date" 
                      value={carrierProfile.insuranceExpiry} 
                      disabled={!editing}
                      onChange={(e) => setCarrierProfile({...carrierProfile, insuranceExpiry: e.target.value})}
                    />
                  </FormGroup>
                </ProfileGrid>
              </form>
            )}
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
  background: ${props => props.active ? '#f0f7ff' : 'transparent'};
  border-left: 3px solid ${props => props.active ? '#2c3e50' : 'transparent'};
  
  &:hover {
    background: ${props => props.active ? '#f0f7ff' : '#f5f5f5'};
  }
  
  span {
    margin-left: 10px;
    font-size: 15px;
    color: ${props => props.active ? '#2c3e50' : '#666'};
  }
  
  svg {
    color: ${props => props.active ? '#2c3e50' : '#666'};
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

const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const FormGroup = styled.div`
  grid-column: ${props => props.fullWidth ? '1 / -1' : 'auto'};
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #666;
  font-size: 14px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid ${props => props.disabled ? '#ddd' : '#ccc'};
  border-radius: 4px;
  background: ${props => props.disabled ? '#f9f9f9' : 'white'};
  color: ${props => props.disabled ? '#666' : '#333'};
  
  &:focus {
    outline: none;
    border-color: #2c3e50;
    box-shadow: 0 0 0 2px rgba(44, 62, 80, 0.1);
  }
`;