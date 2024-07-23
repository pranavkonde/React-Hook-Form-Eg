import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from "@mui/material";
import React, { useContext } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DataContext } from "./DataContext";
import { SubmitHandler } from "react-hook-form";
import { Inputs } from "./Slider";
import { useNavigate } from "react-router-dom";

const ViewData = ({ getValues, firstStep, handleSubmit, onSubmitSuccess }: any) => {
  // const { data, setData } = useContext(DataContext);
  const navigate = useNavigate();
  const data = getValues();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // console.log("Data of WE", data);
    // onNext(data);
    onSubmitSuccess(data);
    finalSubmit(data);
    navigate("/submit");
  };

  const finalSubmit = async (data: any) => {
    try {
      const response = await fetch("https://6699ff789ba098ed61fdf102.mockapi.io/form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log("finalSubmit", responseData);
      onSubmitSuccess(responseData);
    } catch (error) {
      console.error("There has been a problem with your fetch operation:", error);
    }
  };

  return (
    <div>
      <Accordion className='mb-3' defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
          <Typography className='accordion-title'>{data.fullName}</Typography>
          <div className='ml-5'>
            {/* <Button onClick={firstStep} variant='contained' color='primary' className=''>
              Edit
            </Button> */}
            {/* <Button onClick={() => handleDelete(data.id)} variant='contained' color='secondary'>
              Delete
            </Button> */}
          </div>
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
      <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
    </div>
  );
};

export default ViewData;
