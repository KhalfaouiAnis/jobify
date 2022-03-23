import React, { useEffect, useCallback } from "react";
import Loading from "./Loading";
import Job from "../Job";
import Wrapper from "../../assets/wrappers/JobsContainer";
import { useAppContext } from "../../context/appContext";
import PageBtnContainer from "../pagination/PageBtnContainer";

const JobsContainer = () => {
  const {
    getJobs,
    jobs,
    isLoading,
    totalJobs,
    search,
    searchStatus,
    searchType,
    sort,
    numOfPages,
    page,
  } = useAppContext();

  const fetchStatsData = useCallback(() => getJobs(), [
    search,
    searchStatus,
    searchType,
    sort,
    page,
  ]);

  useEffect(() => {
    fetchStatsData();
  }, [fetchStatsData]);

  if (isLoading) {
    return <Loading center />;
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {jobs.map((job: any) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default JobsContainer;
