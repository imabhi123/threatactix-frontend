import React, { useState, useEffect } from "react";
import {
  Shield,
  BarChart,
  AlertTriangle,
  Globe,
  Factory,
  Bug,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";
import WorldMapComponent from "./WorldMapComponent";
import { endDateToday } from "../utils/utils";

const StatCard = ({ Icon, title, value, color }) => (
  <div className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md ${color}`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{title}</p>
        <p className="text-2xl font-semibold mt-1 text-gray-900 dark:text-gray-100">
          {value}
        </p>
      </div>
      <Icon className="w-8 h-8 opacity-80" />
    </div>
  </div>
);

const Dashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [data, setData] = useState([]);
  const [incidentsInDateRange, setIncidentsInDateRange] = useState([]);
  const [activeThreatsCount, setActiveThreatsCount] = useState(0);
  const [industryData, setIndustryData] = useState([]);
  const [stats, setStats] = useState({
    totalAttacks: 0,
    activeThreats: 0,
    affectedCountries: 0,
    targetedIndustries: 0,
  });
  
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  const calculateActiveThreats = (incidentData) => {
    const activeCount = incidentData?.reduce((count, incident) => 
      incident.status ? count + 1 : count, 0) || 0;
    setActiveThreatsCount(activeCount);
    return activeCount;
  };

  const processIndustryData = (incidents) => {
    const industryMap = new Map();
    
    incidents?.forEach(incident => {
      const industry = incident.data[0]?.row?.victims_industry;
      if (industry) {
        industryMap.set(industry, (industryMap.get(industry) || 0) + 1);
      }
    });

    // Convert map to array and sort by count
    const sortedIndustries = Array.from(industryMap.entries())
      .map(([industry, count]) => ({ industry, count }))
      .sort((a, b) => b.count - a.count);

    setIndustryData(sortedIndustries);
    return sortedIndustries;
  };

  const getCountryCounts = (data) => {
    const countryCounts = new Set();
    
    data?.forEach(item => {
      item.data.forEach(incident => {
        if (incident.row.victims_country) {
          countryCounts.add(incident.row.victims_country);
        }
      });
    });

    return countryCounts.size;
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/incident/incidents"
        );
        const attackTrendData = await response.json();
        
        // Process incidents
        setIncidentsInDateRange(attackTrendData?.data || []);
        const activeThreats = calculateActiveThreats(attackTrendData?.data);
        const industries = processIndustryData(attackTrendData?.data);
        const affectedCountriesCount = getCountryCounts(attackTrendData?.data);

        // Process attack trend data
        const transformedData = attackTrendData?.data?.reduce((acc, item) => {
          const date = item?.createdAt
            ? item.createdAt.split("T")[0]
            : "2024-10-19";
          
          if (!acc[date]) {
            acc[date] = { name: date, attacks: 0 };
          }
          acc[date].attacks += 1;
          return acc;
        }, {});

        setData(Object.values(transformedData || {}));
        
        // Update stats
        setStats({
          totalAttacks: attackTrendData?.data?.length || 0,
          activeThreats,
          affectedCountries: affectedCountriesCount,
          targetedIndustries: industries.length,
        });

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            Icon={BarChart}
            title="Total Attacks"
            value={stats.totalAttacks}
            color="text-blue-600 dark:text-blue-400"
          />
          <StatCard
            Icon={AlertTriangle}
            title="Active Threats"
            value={activeThreatsCount}
            color="text-red-600 dark:text-red-400"
          />
          <StatCard
            Icon={Globe}
            title="Affected Countries"
            value={stats.affectedCountries}
            color="text-green-600 dark:text-green-400"
          />
          <StatCard
            Icon={Factory}
            title="Targeted Industries"
            value={stats.targetedIndustries}
            color="text-yellow-600 dark:text-yellow-400"
          />
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Attack Trend
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="attacks"
                stroke="#3b82f6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <WorldMapComponent />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Recent Malware
            </h2>
            <ul className="space-y-2">
              {incidentsInDateRange?.slice(0, 3).map((malware, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <Bug className="w-5 h-5 text-red-500" />
                  <span className="text-gray-900 dark:text-gray-100">
                    {malware?.data[0]?.row?.threatActor_type || 'Unknown'}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Most Targeted Industries
            </h2>
            <ul className="space-y-2">
              {industryData.map(({ industry, count }, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <Factory className="w-5 h-5 text-blue-500" />
                  <div className="flex items-center justify-between flex-1">
                    <span className="text-gray-900 font-semibold dark:text-gray-100">
                      {industry}
                    </span>
                    <span className="text-gray-900 font-semibold dark:text-gray-100">
                      {count}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;