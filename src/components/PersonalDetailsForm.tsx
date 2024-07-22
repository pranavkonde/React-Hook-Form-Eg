import { useState, useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Inputs } from "./Slider";

export default function PersonalDetailsForm({
  register,
  onNext,
  errors,
  handleSubmit,
}: any) {
  const { id } = useParams();
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

  useEffect(() => {
    if (id) {
      fetch(`https://6699ff789ba098ed61fdf102.mockapi.io/draft/${id}`)
       .then(response => response.json())
       .then(data => {
          setFormData(data);
        });
    }
  }, [id]);

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
        <div className="container mt-5 p-4 bg-light rounded text-center w-60">
          <h2 className="mb-4">Personal Details</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                {...register("fullName")}
                placeholder="Full Name"
                defaultValue={formData.fullName}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                {...register("email")}
                placeholder="Email"
                defaultValue={formData.email}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="gender" className="form-label">
                Gender
              </label>
              <div>
                <label htmlFor="male" className="form-check-label mr-5">
                  Male
                </label>
                <input
                  id="male"
                  type="radio"
                  value="male"
                  className="form-check-input"
                  {...register("gender")}
                  defaultChecked={formData.gender === "male"}
                />
                <label htmlFor="female" className="form-check-label mr-5">
                  Female
                </label>
                <input
                  id="female"
                  type="radio"
                  value="female"
                  className="form-check-input"
                  {...register("gender")}
                  defaultChecked={formData.gender === "female"}
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="nationality" className="form-label">
                Nationality
              </label>
              <select
                {...register("nationality")}
                defaultValue={formData.nationality}
              >
                <option value="">Select Nationality</option>
                <option value="Indian">Indian</option>
                <option value="American">American</option>
              </select>
            </div>
            <div className="mb-3">
              <textarea
                className="form-control"
                {...register("address")}
                placeholder="Address"
                defaultValue={formData.address}
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Next
            </button>
            <button
              type="button"
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