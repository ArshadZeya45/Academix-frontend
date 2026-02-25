import { useForm } from "react-hook-form";
import AuthButton from "../components/AuthButton";
import AuthHeader from "../components/AuthHeader";
import AuthInput from "../components/AuthInput";
import { useDispatch, useSelector } from "react-redux";
import { forgetPassword } from "../authThunks";
import useVerificationCountdown from "../../../hooks/useVerificationCountdown";
import { clearVerificationState, setEmail } from "../authSlice";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { message, expiresAt, loading, email } = useSelector(
    (state) => state.auth,
  );
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
  const submitForgotPasswordHandler = (data) => {
    dispatch(setEmail(data.email));
    dispatch(forgetPassword(data));
  };
  let buttonText = isCooldown
    ? `Resend Reset link in ${timeLeft}`
    : "Send Reset link";

  return (
    <div className="flex relative flex-col gap-5 p-6 w-1/3 bg-white/7 shadow-2xl rounded-2xl">
      <AuthHeader
        title="Forgot your password?"
        subtitle="Enter your email address and we'll send you a reset link."
      />

      <form
        onSubmit={handleSubmit(submitForgotPasswordHandler)}
        className="flex flex-col gap-5"
      >
        <div>
          <AuthInput
            type="email"
            label="Email address"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
          />

          {errors.email && (
            <small className="text-red-500 text-sm">
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
          type="submit"
          className="bg-orange-600 hover:bg-orange-700"
          text={loading ? "Sending Reset link..." : buttonText}
          loading={loading}
          disabled={loading || isCooldown}
        />
      </form>
    </div>
  );
};

export default ForgotPassword;
