export default function validate(values: any) {
  let errors: any = {};

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }

  if (!values.emailConfirmed) {
    errors.emailConfirmed = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.emailConfirmed = "Email address is invalid";
  }
  /*
  if (values.email === values.emailConfirmed) {
    console.log("like");
  } else {
    console.log("ikke like");
  }*/

  if (!values.password) {
    errors.password = "Password required";
  }

  if (!values.passwordConfirmed) {
    errors.passwordConfirmed = "Password required";
  }

  if (!values.fullName) {
    errors.fullName = "Full name required";
  }

  if (!values.telephone) {
    errors.telephone = "Telephone required";
  }

  return errors;
}
