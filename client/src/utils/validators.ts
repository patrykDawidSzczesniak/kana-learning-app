interface LoginErrors {
  email?: string;
  password?: string;
}

interface RegistrationErrors extends LoginErrors {
  name?: string;
  repeatPassword?: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

export const validateLogin = (
  email: string,
  password: string
): LoginErrors => {
  const errors: LoginErrors = {};

  if (!email.trim()) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(email)) {
    errors.email = "Invalid email format";
  }

  if (!password.trim()) {
    errors.password = "Password is required";
  } else if (!passwordRegex.test(password)) {
    errors.password =
      "Password must be 8+ characters, include a number and a special character";
  }

  return errors;
};

export const validateRegistration = (
  name: string,
  email: string,
  password: string,
  repeatPassword: string
): RegistrationErrors => {
  const errors: RegistrationErrors = validateLogin(email, password);

  if (!name.trim()) {
    errors.name = "Name is required";
  } else if (name.length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!repeatPassword.trim()) {
    errors.repeatPassword = "Please confirm your password";
  } else if (password !== repeatPassword) {
    errors.repeatPassword = "Passwords do not match";
  }

  return errors;
};
