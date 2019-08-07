import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => (
  <div className="container text-center pageNotFound">
    <h2>
      <i className="fa fa-pagelines" />
      <span className="back-404"> 404</span>
    </h2>
    <Link to="/" className="backToLoginPage">
      Return to Login Page
    </Link>
  </div>
);
export default PageNotFound;
