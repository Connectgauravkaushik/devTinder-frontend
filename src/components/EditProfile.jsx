import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [age, setAge] = useState(user?.age);
  const [gender, setGender] = useState(user?.gender);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [about, setAbout] = useState(user?.about);
  const [showToast, setShowToast] = useState(false);
  //   const [error, setError] = useState("");
  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      const res = await axios.put(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
    { showToast&& <div className="toast toast-top toast-center z-20">
        <div className="alert alert-success">
          <span>Profile Saved Successfully.</span>
        </div>
      </div>}
      <div className="flex  justify-center my-10">
        <div className="flex justify-center items-center mx-10">
          <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div className="">
                {/* First Name field */}
                <fieldset className="fieldset my-4">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    className="input"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)} // Binding the state variable with input variable.
                  />
                </fieldset>
                {/* Last Name field */}
                <fieldset className="fieldset my-4">
                  <legend className="fieldset-legend">last Name</legend>
                  <input
                    type="text"
                    className="input"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)} // Binding the state variable with input variable.
                  />
                </fieldset>
                {/* Last Name field */}
                <fieldset className="fieldset my-4">
                  <legend className="fieldset-legend">Age</legend>
                  <input
                    type="text"
                    className="input"
                    value={age}
                    onChange={(e) => setAge(e.target.value)} // Binding the state variable with input variable.
                  />
                </fieldset>
                {/* Last Name field */}
                <fieldset className="fieldset my-4">
                  <legend className="fieldset-legend">Gender</legend>
                  <input
                    type="text"
                    className="input"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)} // Binding the state variable with input variable.
                  />
                </fieldset>
                {/* PHOTO URL field */}
                <fieldset className="fieldset my-4">
                  <legend className="fieldset-legend">Photo URL</legend>
                  <input
                    type="text"
                    className="input"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)} // Binding the state variable with input variable.
                  />
                </fieldset>

                {/* About */}
                <fieldset className="fieldset my-4">
                  <legend className="fieldset-legend">About</legend>
                  <input
                    type="text"
                    className="input"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)} // Binding the state variable with input variable.
                  />
                </fieldset>
              </div>
              <p className="text-red-500"></p>
              <div className="card-actions justify-center">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about }}
        />
      </div>
    </>
  );
};

export default EditProfile;
