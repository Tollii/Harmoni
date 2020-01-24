export default function validateSignUp(values: any) {
  let errors: any = {};

  function checkPhonenumber(inputtxt: any) {
    var phoneno = /^(\+[1-9]{1,3})?([ ]{1})?([0-9]{8})$/;
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
  }

  if (!values.password) {
    errors.password = "Password required";
  }

  if (!values.passwordConfirmed) {
    errors.passwordConfirmed = "Password required";
  } else if (values.password !== values.passwordConfirmed) {
    errors.password = "Passwords does not match";
    errors.passwordConfirmed = "Passwords does not match";
  }
  if (!values.username) {
    errors.username = "Full name required";
  }
  if (!values.phone) {
    errors.phone = "phone required";
  }
  if (values.phone.length < 8) {
    errors.phone = "8 digits required";
  }
  if (!checkPhonenumber(values.phone)) {
    errors.phone = "Invalid phonenumber";
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

  if (!values.password) {
    errors.password = "Password required";
  }

  return errors;
}

export function validateEmail(values: any) {
  let errors: any = {};

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }
  return errors;
}

export function validatePassword(values: any) {
  let errors: any = {};

  if (!values.password) {
    errors.password = "Password required";
  }

  if (!values.passwordConfirmed) {
    errors.passwordConfirmed = "Password required";
  } else if (values.password !== values.passwordConfirmed) {
    errors.password = "Passwords does not match";
    errors.passwordConfirmed = "Passwords does not match";
  }
  return errors;
}
