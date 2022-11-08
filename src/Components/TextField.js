import React from "react";
import { ErrorMessage, Field, useField } from "formik";

const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="my-2 input-field">
      <Field
        className={`py-1.5 px-2 border-2 border-solid border-gray-400 rounded-lg textfield ${
          meta.touched && meta.error && "red"
        }`}
        {...field}
        {...props}
        autoComplete="off"
      />
      <ErrorMessage component="p" className="error" name={field.name} />
    </div>
  );
};

export default TextField;
