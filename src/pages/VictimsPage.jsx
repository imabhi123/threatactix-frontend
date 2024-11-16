import React, { useEffect, useState } from "react";
import { Users, Building, Globe, Briefcase, Search } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

let data = [
  { name: "Finance", value: 30 },
  { name: "Healthcare", value: 25 },
  { name: "Government", value: 20 },
  { name: "Education", value: 15 },
  { name: "Retail", value: 10 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const VictimCard = ({ title, value, icon: Icon, color }) => (
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
      <Icon className="w-8 h-8 opacity-80 text-gray-900 dark:text-gray-100" />
    </div>
  </div>
);

const VictimItem = ({ name, industry, country, attackType }) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
    <div className="flex justify-between items-center">
      <div>
        <p className="font-semibold text-gray-900 dark:text-gray-100">{name}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Industry: {industry}
        </p>
      </div>
      <div className="text-right">
        <p className="font-semibold text-gray-900 dark:text-gray-100">
          {country}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{attackType}</p>
      </div>
    </div>
  </div>
);

const VictimsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [victimsCount, setVictimsCount] = useState(0);
  const [countryCount, setCountryCount] = useState(new Map());
  const [industriesCount, setIndustriesCount] = useState(0);
  const [incident, setIncidents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const attackTrendResponse = await fetch(
        "http://localhost:5000/api/v1/incident/incidents"
      );
      const attackTrendData = await attackTrendResponse?.json();
      console?.log(attackTrendData?.data);
      setIncidents(attackTrendData?.data);

      // Maps for storing counts
      const victimMap = new Map();
      const countryMap = new Map();
      const industryMap = new Map();

      // Loop through data and populate maps
      
      attackTrendData?.data?.forEach((incident) => {
        victimMap?.set(
          incident?.data[0]?.row.victims_organization,
          victimMap?.get(incident?.data[0]?.row.victims_organization)?victimMap?.get(incident?.data[0]?.row.victims_organization) + 1:1
        );
        countryMap?.set(
          incident?.data[0]?.row.victims_country,
          countryMap?.get(incident?.data[0]?.row.victims_country)?countryMap?.get(incident?.data[0]?.row.victims_country) + 1:1
        );

        industryMap?.set(
          incident?.data[0]?.row.victims_industry,
          industryMap?.get(incident?.data[0]?.row.victims_industry)?industryMap?.get(incident?.data[0]?.row.victims_industry) + 1:1
        );
      });

      console.log(industryMap);

      data = Array?.from(industryMap)?.map(([name, value], index) => ({
        name,
        value,
      }));

      // Set the counts from the map sizes
      setVictimsCount(victimMap?.size);
      setCountryCount(countryMap);
      console?.log(industryMap);
      setIndustriesCount(industryMap?.size);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">
        Victim Analysis
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <VictimCard
          icon={Users}
          title="Total Victims"
          value={victimsCount}
          color="text-blue-600 dark:text-blue-400"
        />
        <VictimCard
          icon={Building}
          title="Affected Organizations"
          value={victimsCount}
          color="text-red-600 dark:text-red-400"
        />
        <VictimCard
          icon={Globe}
          title="Affected Countries"
          value={countryCount?.size}
          color="text-green-600 dark:text-green-400"
        />
        <VictimCard
          icon={Briefcase}
          title="Affected Industries"
          value={industriesCount}
          color="text-yellow-600 dark:text-yellow-400"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Victims by Industry
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data?.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS?.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: "#fff", color: "#000" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Most Affected Regions
          </h2>
          <ul className="space-y-2 text-gray-900 dark:text-gray-100">
            {Array?.from(countryCount)?.map(([name, value], index) => (
              <li key={index} className="flex items-center justify-between">
                <span>{name}</span> {/* Country name */}
                <span className="font-semibold">{value}</span>{" "}
                {/* Country count */}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="flex justify-between flex-wrap gap-4 items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Recent Victims
          </h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search victims?.?.?."
              className="border dark:border-gray-700 rounded-full py-2 px-4 pl-10 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
            />
            <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400 dark:text-gray-300" />
          </div>
        </div>

        {incident?.map((item, index) => (
          <VictimItem
            key={index}
            name={item?.threatActor?.name}
            industry={'Finance'||item?.victims[0]?.industry}
            country={'India'||item?.victims[0]?.country}
            attackType={item?.category}
          />
        ))}
      </div>
    </div>
  );
};

export default VictimsPage;
