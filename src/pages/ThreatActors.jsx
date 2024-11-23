// import React, { useEffect, useState, useCallback, useMemo } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import AdaptivePulsatingSpinner from '../components/Loading';
// import debounce from 'lodash.debounce'; // Add lodash for debounce

// const CustomInput = React.memo(({ value, onChange, placeholder }) => (
//   <input
//     type="text"
//     value={value}
//     onChange={onChange}
//     placeholder={placeholder}
//     className="bg-gray-100 border border-gray-300 text-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded px-3 py-2 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-indigo-500"
//   />
// ));

// const CustomButton = React.memo(({ children, onClick }) => (
//   <button
//     onClick={onClick}
//     className="bg-indigo-500 hover:bg-indigo-600 text-white dark:bg-indigo-600 dark:hover:bg-indigo-700 font-bold py-2 px-4 rounded w-full sm:w-auto focus:outline-none focus:shadow-outline"
//   >
//     {children}
//   </button>
// ));

// const ThreatActorsPage = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [expandedGroup, setExpandedGroup] = useState(null);
//   const [incidentData, setIncidentData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const [countries, setCountries] = useState([]);
//   const [malwareDistribution, setMalwareDistribution] = useState([]);
//   const [activeThreatsCount, setActiveThreatsCount] = useState(0);
  
//   const fetchIncidentData = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get('http://localhost:5000/api/v1/incident/incidents');
//       console.log(data)
//       setMalwareDistribution(countAttacksByCategory(data?.data));
//       console.log(countAttacksByCategory(data?.data))
//       activeThreats(data?.data);
//       setIncidentData(data?.data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching incident data:', error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchIncidentData();
//   }, []);

//   const debouncedSearch = useMemo(
//     () => debounce((value) => setSearchTerm(value), 300),
//     []
//   );

//   const countAttacksByCategory = useCallback((incidentData) => {
//     const categoryCount = {};
//     incidentData.forEach((incident) => {
//       const category = incident?.data[0]?.row?.category;
//       console.log(category)
//       if (categoryCount[category]) {
//         categoryCount[category] += 1;
//       } else {
//         categoryCount[category] = 1;
//       }
//     });
    
//     return Object.keys(categoryCount).map((category) => ({
//       name: category,
//       count: categoryCount[category],
//     }));
//   }, []);

//   const activeThreats = useCallback((incidentData) => {
//     const ans = incidentData.reduce((acc, incident) => acc + (incident.status ? 1 : 0), 0);
//     setActiveThreatsCount(ans);
//   }, []);

//   const toggleExpand = useCallback((index) => {
//     setExpandedGroup(expandedGroup === index ? null : index);
//   }, [expandedGroup]);

//   if (loading) {
//     return <AdaptivePulsatingSpinner />;
//   }

//   return (
//     <div className="min-h-screen p-4 sm:p-6 bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-300">
//       <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 dark:text-gray-100">
//         Threat Actors
//       </h1>
//       <div className="mb-4 sm:mb-6">
//         <h2 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-400">FILTERS</h2>
//         <div className="flex flex-col sm:flex-row gap-2">
//           <CustomInput
//             value={searchTerm}
//             onChange={(e) => debouncedSearch(e.target.value)}
//             placeholder="Name"
//           />
//           <CustomButton onClick={() => console.log('Search clicked')}>Search</CustomButton>
//         </div>
//         <button className="text-sm text-indigo-600 dark:text-indigo-400 mt-2 flex items-center">
//           <span className="mr-1">✕</span> Clear filters
//         </button>
//       </div>
//       <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
//         <div className="w-full overflow-x-auto">
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="text-left text-gray-700 dark:text-gray-400 text-sm">
//                 <th className="p-3 w-fit text-nowrap">#</th>
//                 <th className="p-3 w-fit text-nowrap">THREAT ACTORS</th>
//                 <th className="p-3 w-fit text-nowrap">CATEGORY</th>
//                 <th className="p-3 w-fit text-nowrap">FIRST SEEN</th>
//                 <th className="p-3 w-fit text-nowrap">LAST ACTIVITY</th>
//                 <th className="p-3 w-fit text-nowrap"></th>
//               </tr>
//             </thead>
//             <tbody>
//               {incidentData.map((actor, index) => (
//                 <tr key={actor._id} className="border-t border-gray-300 dark:border-gray-600">
//                   <td className="p-3">{index + 1}</td>
//                   <td className="p-3">
//                     <div className="flex items-center">
//                       <div className="w-fit text-nowrap px-3 h-fit bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-100 rounded-lg flex items-center justify-center mr-3">
//                         {actor?.data[0]?.row?.threatActor_name}
//                       </div>
//                     </div>
//                   </td>
//                   <td className="p-3">
//                     {actor.category !== '-' && (
//                       <span className="bg-yellow-300 text-nowrap dark:bg-yellow-400 text-orange-800 dark:text-orange-900 text-xs font-medium px-2 py-1 rounded">
//                         {actor?.data[0]?.row?.category}
//                       </span>
//                     )}
//                   </td>
//                   <td className="p-3 text-nowrap">
//                     {actor?.createdAt
//                       ? new Date(actor?.createdAt).toISOString().split('T')[0]
//                       : ''}
//                   </td>
//                   <td className="p-3 text-nowrap">
//                     {actor?.updatedAt
//                       ? new Date(actor?.updatedAt).toISOString().split('T')[0]
//                       : ''}
//                   </td>
//                   <td className="p-3 text-nowrap cursor-pointer text-right" onClick={() => navigate(`/threat-feed/${actor?._id}`)}>
//                     <button className="text-gray-700 dark:text-gray-400">&gt;</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ThreatActorsPage;


