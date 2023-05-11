import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorAlert from "../../errors/ErrorAlert";
import { UserApi } from "../../api/userApi";
import Form from "../../components/Form/Form";
import Input from "../../components/Form/Input/Input";
import Card from "../../components/Card/Card";

const Signup = ({ setUser }) => {
  const [signup, setSignup] = useState({
    email: "",
    first_name: "",
    phone_number: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [buttonText, setButtonText] = useState("Continue");
  const navigate = useNavigate();

  const onChange = ({ target }) => {
    const { name, value } = target;
    if (name === "passwordConfirm") {
      setConfirmPassword(value);
    } else {
      setSignup({
        ...signup,
        [name]: value,
      });
    }
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar
    ) {
      return true;
    }

    return false;
  };

  const footerText = (
    <p className="mt-2 text-center">
      Already have an account?{" "}
      <Link to="/login" className="text-red-900">
        Sign in here
      </Link>
    </p>
  );

  const onSubmit = async (event) => {
    setError(null);
    event.preventDefault();
    setButtonText("Loading...");

    // Validate password
    if (!validatePassword(signup.password)) {
      setError({
        message:
          "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.",
      });
      setButtonText("Continue");
      return;
    }

    try {
      if (signup.password === confirmPassword) {
        const {
          email,
          password,
          first_name: firstName,
          phone_number: phoneNumber,
        } = signup;
        const payload = {
          email,
          password,
          firstName,
          phoneNumber,
          isAdmin: false,
        };
        const response = await UserApi.signup(payload);
        if (response) {
          setUser(response);
          navigate("/");
        }
      } else {
        throw { message: "Passwords are not matching. Please try again." };
      }
    } catch (error) {
      setError(error);
    } finally {
      setButtonText("Continue");
    }
  };

  const signupWithSocials = () => {};

  return (
    <div className="bg-slate-100 flex justify-center h-screen py-2 md:py-6">
      <Card classes="w-[30rem] md:mt-4 h-min">
        {error && <ErrorAlert error={error} />}
        <p className="text-center">Welcome to</p>
        <h1 className="text-center text-2xl font-semibold">China Garden</h1>
        <button
          className="px-3 py-2 w-full text-center border rounded"
          onClick={signupWithSocials}
        >
          Google
        </button>
        <p className="text-center">Or</p>
        <Form
          data={signup}
          onChange={onChange}
          onSubmit={onSubmit}
          footer={footerText}
          submitText={buttonText}
        >
          <Input
            onChange={onChange}
            value={confirmPassword}
            type="password"
            name="passwordConfirm"
            placeholder="Confirm Password"
            label="Confirm Password"
          />
        </Form>
      </Card>
    </div>
  );
};

export default Signup;
