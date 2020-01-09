import { useState } from "react";

const useForm = (callback: any, initialValues: any) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    callback();
  };

  return {
    handleChange,
    handleSubmit,
    values
  };
};

export default useForm;