import React, { useEffect, useState, useCallback, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdaptivePulsatingSpinner from '../components/Loading';
import debounce from 'lodash';

const SearchIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

const ChevronIcon = ({ isExpanded }) => (
  <svg 
    className={`h-5 w-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const CustomInput = React.memo(({ value, onChange, placeholder }) => (
  <div className="relative">
    <div className="absolute left-3 top-2.5 text-gray-500">
      <SearchIcon />
    </div>
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="pl-10 bg-white border border-gray-300 text-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
    />
  </div>
));

const CategoryCard = React.memo(({ category, actors, onActorClick, isExpanded, onToggle }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
    <div 
      className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors flex items-center justify-between"
      onClick={onToggle}
    >
      <div className="flex items-center space-x-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          {category}
        </h3>
        <span className="bg-indigo-50 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200 px-3 py-1 rounded-full text-sm">
          {actors.length} actors
        </span>
      </div>
      <ChevronIcon isExpanded={isExpanded} />
    </div>
    
    {isExpanded && (
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {actors.map((actor) => (
            <div
              key={actor._id}
              onClick={() => onActorClick(actor._id)}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="px-3 py-1 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 group-hover:border-indigo-500 transition-colors">
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {actor.data[0].row.threatActor_name}
                  </span>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex justify-between">
                  <span>First seen:</span>
                  <span>{new Date(actor.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Last activity:</span>
                  <span>{new Date(actor.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
));

const ThreatActorsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState(new Set());
  const [incidentData, setIncidentData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchIncidentData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('http://localhost:5000/api/v1/incident/incidents');
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

  const groupedActors = useMemo(() => {
    const groups = {};
    incidentData.forEach((actor) => {
      const category = actor?.data[0]?.row?.category || 'Uncategorized';
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(actor);
    });
    return groups;
  }, [incidentData]);

  const filteredGroups = useMemo(() => {
    if (!searchTerm) return groupedActors;
    
    const filtered = {};
    Object.entries(groupedActors).forEach(([category, actors]) => {
      const filteredActors = actors.filter((actor) =>
        actor.data[0].row.threatActor_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (filteredActors.length > 0) {
        filtered[category] = filteredActors;
      }
    });
    return filtered;
  }, [groupedActors, searchTerm]);

  const toggleCategory = useCallback((category) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  }, []);

  const clearFilters = useCallback(() => {
    setSearchTerm('');
  }, []);

  if (loading) {
    return <AdaptivePulsatingSpinner />;
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Threat Actors
      </h1>
      
      <div className="mb-6">
        <h2 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-400">
          FILTERS
        </h2>
        <div className="space-y-2">
          <CustomInput
            value={searchTerm}
            onChange={(e) => debouncedSearch(e.target.value)}
            placeholder="Search by actor name"
          />
          {searchTerm && (
            <button 
              onClick={clearFilters}
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center transition-colors"
            >
              <span className="mr-1">×</span>
              Clear filters
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {Object.entries(filteredGroups).map(([category, actors]) => (
          <CategoryCard
            key={category}
            category={category}
            actors={actors}
            onActorClick={(id) => navigate(`/threat-feed/${id}`)}
            isExpanded={expandedCategories.has(category)}
            onToggle={() => toggleCategory(category)}
          />
        ))}
        {Object.keys(filteredGroups).length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No threat actors found matching your search criteria
          </div>
        )}
      </div>
    </div>
  );
};

export default ThreatActorsPage;