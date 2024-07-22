import {  SubmitHandler } from "react-hook-form";
import { Inputs } from "./Slider";


export default function EducationDetailsForm({ register, onNext, errors, handleSubmit, previousStep }: any) {
    const onSubmit: SubmitHandler<Inputs> = (data) => {
      onNext(data);
    };

    const onDraft: SubmitHandler<Inputs> = (data) => {
        saveAsDraft(data);
      };
    
      const saveAsDraft = async (data: any) => {
        try {
          const response = await fetch('https://6699ff789ba098ed61fdf102.mockapi.io/draft', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
    
          if (!response.ok) {
            throw new Error('Failed to save draft');
          }
    
          const result = await response.json();
          console.log(result);
        } catch (error) {
          console.error('Error:', error);
        }
      };

    return (
      <section>
        <div className="register">
          <div className="container mt-5 p-4 bg-light rounded text-center">
            <h2 className="mb-4">Education Details</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    {...register("qualification")}
                    placeholder="Qualification"
                  />
                  {/* {errors.qualification && (
                    <p style={{ color: "red" }}>{errors.qualification.message}</p>
                  )} */}
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    {...register("collegeName")}
                    placeholder="College Name"
                  />
                  {/* {errors.collegeName && (
                    <p style={{ color: "red" }}>{errors.collegeName.message}</p>
                  )} */}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-12">
                  <input
                    type="text"
                    className="form-control"
                    {...register("grade")}
                    placeholder="Grade"
                  />
                  {/* {errors.grade && (
                    <p style={{ color: "red" }}>{errors.grade.message}</p>
                  )} */}
                </div>
              </div>
              <button
              type="button"
              className="btn btn-primary m-5"
              onClick={previousStep}
            >
              Previous
            </button>
              <button type="submit" className="btn btn-primary">
                Next
              </button>
              <button
              type="submit"
              className="btn btn-primary m-5"
              onClick={handleSubmit(onDraft)}
            >
              Save As Draft
            </button>
            </form>
          </div>
        </div>
      </section>
    );
  }