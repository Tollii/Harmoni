export default function validateSignUp(values: any) {
  let errors: any = {};

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }

  if (!values.emailConfirmed) {
    errors.emailConfirmed = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.emailConfirmed)) {
    errors.emailConfirmed = "Email address is invalid";
  } else if (values.email !== values.emailConfirmed) {
    errors.email = "Emails does not match";
    errors.emailConfirmed = "Emails does not match";
    console.log("Email er ikke like");
  }

  if (!values.password) {
    errors.password = "Password required";
  }

  if (!values.passwordConfirmed) {
    errors.passwordConfirmed = "Password required";
  } else if (values.password !== values.passwordConfirmed) {
    errors.password = "Passwords does not match";
    errors.passwordConfirmed = "Passwords does not match";
    console.log("Passord er ikke like");
  }
  if (!values.fullName) {
    errors.fullName = "Full name required";
  }
  if (!values.telephone) {
    errors.telephone = "Telephone required";
  } else if (values.telephone.length < 8) {
    errors.telephone = "8 digits required";
  } else if (values.telephone.replace(/[^0-9]/g).length !== 8) {
    errors.telephone = "8 digits required";
  }

  return errors;
}

export function validateLogin(values: any) {
  let errors: any = {};

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }

  if (!values.emailConfirmed) {
    errors.emailConfirmed = "Email is required";
  }

  if (!values.password) {
    errors.password = "Password required";
  }

  return errors;
}
