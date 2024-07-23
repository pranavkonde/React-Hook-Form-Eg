import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from "@mui/material";
import React, { useContext } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DataContext } from "./DataContext";

const ViewData = ({ getValues, firstStep }: any) => {
  // const { data, setData } = useContext(DataContext);
  const data = getValues();

  return (
    <div>
      <Accordion className='mb-3' defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
          <Typography className='accordion-title'>{data.fullName}</Typography>
          <div className='ml-5'>
            <Button onClick={firstStep} variant='contained' color='primary' className=''>
              Edit
            </Button>
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
    </div>
  );
};

export default ViewData;
