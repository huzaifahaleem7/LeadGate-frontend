// src/context/LeadContext/LeadContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import {
  addLead,
  getAllLeads,
  getLeadById,
} from "../../api/leadApi/leadApi.js";

const LeadContext = createContext();

export const LeadProvider = ({ children }) => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch all leads
  const fetchLeads = async () => {
    try {
      setLoading(true);
      setError(null);

      const fetchedLeads = await getAllLeads(); 
      // getAllLeads already returns array in your api file
      setLeads(fetchedLeads || []);
    } catch (err) {
      console.error("Failed to fetch leads:", err);
      setError(err.message || "Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Run once on mount
  useEffect(() => {
    fetchLeads();
  }, []);

  // ✅ Fetch lead by ID
  const fetchLeadById = async (id) => {
    try {
      const res = await getLeadById(id);
      return res?.leadById || res; // handle both cases
    } catch (err) {
      console.error("Fetch lead by ID failed:", err);
      throw err;
    }
  };

  // ✅ Add new lead
  const createdLead = async (leadData) => {
    try {
      const res = await addLead(leadData);
      const newLead = res?.lead || res; // ensure object

      if (newLead && typeof newLead === "object") {
        setLeads((prevLeads) => [newLead, ...prevLeads]);
      }
      return newLead;
    } catch (err) {
      console.error("Add Lead failed:", err);
      throw err;
    }
  };

  return (
    <LeadContext.Provider
      value={{
        leads,
        loading,
        error,
        fetchLeads,
        fetchLeadById,
        createdLead, // ✅ same name as your old context
      }}
    >
      {children}
    </LeadContext.Provider>
  );
};

export const useLeads = () => useContext(LeadContext);
