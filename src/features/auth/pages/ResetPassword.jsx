import { useForm } from "react-hook-form";
import AuthHeader from "../components/AuthHeader";
import AuthPasswordInput from "../components/AuthPasswordInput";
import AuthButton from "../components/AuthButton";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPassword } from "../authThunks";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const newPassword = watch("password");

  const handleResetPassword = async (data) => {
    await dispatch(resetPassword({ token, ...data }));
    navigate("/auth/login");
  };

  return (
    <div className="flex relative flex-col gap-5 p-6 w-1/3 bg-white/7 shadow-2xl rounded-2xl">
      <AuthHeader
        title="Reset your password"
        subtitle="Enter and confirm your new password below."
      />

      <form
        onSubmit={handleSubmit(handleResetPassword)}
        className="flex flex-col gap-5"
      >
        {/* New Password */}
        <div>
          <AuthPasswordInput
            label="New Password"
            placeholder="Enter your new password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <small className="text-red-500 text-sm">
              {errors.password.message}
            </small>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <AuthPasswordInput
            label="Confirm Password"
            placeholder="Re-enter your new password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === newPassword || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <small className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </small>
          )}
        </div>

        <AuthButton
          type="submit"
          className="bg-orange-600 hover:bg-orange-700"
          text={"Update Password"}
        />
      </form>
    </div>
  );
};

export default ResetPassword;
