import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CustomInput = ({ value, onChange, placeholder }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="bg-gray-100 border border-gray-300 text-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
  />
);

const CustomButton = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="bg-indigo-500 hover:bg-indigo-600 text-white dark:bg-indigo-600 dark:hover:bg-indigo-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
  >
    {children}
  </button>
);

const ThreatActorsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedGroup, setExpandedGroup] = useState(null);
  const [incidentData, setIncidentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [malwareDistribution, setMalwareDistribution] = useState([]);
  const [activeThreatsCount, setActiveThreatsCount] = useState(0);
  let totalMalware = 0;

  const countAttacksByCategory = (incidentData) => {
    const categoryCount = {};

    incidentData.forEach((incident) => {
      const category = incident.category;
      if (categoryCount[category]) {
        categoryCount[category] += incident?.victims?.length;
      } else {
        categoryCount[category] = 1;
      }
    });

    const newArray = Object.keys(categoryCount).map((category) => ({
      name: category,
      count: categoryCount[category],
    }));
    console.log(newArray);
    return newArray;
  };

  const activeThreats = (incidentData) => {
    let ans = 0;
    for (let i = 0; i < incidentData?.length; i++) {
      if (incidentData[i].status) ans++;
    }
    console.log(ans);
    setActiveThreatsCount(ans);
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  };

  useEffect(() => {
    const fetchIncidentData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/v1/incident/incidents'
        );

        setMalwareDistribution(countAttacksByCategory(response.data?.data));
        activeThreats(response.data?.data);
        setIncidentData(response.data?.data);

        const countriesResponse = await fetch(
          'http://localhost:5000/api/v1/incident/incidents/getMostAffectedCountries',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              startDate: '2023-01-01',
              endDate: formatDate(Date.now()),
            }),
          }
        );
        const countriesData = await countriesResponse.json();
        setCountries(countriesData);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching incident data:', error);
        setLoading(false);
      }
    };

    fetchIncidentData();
  }, []);

  totalMalware = incidentData.reduce(
    (total, incident) => total + (incident?.victims?.length || 0),
    0
  );

  const toggleExpand = (index) => {
    setExpandedGroup(expandedGroup === index ? null : index);
  };

  const uniqueThreatActorsMap = new Map();

  incidentData.forEach((actor) => {
    if (actor.threatActor) {
      const threatActorName = actor.threatActor.name;

      if (uniqueThreatActorsMap.has(threatActorName)) {
        const existingActor = uniqueThreatActorsMap.get(threatActorName);
        uniqueThreatActorsMap.set(threatActorName, {
          ...existingActor,
          updatedAt: actor.updatedAt,
        });
      } else {
        uniqueThreatActorsMap.set(threatActorName, actor);
      }
    }
  });

  const uniqueThreatActors = Array.from(uniqueThreatActorsMap.values());

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-300">
      <h1 className="text-4xl font-bold mb-6 dark:text-gray-100">Threat Actors</h1>

      <div className="mb-6">
        <h2 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-400">FILTERS</h2>
        <div className="flex gap-2">
          <CustomInput
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Name"
          />
          <CustomButton onClick={() => console.log('Search clicked')}>
            Search
          </CustomButton>
        </div>
        <button className="text-sm text-indigo-600 dark:text-indigo-400 mt-2 flex items-center">
          <span className="mr-1">✕</span> Clear filters
        </button>
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left text-gray-700 dark:text-gray-400 text-sm">
              <th className="p-3">#</th>
              <th className="p-3">THREAT ACTORS</th>
              <th className="p-3">CATEGORY</th>
              <th className="p-3">FIRST SEEN</th>
              <th className="p-3">LAST ACTIVITY</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {uniqueThreatActors?.map((actor, index) => (
              <tr key={actor._id} className="border-t border-gray-300 dark:border-gray-600">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">
                  <div className="flex items-center">
                    <div className="w-fit px-3 h-8 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-100 rounded-lg flex items-center justify-center mr-3">
                      {actor?.threatActor?.name}
                    </div>
                  </div>
                </td>
                <td className="p-3">
                  {actor.category !== '-' && (
                    <span className="bg-yellow-300 dark:bg-yellow-400 text-orange-800 dark:text-orange-900 text-xs font-medium px-2 py-1 rounded">
                      {actor?.category}
                    </span>
                  )}
                </td>
                <td className="p-3">
                  {actor?.createdAt
                    ? new Date(actor?.createdAt).toISOString().split('T')[0]
                    : ''}
                </td>
                <td className="p-3">
                  {actor?.updatedAt
                    ? new Date(actor?.updatedAt).toISOString().split('T')[0]
                    : ''}
                </td>
                <td className="p-3 text-right">
                  <button className="text-gray-700 dark:text-gray-400">&gt;</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ThreatActorsPage;
