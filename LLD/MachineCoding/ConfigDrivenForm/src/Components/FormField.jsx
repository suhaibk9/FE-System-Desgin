import {
  TextField,
  Checkbox,
  RadioButton,
  DatePicker,
  Slider,
} from "./FormElements";

const componentMapping = {
  TEXT_FIELD: TextField,
  CHECKBOX: Checkbox,
  RADIO_BUTTON: RadioButton,
  DATE_PICKER: DatePicker,
  SLIDER: Slider,
};

const FormField = ({ field, onChange }) => {
  const Component = componentMapping[field.component];
  if (!Component) return null;
  return (
    <>
      <Component {...field} onChange={onChange} />
      {field && field?.error && <div className="error">{field?.error}</div>}
    </>
  );
};
export default FormField;
