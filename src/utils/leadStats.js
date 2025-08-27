// src/utils/calculateLeadStats.js
const calculateLeadStats = (leads = []) => {
  const stats = leads.reduce(
    (acc, lead) => {
      const status = lead.status?.toLowerCase();

      // Increment status counts
      if (status === "approved") acc.approved += 1;
      else if (status === "rejected") acc.rejected += 1;
      else if (status === "pending") acc.pending += 1;

      // Increment total
      acc.total += 1;

      // Daily count
      const date = new Date(lead.createdAt).toLocaleDateString();
      acc.dailyCounts[date] = (acc.dailyCounts[date] || 0) + 1;

      return acc;
    },
    { total: 0, approved: 0, rejected: 0, pending: 0, dailyCounts: {} }
  );

  // Sort daily counts by date
  const sortedDates = Object.keys(stats.dailyCounts).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  return {
    total: stats.total,
    approved: stats.approved,
    rejected: stats.rejected,
    pending: stats.pending,
    dailyCounts: sortedDates.map((date) => ({
      date,
      count: stats.dailyCounts[date],
    })),
  };
};

export default calculateLeadStats;
