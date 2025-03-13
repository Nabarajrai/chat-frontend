import CustomInputComponent from "../../components/cutomInput/CustomInput.component";
import ButtonComponent from "../../components/button/Button.component";
import { useCallback, useState } from "react";
import { Link } from "react-router";
const RegisterPage = () => {
  const [registerValues, setRegisterValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setRegisterValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  console.log(registerValues);

  return (
    <div className="register-container">
      <div className="register-wrapper">
        <div className="register-header">
          <h3>Register here!</h3>
        </div>
        <div className="register-form">
          <form>
            <CustomInputComponent
              id="firstName"
              size="lg"
              type="text"
              label="First Name"
              name="firstName"
              onChange={handleChange}
            />
            <CustomInputComponent
              id="lastName"
              size="lg"
              type="text"
              label="Last Name"
              name="lastName"
              onChange={handleChange}
            />
            <CustomInputComponent
              id="email"
              size="lg"
              type="email"
              label="Email"
              name="email"
              onChange={handleChange}
            />
            <CustomInputComponent
              id="password"
              size="lg"
              type="password"
              label="Password"
              name="password"
              onChange={handleChange}
            />
            <CustomInputComponent
              id="confirmPassword"
              size="lg"
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              onChange={handleChange}
            />
            <ButtonComponent size="lg" varient="secondary">
              Register
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
