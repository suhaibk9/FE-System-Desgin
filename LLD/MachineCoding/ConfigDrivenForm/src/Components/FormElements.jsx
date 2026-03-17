const TextField = ({ name, label, isRequired, type, onChange }) => {
  const handleBlur = (e) => {
    console.log(e.target.value);
  };
  return (
    <div className="inputContainer">
      <label htmlFor="name">
        {label}
        {isRequired && "*"}
      </label>
      <input
        type={type}
        name={name}
        onChange={(e)=>onChange(e.target.value)}
        id={name}
        onBlur={handleBlur}
      />
    </div>
  );
};
const Checkbox = ({ name, label, isRequired, onChange }) => {
  return (
    <div className="checkBoxContainer">
      <input
        type="checkbox"
        name={name}
        id={name}
        onChange={(e) => onChange(e.target.checked)}
      />
      <label htmlFor={name}>
        {label}
        {isRequired && "*"}
      </label>
    </div>
  );
};
const RadioButton = ({ name, label, options, isRequired, onChange }) => {
  return (
    <div className="radioButtonContainer">
      <label htmlFor={name}>
        {label}
        {isRequired && "*"}
      </label>
      {options.map((option) => (
        <div key={option}>
          <input
            type="radio"
            name={name}
            value={option}
            id={option}
            onChange={(e) => onChange(e.target.value)}
          />
          <label htmlFor={option}>{option}</label>
        </div>
      ))}
    </div>
  );
};
const DatePicker = ({ name, label, isRequired, onChange }) => {
  return (
    <div className="datePickerContainer">
      <label htmlFor={name}>
        {label}
        {isRequired && "*"}
      </label>
      <input type="date" name={name} id={name} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
};

const Slider = ({ name, label, minValue, maxValue, isRequired, onChange }) => {
  return (
    <div className="sliderContainer">
      <label htmlFor={name}>
        {label}
        {isRequired && "*"}
      </label>
      <input
        type="range"
        name={name}
        id={name}
        min={minValue}
        max={maxValue}
        onChange={e=>onChange(e.target.value)}
      />
    </div>
  );
};

export { TextField, Checkbox, RadioButton, DatePicker, Slider };
