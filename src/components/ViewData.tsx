import React, { useContext } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SubmitHandler } from "react-hook-form";
import { Inputs } from "./Slider";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "./DataContext";

const ViewData = ({ getValues, firstStep, handleSubmit, onSubmitSuccess }: any) => {
  const navigate = useNavigate();
  const { data, setData } = useContext(DataContext);
  const { formId } = useParams();

  const onSubmit = () => {
    finalSubmit(data);
    onSubmitSuccess(data);
  };

  const finalSubmit = async (data: any) => {
    try {
      const response = await fetch(
        formId
          ? `https://6699ff789ba098ed61fdf102.mockapi.io/form/${formId}`
          : "https://6699ff789ba098ed61fdf102.mockapi.io/form",
        {
          method: formId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      setData({});
      console.log("finalSubmit", responseData);
      navigate("/submit");
    } catch (error) {
      console.error("There has been a problem with your fetch operation:", error);
    }
  };

  return (
    <div>
      <Accordion className='mb-3' defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
          <Typography className='accordion-title'>Review Your Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Full Name: {data.fullName} <br />
            Email: {data.email} <br />
            Gender: {data.gender} <br />
            Nationality: {data.nationality} <br />
            Address: {data.address} <br />
            Qualification: {data.qualification} <br />
            College Name: {data.collegeName} <br />
            Grade: {data.grade} <br />
            Company: {data.company} <br />
            Total Experience: {data.totalExperience} <br />
            Location: {data.location}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Button onClick={handleSubmit(onSubmit)} variant='contained' color='primary' className='mr-3'>
        Submit
      </Button>
      <Button onClick={firstStep} variant='contained' color='secondary'>
        Edit
      </Button>
    </div>
  );
};

export default ViewData;
