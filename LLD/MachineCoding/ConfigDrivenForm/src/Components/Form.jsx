import { useState } from "react";
import FormField from "./FormField";
import "../Form.css";
import * as yup from "yup";
const Form = ({ schema = [], onSubmit }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  // Correct Yup validation schema creation
  const validationSchema = yup.object().shape(
    schema.reduce((acc, field) => {
      acc[field.name] = field.validate;
      return acc;
    }, {}),
  );
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      onSubmit(e, formData);
    } catch (err) {
      if (err.inner) {
        const newErrors = {};
        err.inner.forEach((validationError) => {
          newErrors[validationError.path] = validationError.message;
        });
        setErrors(newErrors);
      }
    }
  };
  return (
    <form className="form-container" onSubmit={handleFormSubmit}>
      {schema.map((field, idx) => {
        return (
          <FormField
            key={idx}
            value={formData[field.name]}
            onChange={(value) => handleChange(field.name, value)}
            field={{
              ...field,
              error: errors[field.name],
            }}
          />
        );
      })}
      <button type="submit">Submit</button>
    </form>
  );
};
export default Form;
