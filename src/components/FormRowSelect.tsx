import React, { ReactElement } from "react";

interface FormRowSelectProps {
  type?: string;
  name?: string;
  value?: string | number;
  handleChange?(e: React.SyntheticEvent): any;
  labelText?: string;
  list: any[];
}

const FormRowSelect = ({
  name,
  value,
  handleChange,
  labelText,
  list,
}: FormRowSelectProps): ReactElement => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        value={value}
        onChange={handleChange}
        className="form-select"
      >
        {list.map((itemValue, index) => (
          <option key={index} value={itemValue}>
            {itemValue}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormRowSelect;
