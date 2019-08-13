import React from "react";
import { PropTypes } from "prop-types";
import classnames from "classnames";

const TextFieldGroup = ({
  field,
  value,
  label,
  error,
  type,
  onChange,
  id,
  cssClass,
  checkUserExists
}) => {
  return (
    <div className={classnames("form-group", { "has-error": error })}>
      <label className="control-label" htmlFor={id}>
        {label}
      </label>
      <input
        onChange={onChange}
        onBlur={checkUserExists}
        value={value}
        type={type}
        name={field}
        id={id}
        className={classnames("form-control", cssClass)}
      />
      {error && <span className="help-block">{error}</span>}
    </div>
  );
};

TextFieldGroup.propTypes = {
  field: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string,
  cssClass: PropTypes.string,
  onChange: PropTypes.func,
  checkUserExists: PropTypes.func
};

TextFieldGroup.defaultProps = {
  type: "text"
};

export default TextFieldGroup;
