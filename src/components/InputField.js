function InputField({ label, id, onChange, isRequired, classValue,containerClass, ...args }) {
  return (
    <div className={`inputForms ${containerClass || ''}`}>
      <p>{label}</p>
      <input
        type="number"
        id={id}
        onChange={onChange}
        required={isRequired}
        className={classValue} 
        {...args}
      />
    </div>
  );
}

export default InputField;
