// import React, { useContext, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';

// const ExtremeHeroSection = () => {
//   const navigate=useNavigate();

//   const {token}=useContext(AuthContext);
//   useEffect(()=>{
//     if(!token)navigate('/login')
//   },[token])
  
//   useEffect(() => {
    
//     const createParticle = () => {
//       const particle = document.createElement('div');
//       particle.classList.add('particle');
      
//       const size = Math.random() * 5 + 2;
//       particle.style.width = `${size}px`;
//       particle.style.height = `${size}px`;
      
//       const x = Math.random() * window.innerWidth;
//       const y = window.innerHeight;
//       particle.style.left = `${x}px`;
//       particle.style.top = `${y}px`;
      
//       const hue = Math.random() * 360;
//       particle.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
      
//       const duration = Math.random() * 3 + 2;
//       particle.style.animation = `float-up ${duration}s linear`;
      
//       document.getElementById('particles').appendChild(particle);
      
//       setTimeout(() => {
//         particle.remove();
//       }, duration * 1000);
//     };

//     const intervalId = setInterval(createParticle, 50);

//     return () => clearInterval(intervalId);
//   }, []);

//   return (
//     <div className="bg-animated min-h-screen no_scroll flex items-center justify-center p-4 overflow-hidden">
//       <div id="particles"></div>
//       <div className="text-center z-10">
//         <h1 className="text-6xl font-bold mb-4 text-white neon-text glitch hover-3d" data-text="THREATACTIX">THREATACTIX</h1>
//         <p className="text-xl text-cyan-300 mb-8">Enter the digital realm of infinite possibilities</p>
//         <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-3 px-8 rounded-full hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 hover:scale-110 inline-block">
//           <i className="fas fa-rocket mr-2"></i>Launch Now
//         </button>
//       </div>

//       <style jsx>{`
//         @keyframes neon-pulse {
//           0%, 100% { text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #00ffff, 0 0 35px #00ffff, 0 0 40px #00ffff, 0 0 50px #00ffff, 0 0 75px #00ffff; }
//           50% { text-shadow: 0 0 2px #fff, 0 0 5px #fff, 0 0 7px #fff, 0 0 10px #00ffff, 0 0 17px #00ffff, 0 0 20px #00ffff, 0 0 25px #00ffff, 0 0 37px #00ffff; }
//         }

//         .neon-text {
//           animation: neon-pulse 1.5s infinite alternate;
//         }

//         .bg-animated {
//           background: linear-gradient(-45deg, #000000, #1a1a1a, #000033, #003366);
//           background-size: 400% 400%;
//           animation: gradient 15s ease infinite;
//         }

//         @keyframes gradient {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }

//         .glitch {
//           position: relative;
//         }

//         .glitch::before,
//         .glitch::after {
//           content: attr(data-text);
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//         }

//         .glitch::before {
//           left: 2px;
//           text-shadow: -2px 0 #ff00de;
//           clip: rect(24px, 550px, 90px, 0);
//           animation: glitch-anim 3s infinite linear alternate-reverse;
//         }

//         .glitch::after {
//           left: -2px;
//           text-shadow: -2px 0 #00ffff;
//           clip: rect(85px, 550px, 140px, 0);
//           animation: glitch-anim 2s infinite linear alternate-reverse;
//         }

//         @keyframes glitch-anim {
//           0% { clip: rect(39px, 9999px, 71px, 0); }
//           5% { clip: rect(76px, 9999px, 53px, 0); }
//           10% { clip: rect(42px, 9999px, 16px, 0); }
//           15% { clip: rect(94px, 9999px, 33px, 0); }
//           20% { clip: rect(3px, 9999px, 5px, 0); }
//           25% { clip: rect(21px, 9999px, 100px, 0); }
//           30% { clip: rect(79px, 9999px, 82px, 0); }
//           35% { clip: rect(56px, 9999px, 18px, 0); }
//           40% { clip: rect(6px, 9999px, 38px, 0); }
//           45% { clip: rect(65px, 9999px, 91px, 0); }
//           50% { clip: rect(31px, 9999px, 56px, 0); }
//           55% { clip: rect(88px, 9999px, 71px, 0); }
//           60% { clip: rect(13px, 9999px, 43px, 0); }
//           65% { clip: rect(50px, 9999px, 9px, 0); }
//           70% { clip: rect(27px, 9999px, 68px, 0); }
//           75% { clip: rect(85px, 9999px, 25px, 0); }
//           80% { clip: rect(44px, 9999px, 93px, 0); }
//           85% { clip: rect(19px, 9999px, 39px, 0); }
//           90% { clip: rect(71px, 9999px, 86px, 0); }
//           95% { clip: rect(2px, 9999px, 62px, 0); }
//           100% { clip: rect(54px, 9999px, 47px, 0); }
//         }

