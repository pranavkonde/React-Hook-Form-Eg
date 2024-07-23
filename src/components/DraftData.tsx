import React, { useContext, useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { DataContext } from "./DataContext";

function DraftData({ onDelete, onEdit }: any) {
  const navigate = useNavigate();
  const { data, setData } = useContext(DataContext);
  const [draftData, setDraftData] = useState([]);

  const handleEdit = (itemId: number) => {
    navigate(`/edit/${itemId}`);
  };

  const fetchData = () => {
    fetch("https://6699ff789ba098ed61fdf102.mockapi.io/draft")
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((fetchedData) => {
        setDraftData(fetchedData);
      })
      .catch((error) => console.error("There has been a problem with your fetch operation:", error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (itemId: number) => {
    fetch(`https://6699ff789ba098ed61fdf102.mockapi.io/draft/${itemId}`, {
      method: "DELETE",
    })
      .then(() => {
        fetchData();
        onDelete(itemId);
      })
      .catch((error) => console.error("Error deleting item:", error));
  };

  return (
    <div className='container m-5'>
      {draftData.map((item: any, index: number) => (
        <Accordion key={index} className='mb-3'>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
            <Typography className='accordion-title'>{item.fullName}</Typography>
            <div className='ml-5'>
              <Button onClick={() => handleEdit(item.id)} variant='contained' color='primary' className=''>
                Edit
              </Button>
              <Button onClick={() => handleDelete(item.id)} variant='contained' color='secondary'>
                Delete
              </Button>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Full Name: {item.fullName} <br />
              Email: {item.email} <br />
              Gender: {item.gender} <br />
              Nationality: {item.nationality} <br />
              Address: {item.address} <br />
              Qualification: {item.qualification} <br />
              College Name: {item.collegeName} <br />
              Grade: {item.grade} <br />
              Company: {item.company} <br />
              Total Experience: {item.totalExperience} <br />
              Location: {item.location}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default DraftData;
