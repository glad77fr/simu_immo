function InputField({ label, id, onChange, isRequired, classValue, ...args }) {
  return (
    <div>
      <p>{label}</p>
      <input
        type="number"
        id={id}
        onChange={onChange}
        required={isRequired}
        class={classValue}
        {...args}
      />
    </div>
  );
}

export default InputField;
