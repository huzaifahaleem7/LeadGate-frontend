import api from "../axios/axios.js";

//addLead
const addLead = async ({ firstName, lastName, phone, zipCode, jornayaId }) => {
  try {
    const res = await api.post(
      "/lead/addlead",
      { firstName, lastName, phone, zipCode, jornayaId },
      {
        withCredentials: true,
      }
    );
    console.log("Lead added", res.data);
    return res.data;
  } catch (error) {
    console.error(
      "Failed to run addLead API:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

//getAllLeads
const getAllLeads = async () => {
  try {
    const res = await api.get("/lead/leads", { withCredentials: true });
    console.log("Fetched all leads:", res.data);
    return res.data;
  } catch (error) {
    console.error(
      "Failed to run getAllLeads API:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

//getLeadById
const getLeadById = async (id) => {
  try {
    const res = await api.get(`/lead/${id}`, { withCredentials: true });
    console.log("Fetched lead:", res.data);
    return res.data;
  } catch (error) {
    console.error(
      "Failed to run getLeadById API:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

export { addLead, getAllLeads, getLeadById };
