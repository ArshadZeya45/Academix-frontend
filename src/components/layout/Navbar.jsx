import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="flex px-20 py-3 bg-white/7 items-center justify-between gap-10">
      <h3 className="">Academix</h3>
      <div className="flex-1">
        <input
          type="text"
          className="w-full px-3 py-1.5 border outline-none rounded-md"
          placeholder="Search courses here..."
        />
      </div>
      <div className="flex gap-5 items-center">
        <Link>Home</Link>
        <Link>Courses</Link>
        <Link>Classroom</Link>
        <Link>About</Link>
        <div className="w-10 h-10 rounded-full bg-orange-600 text-white flex items-center justify-center font-semibold">
          {user?.firstname.slice(0, 1).toUpperCase()}
        </div>
      </div>
    </div>
  );
};
export default Navbar;
