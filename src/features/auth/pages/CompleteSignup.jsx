import { useSearchParams } from "react-router-dom";
import AuthInput from "../components/AuthInput";
import AuthPasswordInput from "../components/AuthPasswordInput";
import AuthButton from "../components/AuthButton";
import AuthHeader from "../components/AuthHeader";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { completeSignupUser } from "../authThunks";
import { useEffect } from "react";

const CompleteSignup = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, user } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (!token) {
      navigate("/auth/signup");
    }
  }, [token, navigate]);

  const createAccountHandler = async (data) => {
    await dispatch(completeSignupUser({ ...data, token })).unwrap();
    if (user?.role === "admin") {
      navigate("/admin-dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="flex relative flex-col gap-5 p-6 w-1/3 bg-white/7 shadow-2xl  rounded-2xl">
      <AuthHeader
        title={"Finish setting up your account"}
        subtitle={"Add your details to get started."}
      />
      <div>
        <AuthInput
          label={"firstname"}
          placeholder={"Enter your firstname"}
          type="text"
          id={"firstname"}
          name={"firstname"}
          {...register("firstname", {
            required: "First name is required",
            minLength: {
              value: 2,
              message: "First name must be at least 2 characters",
            },
          })}
        />
        {errors.firstname && (
          <small className="text-red-500 text-sm">
            {errors.firstname.message}
          </small>
        )}
      </div>
      <div>
        <AuthInput
          label={"Lastname (Optional)"}
          placeholder={"Enter your lastname"}
          type="text"
          id={"lastname"}
          name={"lastname"}
          {...register("lastname")}
        />
      </div>
      <div>
        <AuthPasswordInput
          label={"Password"}
          placeholder={"Enter your password"}
          id={"password"}
          name={"password"}
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
      <AuthButton
        type="button"
        className="bg-orange-600 hover:bg-orange-700"
        onClick={handleSubmit(createAccountHandler)}
        disabled={loading}
        loading={loading}
        text={loading ? "Creating account..." : "Create Account"}
      ></AuthButton>
    </div>
  );
};
export default CompleteSignup;
