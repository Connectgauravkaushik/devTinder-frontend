import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addrequest, removeRequest } from "../utils/requestSlice";

const Requests = () => {

  const requests = useSelector((store) => store?.request);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addrequest(res?.data?.data));
    } catch (error) {
      //Handle the Error
      console.error(error.message);
    }
  };

  const reviewRequest = async (status, _id) => {
    console.log(status , _id)
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id , {},
        {withCredentials:true}
      );
      dispatch(removeRequest(_id));
      
      console.log(res);
    } catch (error) {
        console.error(error.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;
  if (requests.length === 0)
    return <h1 className="text-bold text-center text-2xl">No Request Found</h1>;

  return (
    <div>
      <div className="text-center my-10">
        <h1 className="text-bold text-2xl">Requests</h1>

        {requests?.map((request) => {
          const { _id, firstName, lastName, about, photoUrl } =
            request.fromUserId;
          return (
            <div
              key={_id}
              className="card card-side bg-base-200 shadow-sm my-3 border border-gray-600 ml-[400px] mr-[400px] max-xl:ml-[100px] max-xl:mr-[100px] max-xl:flex max-xl:flex-wrap max-xl:justify-center"
            >
              <figure>
                <img
                  className="w-28 p-2 rounded-full"
                  src={photoUrl}
                  alt="Movie"
                />
              </figure>
              <div className="card-body flex justify-center">
                <h2 className="text-xl font-extrabold">
                  {firstName + " " + lastName}
                </h2>

                <p>{about}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary" onClick={() => reviewRequest('rejected' , request._id)}>Reject</button>
                  <button className="btn btn-secondary" onClick={ () => reviewRequest('accepted',request._id)}>Accept</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
