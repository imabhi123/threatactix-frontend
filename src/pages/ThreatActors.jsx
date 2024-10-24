import React, { useEffect, useState, useCallback, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdaptivePulsatingSpinner from '../components/Loading';
import debounce from 'lodash.debounce'; // Add lodash for debounce

const CustomInput = React.memo(({ value, onChange, placeholder }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="bg-gray-100 border border-gray-300 text-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded px-3 py-2 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-indigo-500"
  />
));

const CustomButton = React.memo(({ children, onClick }) => (
  <button
    onClick={onClick}
    className="bg-indigo-500 hover:bg-indigo-600 text-white dark:bg-indigo-600 dark:hover:bg-indigo-700 font-bold py-2 px-4 rounded w-full sm:w-auto focus:outline-none focus:shadow-outline"
  >
    {children}
  </button>
));

const ThreatActorsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedGroup, setExpandedGroup] = useState(null);
  const [incidentData, setIncidentData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [malwareDistribution, setMalwareDistribution] = useState([]);
  const [activeThreatsCount, setActiveThreatsCount] = useState(0);
  
  const fetchIncidentData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('http://localhost:5000/api/v1/incident/incidents');
      setMalwareDistribution(countAttacksByCategory(data?.data));
      activeThreats(data?.data);
      setIncidentData(data?.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching incident data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidentData();
  }, []);

  const debouncedSearch = useMemo(
    () => debounce((value) => setSearchTerm(value), 300),
    []
  );

  const countAttacksByCategory = useCallback((incidentData) => {
    const categoryCount = {};
    incidentData.forEach((incident) => {
      const category = incident.category;
      if (categoryCount[category]) {
        categoryCount[category] += incident?.victims?.length;
      } else {
        categoryCount[category] = 1;
      }
    });
    return Object.keys(categoryCount).map((category) => ({
      name: category,
      count: categoryCount[category],
    }));
  }, []);

  const activeThreats = useCallback((incidentData) => {
    const ans = incidentData.reduce((acc, incident) => acc + (incident.status ? 1 : 0), 0);
    setActiveThreatsCount(ans);
  }, []);

  const toggleExpand = useCallback((index) => {
    setExpandedGroup(expandedGroup === index ? null : index);
  }, [expandedGroup]);

  if (loading) {
    return <AdaptivePulsatingSpinner />;
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-300">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 dark:text-gray-100">
        Threat Actors
      </h1>
      <div className="mb-4 sm:mb-6">
        <h2 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-400">FILTERS</h2>
        <div className="flex flex-col sm:flex-row gap-2">
          <CustomInput
            value={searchTerm}
            onChange={(e) => debouncedSearch(e.target.value)}
            placeholder="Name"
          />
          <CustomButton onClick={() => console.log('Search clicked')}>Search</CustomButton>
        </div>
        <button className="text-sm text-indigo-600 dark:text-indigo-400 mt-2 flex items-center">
          <span className="mr-1">✕</span> Clear filters
        </button>
      </div>
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left text-gray-700 dark:text-gray-400 text-sm">
                <th className="p-3 w-fit text-nowrap">#</th>
                <th className="p-3 w-fit text-nowrap">THREAT ACTORS</th>
                <th className="p-3 w-fit text-nowrap">CATEGORY</th>
                <th className="p-3 w-fit text-nowrap">FIRST SEEN</th>
                <th className="p-3 w-fit text-nowrap">LAST ACTIVITY</th>
                <th className="p-3 w-fit text-nowrap"></th>
              </tr>
            </thead>
            <tbody>
              {incidentData.map((actor, index) => (
                <tr key={actor._id} className="border-t border-gray-300 dark:border-gray-600">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">
                    <div className="flex items-center">
                      <div className="w-fit text-nowrap px-3 h-fit bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-100 rounded-lg flex items-center justify-center mr-3">
                        {actor?.threatActor?.name}
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    {actor.category !== '-' && (
                      <span className="bg-yellow-300 text-nowrap dark:bg-yellow-400 text-orange-800 dark:text-orange-900 text-xs font-medium px-2 py-1 rounded">
                        {actor?.category}
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-nowrap">
                    {actor?.createdAt
                      ? new Date(actor?.createdAt).toISOString().split('T')[0]
                      : ''}
                  </td>
                  <td className="p-3 text-nowrap">
                    {actor?.updatedAt
                      ? new Date(actor?.updatedAt).toISOString().split('T')[0]
                      : ''}
                  </td>
                  <td className="p-3 text-nowrap cursor-pointer text-right" onClick={() => navigate(`/threat-feed/${actor?._id}`)}>
                    <button className="text-gray-700 dark:text-gray-400">&gt;</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ThreatActorsPage;
