import React from "react";
import { Link } from "react-router-dom";
import Main from "../assets/images/main-alternative.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            In publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to demonstrate the visual form of a document or a
            typeface without relying on meaningful content. Lorem ipsum may be
            used as a placeholder before the final copy is available
          </p>
          <Link to="/auth" className="btn tbn-hero">
            Login/Register
          </Link>
        </div>
        <img src={Main} alt="Main" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
