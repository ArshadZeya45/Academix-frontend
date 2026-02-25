const AuthButton = ({
  text,
  type = "button",
  onClick,
  loading = false,
  disabled = false,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        w-full mt-3 py-2.5 
         text-white 
        cursor-pointer
        rounded-md 
        transition-all 
        active:scale-95 
        disabled:opacity-60 
        disabled:cursor-not-allowed
        ${className}
      `}
    >
      {text}
    </button>
  );
};

export default AuthButton;
