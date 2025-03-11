import FooterComp from "./Footer";
import Navbar from "./NavBar";
import { Outlet, useNavigate } from "react-router";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const BodyComp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  // when we refresh the page it will still return the profile if token is there.
  const fetchUser = async () => {
    if(userData) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }

      console.error(error);
    }
  };

  // After the component is loaded it will load.
  useEffect(() => {
    
      fetchUser();
  
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
      <FooterComp />
    </div>
  );
};

export default BodyComp;
