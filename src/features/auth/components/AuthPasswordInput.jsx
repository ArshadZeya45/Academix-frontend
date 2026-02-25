import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";
const AuthPasswordInput = ({
  label,
  name,
  placeholder,
  className = "",
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex relative flex-col gap-2">
      {label && (
        <label htmlFor={name} className="capitalize  text-base text-gray-300 ">
          {label}
        </label>
      )}
      <span
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-10  cursor-pointer"
      >
        {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
      </span>
      <input
        id={name}
        name={name}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        className={`px-2 py-2 outline-none border-gray-300 border rounded-md ${className}`}
        {...rest}
      />
    </div>
  );
};
export default AuthPasswordInput;
