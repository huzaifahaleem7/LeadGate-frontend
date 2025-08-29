// src/utils/leadStats.js

const calculateLeadStats = (leads = []) => {
  if (!Array.isArray(leads))
    return { total: 0, approved: 0, pending: 0, rejected: 0, dailyCounts: [] };

  const stats = leads.reduce(
    (acc, lead) => {
      if (!lead) return acc;

      const status = (lead.status || "").toLowerCase();
      acc.total += 1;

      if (status === "approved") acc.approved += 1;
      else if (status === "pending") acc.pending += 1;
      else if (status === "rejected") acc.rejected += 1;

      // Daily counts
      const date = new Date(lead.createdAt).toLocaleDateString();
      acc.dailyCountsObj[date] = (acc.dailyCountsObj[date] || 0) + 1;

      return acc;
    },
    { total: 0, approved: 0, pending: 0, rejected: 0, dailyCountsObj: {} }
  );

  // Convert dailyCountsObj to sorted array
  const sortedDates = Object.keys(stats.dailyCountsObj).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  const dailyCounts = sortedDates.map(date => ({
    date,
    count: stats.dailyCountsObj[date],
  }));

  return { ...stats, dailyCounts };
};

export default calculateLeadStats;
