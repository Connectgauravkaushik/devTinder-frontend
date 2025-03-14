import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if(feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed",{withCredentials:true});
      dispatch(addFeed(res?.data));
    } catch (error) {
      console.error(error.message);
    }
  };

  // as soon the page loads 
  useEffect(() => {
    getFeed();
  }, []);

  

  return feed &&( <div className="flex justify-center items-center my-10">
    <UserCard user={feed[0]}/>
    </div>);
};

export default Feed;
