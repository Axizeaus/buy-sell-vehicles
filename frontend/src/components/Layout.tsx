import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className=" bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 min-h-screen flex flex-col">
      <Header />
      <main className="mx-auto p-4 flex-grow container">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
