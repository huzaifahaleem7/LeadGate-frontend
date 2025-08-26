import { createContext, useContext, useEffect, useState } from "react";
import {
  addLead,
  getAllLeads,
  getLeadById,
} from "../../api/leadApi/leadApi.js";

const LeadContext = createContext();

export const LeadProvider = ({ children }) => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all leads on mount
  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await getAllLeads();
      setLeads(res.data.leads || []);
    } catch (error) {
      console.error(
        "Failed to fetch leads:",
        error.response?.data?.message || error.message
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Fetch lead by ID
  const fetchLeadById = async (id) => {
    try {
      const res = await getLeadById(id);
      return res.leadById;
    } catch (error) {
      console.error(
        "Fetch lead by ID failed:",
        error.response?.data?.message || error.message
      );
      throw error;
    }
  };

  // Add new lead
  const createdLead = async ({
    firstName,
    lastName,
    phone,
    zipCode,
    jornayaId,
  }) => {
    try {
      const res = await addLead({
        firstName,
        lastName,
        phone,
        zipCode,
        jornayaId,
      });
      setLeads((prevLeads) => [res.lead, ...prevLeads]);
      return res;
    } catch (error) {
      console.error(
        "Add Lead failed:",
        error.response?.data?.message || error.message
      );
      throw error;
    }
  };

  return (
    <LeadContext.Provider
      value={{
        leads,
        loading,
        createdLead,
        fetchLeadById,
        fetchLeads
      }}
    >
      {children}
    </LeadContext.Provider>
  );
};

export const useLeads = () => useContext(LeadContext);
