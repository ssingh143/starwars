import React from "react";

const LoadingSpinner = (props) => (
  <div className="loader">
    <i className="fa fa-spinner fa-spin" /> {props.message}
  </div>
);

export default LoadingSpinner;
