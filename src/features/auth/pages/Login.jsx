import { useEffect, useState } from "react";
import AuthButton from "../components/AuthButton";
import AuthInput from "../components/AuthInput";
import AuthHeader from "../components/AuthHeader";
import Divider from "../components/Divider";
import SocialAuthButton from "../components/SocialAuthButton";
import { Link, useNavigate } from "react-router-dom";
import AuthPasswordInput from "../components/AuthPasswordInput";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../authThunks";
import { useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, user } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLoginSubmit = async (data) => {
    await dispatch(loginUser(data)).unwrap();
    if (user.role === "admin") {
      navigate("/admin-dashboard");
    } else {
      navigate("/");
    }
  };
  return (
    <div className="flex relative flex-col gap-5 p-6 w-1/3 bg-white/7 shadow-2xl  rounded-2xl">
      <AuthHeader
        title={"Sign In"}
        subtitle={"New User"}
        linkText={"Create an account"}
        to="/auth/signup"
      />

      <div>
        <AuthInput
          label={"Email"}
          type={"email"}
          name={"email"}
          placeholder={"Enter your email"}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && (
          <small className="text-red-500 text-sm mt-1">
            {errors.email.message}
          </small>
        )}
      </div>

      <div>
        <AuthPasswordInput
          label={"Password"}
          type={"password"}
          name={"password"}
          placeholder={"Enter your password"}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <small className="text-red-500 text-sm mt-1">
            {errors.password.message}
          </small>
        )}
      </div>

      <Link
        to="/auth/forgot-password"
        className="text-right text-sm hover:underline"
      >
        {" "}
        Forgot your password?
      </Link>
      <AuthButton
        type="button"
        className="bg-orange-600 hover:bg-orange-700"
        loading={loading}
        onClick={handleSubmit(handleLoginSubmit)}
        disabled={loading}
        text={loading ? "Loading..." : "Sign In"}
      ></AuthButton>

      <Divider />
      <SocialAuthButton text={"Continue with Google"} />
    </div>
  );
};
export default Login;
