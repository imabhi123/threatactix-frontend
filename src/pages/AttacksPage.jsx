import React, { useEffect, useState } from 'react';
import { Shield, Zap, Globe, Clock, Filter } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router

const AttackCard = ({ title, value, icon: Icon, color }) => (
  <div className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md ${color}`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{title}</p>
        <p className="text-2xl font-semibold mt-1 text-gray-900 dark:text-gray-100">{value}</p>
      </div>
      <Icon className="w-8 h-8 opacity-80 text-gray-900 dark:text-gray-100" />
    </div>
  </div>
);

const AttackItem = ({ date, type, target, severity }) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
    <div className="flex justify-between items-center">
      <div>
        <p className="font-semibold text-gray-900 dark:text-gray-100">{type}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">Target: {target}</p>
      </div>
      <div className="text-right">
        <p className={`font-semibold ${severity === 'High' ? 'text-red-500' : severity === 'Medium' ? 'text-yellow-500' : 'text-green-500'}`}>
          {severity} Severity
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{date}</p>
      </div>
    </div>
  </div>
);

const AttacksPage = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [data, setData] = useState([]);
  const [incidentsInDateRange, setIncidentsInDateRange] = useState([]);
  const [stats, setStats] = useState({
    totalAttacks: 0,
    activeThreats: 0,
    affectedCountries: 0,
    targetedIndustries: 0,
  });
  const [countriesData, setCountriesData] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [malwareDistribution, setMalwareDistribution] = useState([]);
  const [activeThreatsCount, setActiveThreatsCount] = useState(0);
  const navigate = useNavigate();
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [navigate]);

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toISOString().split('T')[0]; // Extracts the yyyy-mm-dd part
  };

  const countAttacksByCategory = (incidentData) => {
    const categoryCount = {};
    incidentData.forEach((incident) => {
      const category = incident.category;
      if (categoryCount[category]) {
        categoryCount[category] += incident?.victims?.length || 0;
      } else {
        categoryCount[category] = incident?.victims?.length || 0;
      }
    });

    return Object.keys(categoryCount).map((category) => ({
      name: category,
      count: categoryCount[category],
    }));
  };

  const activeThreats = (incidentData) => {
    const count = incidentData.reduce((acc, incident) => acc + (incident.status ? 1 : 0), 0);
    setActiveThreatsCount(count);
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const attackTrendResponse = await axios.get('http://localhost:5000/api/v1/incident/incidents');
        const attackTrendData = attackTrendResponse.data;
        console.log(attackTrendData?.data)
        
        const groupedData = attackTrendData?.data?.reduce((acc, curr) => {
          const date = curr?.createdAt?.split('T')[0] || '2024-10-17'; // Extracting just the date part (yyyy-mm-dd)
          const attacks = curr?.victims?.length || 0;
  
          // Check if this date is already in the accumulator
          if (acc[date]) {
            acc[date].attacks += attacks;
          } else {
            acc[date] = { date, attacks };
          }
  
          return acc;
        }, {});
  
        // Convert the grouped object back to an array
        setData(Object.values(groupedData) || []);
        
        const attackInDateRangeResponse = await fetch('http://localhost:5000/api/v1/incident/incidents/dates', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ startDate: "2023-01-01", endDate: formatDate(Date.now()) }),
        });
        const attackInDateRangeData = await attackInDateRangeResponse.json();
        setIncidentsInDateRange(attackInDateRangeData);
        
        const countriesResponse = await fetch('http://localhost:5000/api/v1/incident/incidents/getMostAffectedCountries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ startDate: "2023-01-01", endDate: formatDate(Date.now()) }),
        });
        const countriesData = await countriesResponse.json();
        setCountriesData(countriesData);
        
        const industriesResponse = await fetch('http://localhost:5000/api/v1/incident/incidents/getMostTargetedIndustries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ startDate: "2023-01-01", endDate: formatDate(Date.now()) }),
        });
        const industriesData = await industriesResponse.json();
        setIndustries(industriesData);
        
        setStats({
          totalAttacks: attackTrendData?.data?.length || 0,
          activeThreats: activeThreatsCount,
          affectedCountries: countriesData.length,
          targetedIndustries: industriesData.length,
        });

        setMalwareDistribution(countAttacksByCategory(attackTrendData?.data || []));
        activeThreats(attackTrendData?.data || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchStats();
  }, [activeThreatsCount]);

  if (!data.length) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">Attack Analysis</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AttackCard icon={Shield} title="Total Attacks" value={stats.totalAttacks} color="text-blue-600 dark:text-blue-400" />
        <AttackCard icon={Zap} title="Active Threats" value={activeThreatsCount} color="text-red-600 dark:text-red-400" />
        <AttackCard icon={Globe} title="Affected Countries" value={stats.affectedCountries} color="text-green-600 dark:text-green-400" />
        <AttackCard icon={Clock} title="Targeted Industries" value={stats.targetedIndustries} color="text-yellow-600 dark:text-yellow-400" />
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Attack Trend</h2>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-900 dark:text-gray-100" />
            <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} className="border-gray-300 rounded-lg p-2">
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="12m">Last 12 Months</option>
            </select>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="attacks" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div>
        {incidentsInDateRange.map((incident, index) => (
          <AttackItem key={index} date={incident.date} type={incident.category} target={incident.victims[0]?.industry} severity={incident.severity} />
        ))}
      </div>
    </div>
  );
};

export default AttacksPage;
