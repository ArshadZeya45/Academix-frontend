const AuthInput = ({
  label,
  type = "text",
  name,
  placeholder,
  className = "",
  ...rest
}) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={name} className="capitalize text-base text-gray-300">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className={`px-2 py-2 outline-none border-gray-300 border rounded-md ${className}`}
        {...rest}
      />
    </div>
  );
};
export default AuthInput;
