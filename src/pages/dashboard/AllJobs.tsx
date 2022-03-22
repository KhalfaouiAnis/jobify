import React, { Fragment } from "react";
import { JobsContainer, SearchContainer } from "../../components";

const AllJobs = () => {
  return (
    <Fragment>
      <SearchContainer />
      <JobsContainer />
    </Fragment>
  );
};

export default AllJobs;
