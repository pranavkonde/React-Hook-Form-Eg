import React, { useState, useEffect, useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";
import { DataContext } from "./DataContext";
import { Inputs } from "./Slider";

export default function PersonalDetailsForm({ onNext }: any) {
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
        <div className='container mt-5 p-4 bg-light rounded text-center w-60'>
          <h2 className='mb-4'>Personal Details</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-3'>
              <input
                type='text'
                className='form-control'
                {...register("fullName", { required: true })}
                placeholder='Full Name'
              />
              {errors.fullName && <span className='text-danger'>Full Name is required</span>}
            </div>
            <div className='mb-3'>
              <input
                type='text'
                className='form-control'
                {...register("email", { required: true })}
                placeholder='Email'
              />
              {errors.email && <span className='text-danger'>Email is required</span>}
            </div>
            <div className='mb-3'>
              <label htmlFor='gender' className='form-label'>
                Gender
              </label>
              <div>
                <label htmlFor='male' className='form-check-label mr-5'>
                  Male
                </label>
                <input
                  id='male'
                  type='radio'
                  value='male'
                  className='form-check-input'
                  {...register("gender", { required: true })}
                />
                <label htmlFor='female' className='form-check-label mr-5'>
                  Female
                </label>
                <input
                  id='female'
                  type='radio'
                  value='female'
                  className='form-check-input'
                  {...register("gender", { required: true })}
                />
              </div>
              {errors.gender && <span className='text-danger'>Gender is required</span>}
            </div>
            <div className='mb-3'>
              <label htmlFor='nationality' className='form-label'>
                Nationality
              </label>
              <select className='form-control' {...register("nationality", { required: true })}>
                <option value=''>Select Nationality</option>
                <option value='Indian'>Indian</option>
                <option value='American'>American</option>
              </select>
              {errors.nationality && <span className='text-danger'>Nationality is required</span>}
            </div>
            <div className='mb-3'>
              <textarea
                className='form-control'
                {...register("address", { required: true })}
                placeholder='Address'
              ></textarea>
              {errors.address && <span className='text-danger'>Address is required</span>}
            </div>
            <button type='submit' className='btn btn-primary'>
              Next
            </button>
            <button type='button' className='btn btn-primary m-5' onClick={handleSubmit(onDraft)}>
              Save As Draft
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
