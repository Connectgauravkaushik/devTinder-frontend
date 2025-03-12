import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (error) {
      //Handle the Error
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0)
    return <h1 className="text-bold text-2xl">No Connection Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-2xl">Connections</h1>

      {connections?.map((connection) => {
        const { _id, firstName, lastName, age, gender, about, photoUrl } =
          connection;
        return (
          <div key={_id} className="card card-side bg-base-200 shadow-sm my-3 border border-gray-600 ml-[500px] mr-[500px] max-xl:ml-[100px] max-xl:mr-[100px] max-xl:flex max-xl:flex-wrap max-xl:justify-center">
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
              <p>
                {gender} , 23 {age}
              </p>
              <p>{about}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Watch</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
