import React from "react";
import { useAppContext } from "../../context/appContext";
import { Alert, FormRow, FormRowSelect } from "../../components/";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const AddJob = () => {
  const {
    showAlert,
    displayAlert,
    isLoading,
    position,
    company,
    jobLocation,
    isEditing,
    jobType,
    jobTypeOptions,
    statusOptions,
    status,
    handleChange,
    clearValues,
    createJob,
    editJob,
  } = useAppContext();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      displayAlert();
      return;
    }
    if (isEditing) {
      editJob();
      return;
    }
    createJob();
  };

  const handleJobInput = (e: any) => {
    const { name, value } = e.target;
    handleChange({ name, value });
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "Edit Job" : "Add Job"}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={handleJobInput}
          />
          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleJobInput}
          />
          <FormRow
            type="text"
            name="jobLocation"
            labelText="Job Location"
            value={jobLocation}
            handleChange={handleJobInput}
          />

          {/* Job type */}
          <FormRowSelect
            name="status"
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />

          {/* Job status */}
          <FormRowSelect
            name="jobType"
            labelText="Job Type"
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />

          {/* btn container */}
          <div className="btn-container">
            <button
              type="submit"
              className="btn btn-block submit-btn"
              disabled={isLoading}
              onClick={handleSubmit}
            >
              {isLoading ? "Processing ..." : "Save Changes"}
            </button>
            <button
              className="btn btn-block clear-btn"
              onClick={(e: any) => {
                e.preventDefault();
                clearValues();
              }}
            >
              Clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
