import React, { useContext, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "./DataContext";
import { Inputs } from "./Slider";

export default function WEDetailsForm({ onNext, previousStep }: any) {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, setData } = useContext(DataContext);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: data,
  });

  useEffect(() => {
    Object.keys(data).forEach((key) => {
      setValue(key as keyof Inputs, data[key]);
    });
  }, [data, setValue]);

  const onSubmit: SubmitHandler<Inputs> = (dataNew) => {
    setData(dataNew);
    onNext(dataNew);
    // onSubmitSuccess(dataNew);
    // finalSubmit(dataNew);
    // navigate("/submit");
  };

  const onDraft: SubmitHandler<Inputs> = (dataNew) => {
    saveAsDraft(dataNew);
    setData(dataNew);
  };

  const saveAsDraft = async (data: Inputs) => {
    try {
      const method = id ? "PUT" : "POST";
      const endpoint = id
        ? `https://6699ff789ba098ed61fdf102.mockapi.io/draft/${id}`
        : `https://6699ff789ba098ed61fdf102.mockapi.io/draft/`;

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to save draft");
      }

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section>
      <div className='register'>
        <div className='container mt-3 p-4 bg-light rounded text-center'>
          <h2 className='mb-4'>Work Experience Details</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='row mb-3'>
              <div className='col-md-4'>
                <input
                  type='text'
                  className='form-control'
                  {...register("company", {
                    required: "Company name is required",
                  })}
                  placeholder='Company'
                />
                {errors.company && <p style={{ color: "red" }}>{errors.company.message}</p>}
              </div>
              <div className='col-md-4'>
                <input
                  type='text'
                  className='form-control'
                  {...register("totalExperience", {
                    required: "Total Experience is required",
                  })}
                  placeholder='Total Experience'
                />
                {errors.totalExperience && <p style={{ color: "red" }}>{errors.totalExperience.message}</p>}
              </div>
              <div className='col-md-4'>
                <input
                  type='text'
                  className='form-control'
                  {...register("location", {
                    required: "Location is required",
                  })}
                  placeholder='Location'
                />
                {errors.location && <p style={{ color: "red" }}>{errors.location.message}</p>}
              </div>
            </div>
            <button type='button' className='btn btn-primary m-5' onClick={previousStep}>
              Previous
            </button>
            <button type='submit' className='btn btn-primary'>
              Review Data
            </button>
            <button type='submit' className='btn btn-primary m-5' onClick={handleSubmit(onDraft)}>
              Save As Draft
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