//         .hover-3d {
//           transition: transform 0.3s;
//         }

//         .hover-3d:hover {
//           transform: perspective(1000px) rotateX(10deg) rotateY(-10deg) rotateZ(2deg);
//         }

//         .particle {
//           position: absolute;
//           border-radius: 50%;
//         }

//         @keyframes float-up {
//           to {
//             transform: translateY(-100vh) rotate(360deg);
//             opacity: 0;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ExtremeHeroSection;
// import React, { useState, useEffect } from 'react';
// import { Shield, BarChart, AlertTriangle, Globe, Factory, Bug } from 'lucide-react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import {useNavigate} from 'react-router-dom'
// import WorldMapComponent from './WorldMapComponent';

// const data = [
//   { name: 'Jan', attacks: 400 },
//   { name: 'Feb', attacks: 300 },
//   { name: 'Mar', attacks: 600 },
//   { name: 'Apr', attacks: 800 },
//   { name: 'May', attacks: 500 },
//   { name: 'Jun', attacks: 700 },
// ];

// const TopBar = ({ toggleDarkMode, isDarkMode }) => (
//   <div className="bg-blue-600 dark:bg-gray-800 p-4 text-white flex justify-between items-center">
//     <div className="flex items-center space-x-4">
//       <Shield className="w-6 h-6" />
//       <h1 className="text-xl font-bold">ThreatTactix Dashboard</h1>
//     </div>
//     <div className="flex items-center space-x-4">
//       <button
//         className="bg-blue-500 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-600 px-3 py-1 rounded"
//         onClick={toggleDarkMode}
//       >
//         {isDarkMode ? 'Light Mode' : 'Dark Mode'}
//       </button>
//       <button className="bg-blue-500 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-600 px-3 py-1 rounded">
//         Set Alert
//       </button>
//       <span>John Doe</span>
//     </div>
//   </div>
// );

// const StatCard = ({ Icon, title, value, color }) => (
//   <div className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md ${color}`}>
//     <div className="flex items-center justify-between">
//       <div>
//         <p className="text-gray-500 dark:text-gray-400 text-sm">{title}</p>
//         <p className="text-2xl font-semibold mt-1 text-gray-900 dark:text-gray-100">{value}</p>
//       </div>
//       <Icon className="w-8 h-8 opacity-80" />
//     </div>
//   </div>
// );

// const Dashboard = () => {
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const navigate=useNavigate();
//   if(!localStorage.getItem('token')){
//     console.log(localStorage.getItem('token'))
//     navigate('/login');
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
//       {/* <TopBar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} /> */}
//       <div className="container mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <StatCard Icon={BarChart} title="Total Attacks" value="1,234" color="text-blue-600 dark:text-blue-400" />
//           <StatCard Icon={AlertTriangle} title="Active Threats" value="56" color="text-red-600 dark:text-red-400" />
//           <StatCard Icon={Globe} title="Affected Countries" value="23" color="text-green-600 dark:text-green-400" />
//           <StatCard Icon={Factory} title="Targeted Industries" value="8" color="text-yellow-600 dark:text-yellow-400" />
//         </div>

//         <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
//           <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Attack Trend</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={data}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Line type="monotone" dataKey="attacks" stroke="#3b82f6" strokeWidth={2} />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         <WorldMapComponent/>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Recent Malware</h2>
//             <ul className="space-y-2">
//               {['Ransomware X', 'Trojan Y', 'Worm Z'].map((malware, index) => (
//                 <li key={index} className="flex items-center space-x-2">
//                   <Bug className="w-5 h-5 text-red-500" />
//                   <span className="text-gray-900 dark:text-gray-100">{malware}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Most Targeted Industries</h2>
//             <ul className="space-y-2">
//               {['Finance', 'Healthcare', 'Technology'].map((industry, index) => (
//                 <li key={index} className="flex items-center space-x-2">
//                   <Factory className="w-5 h-5 text-blue-500" />
//                   <span className="text-gray-900 dark:text-gray-100">{industry}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import { Shield, BarChart, AlertTriangle, Globe, Factory, Bug } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import WorldMapComponent from './WorldMapComponent';

