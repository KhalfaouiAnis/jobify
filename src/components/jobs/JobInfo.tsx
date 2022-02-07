import React from "react";
import Wrapper from "../../assets/wrappers/JobInfo";
import JobInfoInterface from "../../interfaces/JobInfoInterface";

function JobInfo({ icon, text }: JobInfoInterface) {
  return (
    <Wrapper>
      <span className="icon">{icon}</span>
      <span className="text">{text}</span>
    </Wrapper>
  );
}

export default JobInfo;
