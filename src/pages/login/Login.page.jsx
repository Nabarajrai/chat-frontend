import { useState } from "react";
import CustomInputComponent from "../../components/cutomInput/CustomInput.component";
//icons
import { FaRegEye } from "react-icons/fa";

const LoginPage = () => {
  const [email, setEmail] = useState("");
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
              value={email}
              setValue={setEmail}
              type="text"
              label="Email"
            />
            <CustomInputComponent
              id="password"
              value={email}
              setValue={setEmail}
              type="password"
              label="Password"
              icon={<FaRegEye />}
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
