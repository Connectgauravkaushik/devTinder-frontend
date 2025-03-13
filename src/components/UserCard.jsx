import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeFeed } from "../utils/feedSlice";
import { useDispatch } from "react-redux";


const UserCard = ({user}) => {
   const {_id ,firstName , lastName, photoUrl, about } = user;
   const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(BASE_URL + "/request/send/" + status + "/" + userId , {} , 
        {withCredentials:true}
      );
      dispatch(removeFeed(userId));
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-sm border border-gray-500">
      <figure>
        <img
          src={photoUrl}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>
         {about}
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={()=>handleSendRequest('ignore',_id)}>Ignore</button>
          <button className="btn btn-secondary"onClick={()=>handleSendRequest('interested' ,_id)}>Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
