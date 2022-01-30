import React, { ReactElement } from "react";

interface formRowProps {
  type: string;
  name: string;
  value: string | number;
  handleChange(e: React.SyntheticEvent): void;
  labelText: string;
}

const FormRow = ({
  type,
  name,
  value,
  handleChange,
  labelText,
}: formRowProps): ReactElement => {
  return (
    <div className="form-row">
      <label htmlFor="name" className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        className="form-input"
      />
    </div>
  );
};

export default FormRow;
