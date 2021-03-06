import React from "react";
import { Link } from "react-router-dom";
import { FormBox } from "../common";
import { Form as ReForm } from "reactstrap";
import { isEmpty } from "validator";
import { FaEye } from "react-icons/fa";
const Form = ({ handleSubmit }) => {
  const [error, setError] = React.useState({});
  const [form, setForm] = React.useState({ username: "", password: "" });
  const [errorLogin, setErrorLogin] = React.useState();
  // const loading = storeLogin.loading;
  const validate = () => {
    const errorState = {};
    // check validate
    if (isEmpty(form.username)) {
      errorState.username = "Please enter user name";
    }
    if (isEmpty(form.password)) {
      errorState.password = "Please enter password";
    }
    return errorState;
  };
  const handleSubmitForm = (event) => {
    event.preventDefault();
    const errorState = validate();
    if (Object.keys(errorState).length > 0) {
      return setError(errorState);
    }

    const formData = {
      username: form.username,
      password: form.password,
    };
    handleSubmit(formData);
  };
  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleFocus = (event) => {
    setError({
      ...error,
      [event.target.name]: "",
    });
    setErrorLogin("");
  };
  var isBool = true;
  const showHidden = () => {
    if (isBool) {
      document.getElementById("password").setAttribute("type", "text");
      isBool = false;
    } else {
      document.getElementById("password").setAttribute("type", "password");
      isBool = true;
    }
  };
  return (
    <section onSubmit={handleSubmitForm} className="login">
      <div className="login__inner">
        <ReForm className="radius-l login__inner__form">
          <div className="login__inner__form__text">
            <p style={{ color: "black", fontSize: "50px" }}>Login</p>
            <div className="error">{errorLogin}</div>
          </div>

          <FormBox
            propsInput={{
              name: "username",
              placeholder: "Username",
              onChange: handleChange,
              onFocus: handleFocus,
              value: form.username,
              disabled: false,
            }}
            error={error.username}
          />

          <div
            className="sc-jrQzUz gaRSLq form-box form-group"
            position="relative"
          >
            <input
              type="password"
              name="password"
              placeholder="Password"
              id="password"
              onChange={handleChange}
              onFocus={handleFocus}
              value={form.password}
              disabled={false}
              error={error.password}
            />
            <FaEye
              style={{
                position: "absolute",
                bottom: 15,
                right: 25,
                cursor: "pointer",
              }}
              onClick={showHidden}
            />
          </div>
          {/* <FormBox
              propsInput={{
                type: "password",
                name: "password",
                placeholder: "password",
                onChange: handleChange,
                onFocus: handleFocus,
                value: form.password,
                disabled: false,
              }}
              error={error.password}
            /> */}

          <div className="flex space-between align-item">
            <button
              className="button button-secondary"
              style={{ color: "white", marginLeft: "100px" }}
            >
              Login
            </button>
            <div>
              <Link
                to="/forgot-password"
                className="primary"
                style={{ marginRight: "100px" }}
              >
                Forgot Password?
              </Link>
            </div>
            {/* <div>
              <Link to="/register" className="primary">
                Register
              </Link>
            </div> */}
          </div>
        </ReForm>
      </div>
    </section>
  );
};

export default Form;
