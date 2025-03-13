import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setpswrd] = useState("");
  const [error, setError] = useState();
  const [isLoginForm, setIsLoginForm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // we are making a API and it will return a promise thats why we are
  // making the function async and await.
  //LOGIN API CALL
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      ); // make sure token will be saved in the cookies.

      dispatch(addUser(res.data));
      return navigate("/");
    } catch (error) {
      setError(error?.response?.data || "invalid credentials ");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));

      return navigate("/profile");
    } catch (error) {
      setError(error?.response?.data || "invalid credentials ");
    }
  };

  return (
    <div className="flex justify-center items-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {" "}
            {isLoginForm ? "Login" : "SignUp"}
          </h2>
          <div className="">
            {/* First Name field */}
            {!isLoginForm && (
              <>
                <fieldset className="fieldset my-4">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    className="input"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)} // Binding the state variable with input variable.
                  />
                </fieldset>

                <fieldset className="fieldset my-4">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="text"
                    className="input"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)} // Binding the state variable with input variable.
                  />
                </fieldset>
              </>
            )}
            {/* Email field */}
            <fieldset className="fieldset my-4">
              <legend className="fieldset-legend">Email ID </legend>
              <input
                type="text"
                className="input"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)} // Binding the state variable with input variable.
              />
            </fieldset>
            {/* password field */}
            <fieldset className="fieldset my-4">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="text"
                className="input"
                value={password}
                onChange={(e) => setpswrd(e.target.value)} // Binding the state variable with input variable.
              />
            </fieldset>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center">
            <button
              className="btn btn-primary"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login" : "SignUp"}
            </button>
          </div>
          <p
            onClick={() => setIsLoginForm((value) => !value)}
            className="text-white cursor-pointer text-center hover:text-blue-500"
          >
            {isLoginForm
              ? "New User ? SignUp Here"
              : "Existing User ? Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
