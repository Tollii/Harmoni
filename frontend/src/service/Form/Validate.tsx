export default function validateSignUp(values: any) {
  let errors: any = {};
  
  function checkPhonenumber(inputtxt: any) {
    var phoneno = /^\+|00?([0-9]{1,3})\)?([ ]{1})?([0-9]{8})$/;
    if (inputtxt.match(phoneno)) {
      return true;
    } else {
      return false;
    }
  }
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
  }
  if (values.telephone.length < 8) {
    errors.telephone = "8 digits required";
  }
  if (!checkPhonenumber(values.telephone)) {
    errors.telephone = "Invalid phonenumber";
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
