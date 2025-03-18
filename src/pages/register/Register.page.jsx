import { useMemo } from "react";
import CustomInputComponent from "../../components/cutomInput/CustomInput.component";
import ButtonComponent from "../../components/button/Button.component";
import { useCallback, useState } from "react";
import { Link } from "react-router";
//hooks
import { useAuth } from "../../hooks/useAuth";
//icons
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [registerValues, setRegisterValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { loading, error, setError, register } = useAuth();

  const inputType = useMemo(() => {
    return showPassword ? "text" : "password";
  }, [showPassword]);

  const passwordIcon = useMemo(() => {
    return showPassword ? <FaRegEye /> : <FaEyeSlash />;
  }, [showPassword]);

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setRegisterValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleRegister = useCallback(
    async (event) => {
      event.preventDefault();
      const body = {
        firstName: registerValues.firstName,
        lastName: registerValues.lastName,
        email: registerValues.email,
        password: registerValues.password,
      };
      if (
        !registerValues.firstName ||
        !registerValues.lastName ||
        !registerValues.email ||
        !registerValues.password ||
        !registerValues.confirmPassword
      ) {
        setError("All fields are required!");
        return null;
      }
      if (registerValues.password !== registerValues.confirmPassword) {
        setError("Passwords do not match!");
        return null;
      }
      await register(body);
    },
    [register, registerValues, setError]
  );
  const handleFocused = useCallback(() => {
    setError("");
  }, [setError]);

  const handleShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  console.log("registerValues");

  return (
    <div className="register-container">
      <div className="register-wrapper">
        <div className="register-header">
          <h3>Register here!</h3>
        </div>
        <div className="register-form">
          <form onSubmit={handleRegister}>
            <div className="register-form__firstName">
              <CustomInputComponent
                id="firstName"
                size="lg"
                type="text"
                label="First Name"
                name="firstName"
                onChange={handleChange}
                onFocus={handleFocused}
              />
            </div>
            <div className="register-form__lastName">
              <CustomInputComponent
                id="lastName"
                size="lg"
                type="text"
                label="Last Name"
                name="lastName"
                onChange={handleChange}
                onFocus={handleFocused}
              />
            </div>
            <div className="register-form__email">
              <CustomInputComponent
                id="email"
                size="lg"
                type="email"
                label="Email"
                name="email"
                onChange={handleChange}
                onFocus={handleFocused}
              />
            </div>
            <div className="register-form__password">
              <CustomInputComponent
                id="password"
                size="lg"
                label="Password"
                name="password"
                onChange={handleChange}
                onFocus={handleFocused}
                type={inputType}
                icon={passwordIcon}
                handleShowPassword={handleShowPassword}
              />
            </div>
            <div className="register-form__confirmPassword">
              <CustomInputComponent
                id="confirmPassword"
                size="lg"
                label="Confirm Password"
                name="confirmPassword"
                onChange={handleChange}
                onFocus={handleFocused}
                type={inputType}
                icon={passwordIcon}
                handleShowPassword={handleShowPassword}
              />
              {error && <div className="register-error">{error}</div>}
            </div>
            <ButtonComponent size="lg" varient="secondary" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </ButtonComponent>
          </form>
          <div className="register-footer">
            <span className="register-footer__account">
              Do you have an account?
            </span>
            <span className="register-footer__login">
              <Link to="/login">Login here </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
