import React, { Fragment, useEffect, useCallback } from "react";
import { useAppContext } from "../../context/appContext";
import { Loading, StatsContainer, ChartsContainer } from "../../components";

const Stats = () => {
  const { showStats, isLoading, monthlyApplications } = useAppContext();

  const fetchStatsData = useCallback(() => showStats(), []);

  useEffect(() => {
    fetchStatsData();
  }, [fetchStatsData]);

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <Fragment>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </Fragment>
  );
};

export default Stats;
