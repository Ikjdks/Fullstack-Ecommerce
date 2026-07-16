import { Outlet } from "react-router-dom";
import Navi from "../components/customer/Navi";
import Footer from "../pages/customer/Footer";
const CustomerLayout = ({ user, setUser }) => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {" "}
      <Navi user={user} setUser={setUser} />{" "}
      <main className="flex-1">
        {" "}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {" "}
          <Outlet />{" "}
        </div>{" "}
      </main>{" "}
      <Footer />{" "}
    </div>
  );
};
export default CustomerLayout;
