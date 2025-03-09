import { useCallback, useMemo, useState } from "react";
//compoents
import CustomInputComponent from "../../components/cutomInput/CustomInput.component";
import ButtonComponent from "../../components/button/Button.component";
//icons
import { FaRegEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginValue, setLoginValue] = useState({
    email: "",
    password: "",
  });

  const passwordIcon = useMemo(() => {
    return showPassword ? <FaRegEye /> : <FaEyeSlash />;
  }, [showPassword]);

  const inputType = useMemo(() => {
    return showPassword ? "text" : "password";
  }, [showPassword]);

  const handleChange = useCallback(
    (e) => {
      const { value, name } = e.target;
      setLoginValue({ ...loginValue, [name]: value });
    },
    [loginValue]
  );

  const handleShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  console.log("login page", loginValue);

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-header">
          <h3 className="login-header__title">Login to Your Account</h3>
        </div>
        <div className="login-form">
          <form action="">
            <CustomInputComponent
              id="email"
              size="lg"
              type="text"
              label="Email"
              name="email"
              onChange={handleChange}
            />
            <CustomInputComponent
              id="password"
              type={inputType}
              label="Password"
              size="lg"
              icon={passwordIcon}
              name="password"
              onChange={handleChange}
              handleShowPassword={handleShowPassword}
            />
            <ButtonComponent size="lg" varient="secondary">
              Login
            </ButtonComponent>
          </form>
        </div>
        <div className="login-footer">
          <span className="login-footer__account">
            Don&apos;t have an account?
          </span>
          <span className="login-footer__register">Register here</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
