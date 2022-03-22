import React from "react";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import moment from "moment";
import JobInterface from "../interfaces/JobInterface";
import { useAppContext } from "../context/appContext";

import Wrapper from "../assets/wrappers/Job";
import JobInfo from "../components/jobs/JobInfo";

function Job({
  _id: jobId,
  position,
  jobType,
  jobLocation,
  company,
  status,
  createdAt,
}: JobInterface) {
  const { setEditJob, deleteJob } = useAppContext();

  const date = moment(createdAt?.toString());

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company?.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo
            icon={<FaCalendarAlt />}
            text={date.format("MMM Do, YYYY")}
          />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className="actions">
            <Link
              className="btn edit-btn"
              to="/add-job"
              onClick={() => setEditJob(jobId)}
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => deleteJob(jobId)}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
}

export default Job;
