import FooterComp from "./Footer";
import Navbar from "./NavBar";
import { Outlet } from "react-router";
const BodyComp = () => {
  return (
    <div>
      <Navbar />
      <Outlet/>
      <FooterComp/>
    </div>
  );
};

export default BodyComp;
