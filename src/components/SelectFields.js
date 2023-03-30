import React from 'react';


function SelectField({ label, id, options, onChange, defaultValue , classType}) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <select id={id} onChange={onChange} defaultValue={defaultValue} class={classType}>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectField;
