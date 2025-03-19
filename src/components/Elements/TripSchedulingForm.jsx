import React from "react";
import {
  Form,
  LabelRow,
  Label,
  StyledInput,
  LocationFieldset,
} from "../../style/view.styles";

const TripSchedulingForm = ({ formData, setFormData, setIsNextDisabled }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      schedulingDetails: {
        ...prevData.schedulingDetails,
        [name]: value,
      },
    }));
    console.log(formData.schedulingDetails);
    if (
      formData.schedulingDetails &&
      formData.schedulingDetails.startDate &&
      formData.schedulingDetails.startTime
    )
      setIsNextDisabled(false);
  };

  return (
    <Form>
      <LocationFieldset>
        <LabelRow>
          <Label htmlFor="startDate">Start Date:</Label>
        </LabelRow>
        <StyledInput
          type="date"
          name="startDate"
          value={formData.schedulingDetails.startDate || ""}
          onChange={handleInputChange}
        />
      </LocationFieldset>

      <LocationFieldset>
        <LabelRow>
          <Label htmlFor="startTime">Start Time:</Label>
        </LabelRow>
        <StyledInput
          type="time"
          name="startTime"
          value={formData.schedulingDetails.startTime || ""}
          onChange={handleInputChange}
        />
      </LocationFieldset>
    </Form>
  );
};

export default TripSchedulingForm;
