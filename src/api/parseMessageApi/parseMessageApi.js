import api from "../axios/axios.js";

const parseMessageApi = async (message) => {
  try {
    const response = await api.post(
      "/message/parseMessage",
      { message },
      {
        withCredentials: true,
      }
    );
    console.log("Parsed message:", response.data.data.leads[0]);
    return response.data.data.leads[0];
  } catch (error) {
    console.error(
      "Failed to run parseMessage API:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

export { parseMessageApi };
