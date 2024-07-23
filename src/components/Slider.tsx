import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import PersonalDetailsForm from "./PersonalDetailsForm";
import EducationDetailsForm from "./EducationDetailsForm";
import WEDetailsForm from "./WEDetailsForm";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { DataContext } from "./DataContext";
import { useParams } from "react-router-dom";
import ViewData from "./ViewData";

export type Inputs = {
  fullName: string;
  email: string;
  gender: string;
  nationality: string;
  address: string;
  qualification: string;
  collegeName: string;
  grade: string;
  company: string;
  totalExperience: string;
  location: string;
};

export default function Slider() {
  const [activeStep, setActiveStep] = useState(0);
  const { id } = useParams();
  const { data, setData } = useContext(DataContext);

  useEffect(() => {
    if (id) {
      fetch(`https://6699ff789ba098ed61fdf102.mockapi.io/draft/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setData((prev: any) => ({ ...data }));
          console.log("here");
        });
    }
  }, []);

  const [formData, setFormData] = useState<Inputs>({
    fullName: "",
    email: "",
    gender: "",
    nationality: "",
    address: "",
    qualification: "",
    collegeName: "",
    grade: "",
    company: "",
    totalExperience: "",
    location: "",
  });

  const [draftData, setDraftData] = useState<Inputs>({
    fullName: "",
    email: "",
    gender: "",
    nationality: "",
    address: "",
    qualification: "",
    collegeName: "",
    grade: "",
    company: "",
    totalExperience: "",
    location: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<Inputs>();

  useEffect(() => {
    const fetchDraftData = async () => {
      try {
        const response = await fetch("https://6699ff789ba098ed61fdf102.mockapi.io/draft", {
          method: "GET",
          headers: { "content-type": "application/json" },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch drafts");
        }
        const data = await response.json();
        setDraftData(data);
      } catch (error) {
        console.error("Error fetching drafts:", error);
      }
    };
    fetchDraftData();
  }, []);

  const handleStepClick = (step: number) => {
    setActiveStep(step);
  };

  const onNext = (newData: any) => {
    setFormData((prev: any) => ({ ...prev, ...newData }));
    if (activeStep < 3) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const previousStep = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const firstStep = (data: any) => {
    setActiveStep((prevStep) => prevStep - 3);
  };

  const handleAccordionToggle = (data: any) => {
    setData((prev: any) => ({ ...prev, ...data }));
    console.log("Mian Form Data", data);
  };

  return (
    <div>
      <>
        <button
          type='submit'
          className='btn btn-primary ml-5'
          onClick={() => {
            window.location.href = "/draft";
          }}
        >
          Drafts
        </button>
        <Box sx={{ width: "100%", marginTop: "50px" }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {["Personal Details", "Education Details", "Work Experience", "Review Data"].map((label, index) => (
              <Step key={index}>
                <StepLabel onClick={() => handleStepClick(index)}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === 0 && (
            <PersonalDetailsForm
              register={register}
              setValue={setValue}
              onNext={onNext}
              errors={errors}
              handleSubmit={handleSubmit}
            />
          )}
          {activeStep === 1 && (
            <EducationDetailsForm
              register={register}
              setValue={setValue}
              onNext={onNext}
              errors={errors}
              handleSubmit={handleSubmit}
              previousStep={previousStep}
            />
          )}
          {activeStep === 2 && (
            <WEDetailsForm
              register={register}
              setValue={setValue}
              handleSubmit={handleSubmit}
              onNext={onNext}
              errors={errors}
              onSubmitSuccess={handleAccordionToggle}
              previousStep={previousStep}
            />
          )}
          {activeStep === 3 && <ViewData getValues={getValues} firstStep={firstStep} />}
        </Box>
      </>
    </div>
  );
}
