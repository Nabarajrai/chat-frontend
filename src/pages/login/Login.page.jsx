import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router";
//compoents
import CustomInputComponent from "../../components/cutomInput/CustomInput.component";
import ButtonComponent from "../../components/button/Button.component";
//hooks
import { useAuth } from "../../hooks/useAuth";
//icons
import { FaRegEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginValue, setLoginValue] = useState({
    email: "",
    password: "",
  });

  const { login, error, setError, loading } = useAuth();

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

  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();
      const body = {
        email: loginValue.email,
        password: loginValue.password,
      };
      await login(body);
    },
    [login, loginValue]
  );

  const handleFocused = useCallback(() => {
    setError("");
  }, [setError]);

  console.log("login page");

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-header">
          <h3 className="login-header__title">Login to Your Account</h3>
        </div>
        <div className="login-form">
          <form action="" onSubmit={handleLogin}>
            <CustomInputComponent
              id="email"
              size="lg"
              type="text"
              label="Email"
              name="email"
              onChange={handleChange}
              onFocus={handleFocused}
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
              onFocus={handleFocused}
            />
            {error && <div className="login-error">{error}</div>}
            <ButtonComponent size="lg" varient="secondary" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </ButtonComponent>
          </form>
        </div>
        <div className="login-footer">
          <span className="login-footer__account">
            Don&apos;t have an account?
          </span>
          <span className="login-footer__register">
            <Link to="/register">Register here</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