const StatCard = ({ Icon, title, value, color }) => (
  <div className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md ${color}`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{title}</p>
        <p className="text-2xl font-semibold mt-1 text-gray-900 dark:text-gray-100">{value}</p>
      </div>
      <Icon className="w-8 h-8 opacity-80" />
    </div>
  </div>
);

const Dashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [data, setData] = useState([]);
  const [incidentsInDateRange,setIncidentsInDateRange]=useState(); 
  const [activeThreatsCount,setActiveThreatsCount]=useState(0);

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
  if (!localStorage.getItem('token')) {
    navigate('/login');
  }

  const activeThreats = (incidentData) => {
    let ans=0;
    for(let i=0;i<incidentData?.length;i++){
     if(incidentData[i].status)ans++;
    }
    console.log(ans)

    setActiveThreatsCount(ans);
   };

  useEffect(() => {
    // Fetch stats for total attacks, active threats, affected countries, and targeted industries
    const fetchStats = async () => {
      try {
        // Fetch attack trend data
        const attackTrendResponse = await fetch('http://localhost:5000/api/v1/incident/incidents');
       
        const attackTrendData = await attackTrendResponse.json();
        activeThreats(attackTrendData?.data);
        // console.log(attackTrendData,'-->shubh');
        setData(attackTrendData?.data);
        const attackInDateRange = await fetch('http://localhost:5000/api/v1/incident/incidents/dates',{
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body:JSON.stringify({
            "startDate": "2023-01-01",
            "endDate": "2024-10-18"
          })
        });
        const attackInDateRangeData = await attackInDateRange.json();
        setIncidentsInDateRange(attackInDateRangeData);
        // Fetch most affected countries
        const countriesResponse = await fetch('http://localhost:5000/api/v1/incident/incidents/getMostAffectedCountries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body:JSON.stringify({
            "startDate": "2023-01-01",
            "endDate": "2024-10-18"
          })
          
        });
        const countriesData = await countriesResponse.json();
        // console.log(countriesData);
    
        // Fetch most targeted industries
        const industriesResponse = await fetch('http://localhost:5000/api/v1/incident/incidents/getMostTargetedIndustries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body:JSON.stringify({
            "startDate": "2023-01-01",
            "endDate": "2024-10-18"
          })
        });
        const industriesData = await industriesResponse.json();
        // console.log(industriesData);
    
        // // Fetch recent malwares
        // const malwaresResponse = await fetch('http://localhost:5000/api/v1/incident');
        // const malwaresData = await malwaresResponse.json();
        // console.log(malwaresData);
    // console.log(attackTrendData,'--->akjvj')
        // Update statistics data
        setStats({
          totalAttacks:attackTrendData?.data?.length, // Example calculation
          activeThreats: activeThreatsCount,
          affectedCountries: countriesData.length,
          targetedIndustries: industriesData.length,
        });
    
        // Update malwares and industries
        // setMalwares(malwaresData.slice(0, 3)); // Example: get first 3 malwares
        setIndustries(industriesData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* <TopBar toggleDarkMode={() => setIsDarkMode(!isDarkMode)} isDarkMode={isDarkMode} /> */}
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard Icon={BarChart} title="Total Attacks" value={stats.totalAttacks} color="text-blue-600 dark:text-blue-400" />
          <StatCard Icon={AlertTriangle} title="Active Threats" value={activeThreatsCount} color="text-red-600 dark:text-red-400" />
          <StatCard Icon={Globe} title="Affected Countries" value={stats.affectedCountries} color="text-green-600 dark:text-green-400" />
          <StatCard Icon={Factory} title="Targeted Industries" value={stats.targetedIndustries} color="text-yellow-600 dark:text-yellow-400" />
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Attack Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="attacks" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <WorldMapComponent />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Recent Malware</h2>
            <ul className="space-y-2">
              {incidentsInDateRange?.slice(0,3).map((malware, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <Bug className="w-5 h-5 text-red-500" />
                  <span className="text-gray-900 dark:text-gray-100">{malware.category}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Most Targeted Industries</h2>
            <ul className="space-y-2">
              {industries.map((industry, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <Factory className="w-5 h-5 text-blue-500" />
                  <div className='flex items-center justify-between flex-1'>
                  <span className="text-gray-900 font-semibold dark:text-gray-100">{industry._id}</span>
                  <span className="text-gray-900 font-semibold dark:text-gray-100">{industry.count}</span>
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
