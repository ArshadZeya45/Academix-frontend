import { Link } from "react-router-dom";

const AuthHeader = ({ title, subtitle, linkText, to }) => {
  return (
    <div className="flex flex-col gap-3 mb-2">
      <h1 className="text-4xl font-bold">{title}</h1>
      <Link to={`${to}`} className="text-2xl text-gray-400">
        {`${subtitle || ""} `}
        <span className="text-orange-600 hover:border-b-2 border-b-orange-700 transition-all">
          {linkText}
        </span>
      </Link>
    </div>
  );
};
export default AuthHeader;
