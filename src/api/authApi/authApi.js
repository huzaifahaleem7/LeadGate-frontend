import api from "../axios/axios.js";

//signup api
const registerUser = async (email, username, fullName, password) => {
  try {
    const res = await api.post(
      "/user/signup",
      {
        email,
        username,
        fullName,
        password,
      },
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.error(
      "Failed to run signup API:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

//login api
const loginUser = async (email, password) => {
  try {
    const res = await api.post(
      "/user/login",
      {
        email,
        password,
      },
      { withCredentials: true }
    );
    console.log("Login success:", res.data);
    return res.data;
  } catch (error) {
    console.error(
      "Failed to run login API:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

//logout api
const logoutUser = async () => {
  try {
    const res = await api.post("/user/logout");
    return res.data;
  } catch (error) {
    console.error(
      "Failed to run logout API:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

//refreshAccessToken api
const refreshAccessToken = async () => {
  try {
    const res = await api.post("/user/refreshAccessToken", {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error(
      "Failed to run refreshAccessToken API:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

export { registerUser, loginUser, logoutUser, refreshAccessToken };
