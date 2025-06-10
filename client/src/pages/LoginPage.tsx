import { useState } from "react";
import InputField from "../components/InputField";
import ContentContainer from "../components/ContentContainer";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { validateLogin } from "../utils/validators";
import toast from "react-hot-toast";

function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const auth = useAuth();

  const checkErrors = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    const errors = validateLogin(email, password);

    if (errors.email) setEmailError(errors.email);
    if (errors.password) setPasswordError(errors.password);

    if (errors.email || errors.password) return;

    try {
      await auth?.loginFunction({ email, password });
    } catch (err: any) {
      toast.error(err.message || "Login failed");
    }
  };

  return (
    <>
      <ContentContainer>
        <form
          onSubmit={checkErrors}
          className="flex flex-col items-center gap-y-5"
        >
          <h1>Login</h1>
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
          <Button type="submit" label="Login" />
          <p>
            Don't have account yet? <Link to="/register">Register</Link>
          </p>
        </form>
      </ContentContainer>
    </>
  );
}

export default LoginPage;
