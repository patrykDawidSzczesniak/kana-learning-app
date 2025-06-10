import { useState } from "react";
import InputField from "../components/InputField";
import ContentContainer from "../components/ContentContainer";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { validateRegistration } from "../utils/validators";
import toast from "react-hot-toast";

function RegisterPage() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [repeatPasswordError, setRepeatPasswordError] = useState<string>("");

  const navigate = useNavigate();

  const registerFunction = async () => {
    const response = await fetch("/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      const errRes = await response.json();
      throw new Error(errRes.error || "Registration failed");
    }
    toast.success("Registration successful, you can now log in");
  };

  const checkErrors = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setRepeatPasswordError("");

    const errors = validateRegistration(name, email, password, repeatPassword);

    if (errors.name) setNameError(errors.name);
    if (errors.email) setEmailError(errors.email);
    if (errors.password) setPasswordError(errors.password);
    if (errors.repeatPassword) setRepeatPasswordError(errors.repeatPassword);

    if (errors.name || errors.email || errors.password || errors.repeatPassword)
      return;

    try {
      await registerFunction();
      navigate("/login");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <ContentContainer>
        <form
          onSubmit={checkErrors}
          className="flex flex-col items-center gap-y-5"
        >
          <h1>Registration</h1>
          <InputField
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            error={!!nameError}
            errorMessage={nameError}
          />
          <InputField
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            error={!!emailError}
            errorMessage={emailError}
          />
          <InputField
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            error={!!passwordError}
            errorMessage={passwordError}
          />
          <InputField
            type="password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            placeholder="Repeat password"
            error={!!repeatPasswordError}
            errorMessage={repeatPasswordError}
          />
          <Button type="submit" label="Register" />
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </ContentContainer>
    </>
  );
}

export default RegisterPage;
