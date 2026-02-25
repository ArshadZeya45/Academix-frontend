import { Outlet } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

const PublicLayout = () => {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};
export default PublicLayout;
