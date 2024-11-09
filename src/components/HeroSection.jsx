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
import CampaignList from "./CampaignsTable";

const StatCard = ({ Icon, title, value, color }) => (
  <div
    className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md ${color}`}
  >
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
  const [incidentsInDateRange, setIncidentsInDateRange] = useState();
  const [activeThreatsCount, setActiveThreatsCount] = useState(0);

  const [stats, setStats] = useState({
    totalAttacks: 0,
    activeThreats: 0,
    affectedCountries: 0,
    targetedIndustries: 0,
  });
  const [malwares, setMalwares] = useState([]);
  const [industries, setIndustries] = useState([]);
  const navigate = useNavigate();

  // Redirect if not authenticated
  if (!localStorage.getItem("token")) {
    navigate("/login");
  }

  const activeThreats = (incidentData) => {
    let ans = 0;
    for (let i = 0; i < incidentData?.length; i++) {
      if (incidentData[i].status) ans++;
    }
    console.log(ans);

    setActiveThreatsCount(ans);
  };

  function getCountryCounts(data) {
    const countryCounts = {};

    data.forEach(item => {
        item.data.forEach(incident => {
            const country = incident.row.victims_country;
            if (countryCounts[country]) {
                countryCounts[country]++;
            } else {
                countryCounts[country] = 1;
            }
        });
    });

    // Transform the countryCounts object into an array of objects
    return Object.keys(countryCounts).map(country => ({
        name: country,
        count: countryCounts[country]
    }));
}

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const attackTrendResponse = await fetch(
          "http://localhost:5000/api/v1/incident/incidents"
        );

        const attackTrendData = await attackTrendResponse.json();
        activeThreats(attackTrendData?.data);
        const countryCounts=getCountryCounts(attackTrendData?.data);
        console.log(attackTrendData?.data, "-->shubh");
        const transformedData = attackTrendData?.data.reduce((acc, item) => {
          const date = item?.createdAt
            ? item.createdAt.split("T")[0]
            : "2024-10-19T09:48:26.102Z".split("T")[0]; 
          if (!acc[date]) {
            acc[date] = { name: date, attacks: 0 }; // Initialize if not present
          }
          acc[date].attacks += 1;

          return acc;
        }, {});
        const finalData = Object.values(transformedData);
        console.log(finalData);
        setData(finalData);
        const attackInDateRange = await fetch(
          "http://localhost:5000/api/v1/incident/incidents/dates",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              startDate: "2023-01-01",
              endDate: endDateToday,
            }),
          }
        );
        const attackInDateRangeData = await attackInDateRange.json();
        setIncidentsInDateRange(attackInDateRangeData);
        const countriesResponse = await fetch(
          "http://localhost:5000/api/v1/incident/incidentss/d/getMostAffectedCountries",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              startDate: "2023-01-01",
              endDate:
              endDateToday,
            }),
          }
        );
        const countriesData = await countriesResponse.json();

        console.log(countriesData, "-->countries data");
        const industriesResponse = await fetch(
          "http://localhost:5000/api/v1/incident/incidents/getMostTargetedIndustries",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              startDate: "2023-01-01",
              endDate: endDateToday,
            }),
          }
        );
        const industriesData = await industriesResponse.json();
        console.log(attackTrendData?.data,'abhisek')
        setStats({
          totalAttacks: attackTrendData?.data?.length, 
          activeThreats: activeThreatsCount,
          affectedCountries: countryCounts.length,
          targetedIndustries: industriesData.length,
        });
        setIndustries(industriesData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* <TopBar toggleDarkMode={() => setIsDarkMode(!isDarkMode)} isDarkMode={isDarkMode} /> */}
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

        <WorldMapComponent  />

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
                    {malware.category}
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
              {industries.map((industry, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <Factory className="w-5 h-5 text-blue-500" />
                  <div className="flex items-center justify-between flex-1">
                    <span className="text-gray-900 font-semibold dark:text-gray-100">
                      {industry._id}
                    </span>
                    <span className="text-gray-900 font-semibold dark:text-gray-100">
                      {industry.count}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <CampaignList/>
      </div>
    </div>
  );
};

export default Dashboard;
