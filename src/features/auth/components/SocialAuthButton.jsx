import { FcGoogle } from "react-icons/fc";

const SocialAuthButton = ({ text }) => {
  return (
    <button className="flex items-center gap-3 border rounded-md text-base px-3 w-full py-2.5 justify-center cursor-pointer">
      <FcGoogle size={25} />
      <span>{text}</span>
    </button>
  );
};
export default SocialAuthButton;
