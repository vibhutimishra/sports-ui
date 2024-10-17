import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserRequest, fetchRegisteredEvent, updateMessage } from "../../store/actions/sportsActions";

export default function Login() {
  const [formData, setFormData] = useState({
    user: {
      userId: "",
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector((state) => state.user.userId);
  const message = useSelector((state) => state.user.message);
  const status = useSelector((state) => state.user.status);

  useEffect(() => {
    if (userId) {
      navigate(`/${userId}/events`);
    }
    else {
      navigate('/');
    }
  }, [userId]);

  const handleChange = (e) => {
    setFormData({
      user: {
        ...formData.user,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(fetchUserRequest(formData.user));
    dispatch(fetchRegisteredEvent(formData.user));
};

const handle = (e) => {
  e.preventDefault();
  navigate('/signup');
};

return (
  <figure className="h-screen flex bg-gray-100">
    {message && (
        <div
          className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-sm ${status ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700'} px-4 py-3 rounded shadow-md`}
          role="alert"
        >
          <strong className="font-bold">{status ? 'Success!' : 'Error!'}</strong>
          <span className="block sm:inline"> {message}</span>
          <button
            onClick={() => dispatch(updateMessage(''))}
            className="absolute top-0 right-0 px-4 py-2 text-red-600 font-bold"
          >
            &times;
          </button>
        </div>
      )}
    <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-1">
      <blockquote className="text-2xl font-medium text-center">
        <p className="text-lg font-semibold">Welcome to Sports Day</p>
      </blockquote>

      <div className="text-primary m-6">
        <div className="flex items-center mt-3 justify-center">
          <h1 className="text-2xl font-medium text-primary mt-4 mb-2">
            Login to your account
          </h1>
        </div>
        <form onSubmit={handleLogin}>
          <label className="text-left">Username:</label>
          <input
            name="userId"
            type="text"
            value={formData.user.userId}
            onChange={handleChange}
            placeholder="Username"
            className={
              "w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
            }
          />
          <div className="flex items-center mt-3 justify-center">
            <button
              className={
                "bg-blue-700 hover:bg-blue-500 py-2 px-4 text-md text-white rounded border border-blue focus:outline-none focus:border-black"
              }
              value="Login"
            >
              Login
            </button>
          </div>
        </form>
        <div className="flex items-center mt-3 justify-center">
          <button className={"justify-center text-blue-500 hover:underline"} onClick={handle}>
            Need to register? Sign up here
          </button>
        </div>
      </div>
    </div>
  </figure>
);
}