import { useNavigate } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import { Inputs } from "./Slider";


export default function WEDetailsForm({
  register,
  handleSubmit,
  onSubmitSuccess,
  onNext,
  errors,
  previousStep
}: any) {
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("Data of WE", data)
    onNext(data);
    onSubmitSuccess(data);
    finalSubmit(data);
    navigate("/submit");
  };

  const finalSubmit = async (data: any) =>{
    try {
      const response = await fetch(
        "https://6699ff789ba098ed61fdf102.mockapi.io/form",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log("finalSubmit", responseData);
      onSubmitSuccess(responseData);
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
  }
}

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
        <div className="container mt-3 p-4 bg-light rounded text-center">
          <h2 className="mb-4">Work Experience Details</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row mb-3">
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  {...register("company", {
                    required: "Company name is required",
                  })}
                  placeholder="Company"
                />
                {errors.company && (
                  <p style={{ color: "red" }}>{errors.company.message}</p>
                )}
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  {...register("totalExperience", {
                    required: "Total Experience is required",
                  })}
                  placeholder="Total Experience"
                />
                {errors.totalExperience && (
                  <p style={{ color: "red" }}>
                    {errors.totalExperience.message}
                  </p>
                )}
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  {...register("location", {
                    required: "Location is required",
                  })}
                  placeholder="Location"
                />
                {errors.location && (
                  <p style={{ color: "red" }}>{errors.location.message}</p>
                )}
              </div>
            </div>
            <button
              type="button"
              className="btn btn-primary m-5"
              onClick={previousStep}
            >
              Previous
            </button>
            <button type="submit" className="btn btn-primary w-50">
              Submit
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
