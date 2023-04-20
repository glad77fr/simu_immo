import React from 'react';
import { NumericFormat } from 'react-number-format';

function InputField({ label, id, onChange, isRequired, classValue, containerClass, type, ...args }) {
  const handleValueChange = (values) => {
    const { floatValue } = values;
    onChange({ target: { value: floatValue, id } });
  };

  const handleChange = (e) => {
    onChange({ target: { value: e.target.value, id } });
  };

  const renderInput = () => {
    if (type === 'number') {
      return (
        <NumericFormat
          thousandSeparator={true}
          allowNegative={false}
          onValueChange={handleValueChange}
          id={id}
          required={isRequired}
          className={`input ${classValue || ''}`}
          {...args}
        />
      );
    } else {
      return (
        <input
          type={type}
          onChange={handleChange}
          id={id}
          required={isRequired}
          className={`input ${classValue || ''}`}
          {...args}
        />
      );
    }
  };

  return (
    <div className={`inputForms ${containerClass || ''}`}>
      <p>{label}</p>
      {renderInput()}
    </div>
  );
}

export default InputField;
