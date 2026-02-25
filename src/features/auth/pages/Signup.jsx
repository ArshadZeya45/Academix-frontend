import AuthHeader from "../components/AuthHeader";
import Divider from "../components/Divider";
import SocialAuthButton from "../components/SocialAuthButton";
import AuthInput from "../components/AuthInput";
import AuthButton from "../components/AuthButton";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../authThunks";
import { setEmail, clearVerificationState } from "../authSlice";
import { useEffect, useState } from "react";
import useVerificationCountdown from "../../../hooks/useVerificationCountdown";

const Signup = () => {
  const dispatch = useDispatch();
  const { message, expiresAt, loading, email } = useSelector(
    (state) => state.auth,
  );
  console.log(email);
  console.log(expiresAt);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: email,
    },
  });

  const { timeLeft, isCooldown } = useVerificationCountdown(expiresAt, () => {
    dispatch(clearVerificationState());
  });

  const handleSignupSubmit = async (data) => {
    dispatch(setEmail(data.email));
    await dispatch(signupUser(data));
  };

  let buttonText = isCooldown
    ? `Resend in ${timeLeft}`
    : "Send verification link";

  return (
    <div className="flex flex-col gap-5 p-6 w-1/3 bg-white/7 shadow-2xl  rounded-2xl">
      <AuthHeader
        title={"Sign Up"}
        subtitle={"Already have an account"}
        linkText={"Sign In"}
        to="/auth/login"
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
      {message && isCooldown && (
        <p className="capitalize text-green-600 text-xs font-semibold">
          {message}
        </p>
      )}
      <AuthButton
        type="button"
        className={`${isCooldown ? "bg-orange-500 cursor-not-allowed" : "bg-orange-600 hover:bg-orange-700"}`}
        onClick={handleSubmit(handleSignupSubmit)}
        text={loading ? "Sending verification link..." : buttonText}
        disabled={loading || isCooldown}
      ></AuthButton>
      <Divider />
      <SocialAuthButton text={"Continue with Google"} />
    </div>
  );
};
export default Signup;
