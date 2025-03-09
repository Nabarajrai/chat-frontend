import { useCallback, useState } from "react";
import CustomInputComponent from "../../components/cutomInput/CustomInput.component";
//icons
import { FaRegEye } from "react-icons/fa";

const LoginPage = () => {
  const [loginValue, setLoginValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = useCallback(
    (e) => {
      const { value, name } = e.target;
      setLoginValue({ ...loginValue, [name]: value });
    },
    [loginValue]
  );

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
              type="password"
              label="Password"
              size="lg"
              icon={<FaRegEye />}
              name="password"
              onChange={handleChange}
            />
            <button>Login</button>
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
