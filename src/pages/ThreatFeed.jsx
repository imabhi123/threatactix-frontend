// import React, { useEffect, useState } from "react";
// import {
//   Calendar,
//   Globe,
//   Server,
//   AlertTriangle,
//   Tag,
//   ChevronRight,
// } from "lucide-react";
// import { useParams } from "react-router-dom";

// const Card = ({ children, className = "" }) => (
//   <div
//     className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95 ${className}`}
//   >
//     {children}
//   </div>
// );

// const Badge = ({ children, className = "" }) => (
//   <span
//     className={`inline-flex items-center rounded-full bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900 dark:to-blue-900 px-4 py-1.5 text-xs font-bold text-cyan-800 dark:text-cyan-200 tracking-wider shadow-sm ${className}`}
//   >
//     {children}
//   </span>
// );

// const Button = ({ children, className = "", ...props }) => (
//   <button
//     className={`inline-flex items-center justify-center rounded-lg text-sm font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-2.5 px-6 shadow-lg hover:shadow-xl active:scale-95 ${className}`}
//     {...props}
//   >
//     {children}
//   </button>
// );

// const Tabs = ({ children, defaultTab }) => {
//   const [activeTab, setActiveTab] = useState(defaultTab);

//   return (
//     <div>
//       <div className="flex space-x-6 border-b border-gray-200 dark:border-gray-700 overflow-x-auto scrollbar-hide pb-2">
//         {React.Children.map(children, (child) =>
//           React.cloneElement(child, { activeTab, setActiveTab })
//         )}
//       </div>
//       <div className="mt-8">
//         {React.Children.map(children, (child) =>
//           child.props.value === activeTab ? child.props.children : null
//         )}
//       </div>
//     </div>
//   );
// };

// const Tab = ({ children, value, activeTab, setActiveTab }) => (
//   <button
//     className={`px-4 py-2.5 font-bold transition-all max-w-full duration-300 relative ${
//       activeTab === value
//         ? "text-cyan-500 dark:text-cyan-400"
//         : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
//     }`}
//     onClick={() => setActiveTab(value)}
//   >
//     {children}
//     {activeTab === value && (
//       <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
//     )}
//   </button>
// );

// const CyberAttackReportPage = () => {
//   const [data, setData] = useState({});
//   const [rssFeed, setRssFeed] = useState([]);
//   const [ipInfo, setIpInfo] = useState(null);
//   const { id } = useParams();

//   const rssUrls = [
//     "http://feeds.trendmicro.com/TrendMicroSimplySecurity",
//     "http://www.theregister.co.uk/security/headlines.atom",
//     "http://thehackernews.com/feeds/posts/default",
//     "https://thedfirreport.com/feed/",
//     "http://feeds.feedburner.com/Securityweek",
//     "http://securityaffairs.co/wordpress/feed",
//     "https://securelist.com/feed/",
//     "https://blogs.sans.org/computer-forensics/feed/",
//     "http://researchcenter.paloaltonetworks.com/feed/",
//     "http://packetstormsecurity.org/headlines.xml",
//     "http://blogs.technet.com/msrc/rss.xml",
//     "http://blogs.technet.com/mmpc/rss.xml",
//     "http://blog.malwarebytes.org/feed/",
//     "http://blog.zeltser.com/rss",
//     "http://krebsonsecurity.com/feed/",
//     "http://www.hexacorn.com/blog/feed/",
//     "http://feeds.feedburner.com/hackread",
//     "http://feeds.feedburner.com/darknethackers",
//     "http://www.darkreading.com/rss/all.xml",
//     "http://vrt-sourcefire.blogspot.com/feeds/posts/default",
//     "https://www.us-cert.gov/ncas/alerts.xml",
//     "http://www.bleepingcomputer.com/feed/",
//     "http://feeds.trendmicro.com/Anti-MalwareBlog/"
//   ];

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           `https://threatactix-backend.onrender.com/api/v1/incident/incidents/${id}`
//         );
//         const resJson = await response.json();
//         setData(resJson);
//       } catch (error) {
//         console.log(error?.message);
//       }
//     };

//     const fetchRSSFeeds = async () => {
//       try {
//         const rssItems = [];
//         for (const url of rssUrls) {
//           const response = await fetch(
//             `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`
//           );
//           const resJson = await response.json();
//           rssItems.push(...(resJson.items || []));
//         }
//         setRssFeed(rssItems);
//       } catch (error) {
//         console.log(error?.message);
//       }
//     };

//     fetchData();
//     fetchRSSFeeds();
//   }, [id]);

//   function parseHTMLString(input) {
//     // If input is an HTML element, return it directly
//     if (input instanceof HTMLElement) {
//       return input;
//     }
  
//     // If input is a string, attempt to parse it as HTML
//     if (typeof input === 'string') {
//       const parser = new DOMParser();
//       const doc = parser.parseFromString(input, 'text/html');
  
//       // Check for parsing errors
//       const parseError = doc.querySelector('parsererror');
//       if (parseError) {
//         throw new Error('Error parsing HTML: ' + parseError.textContent);
//       }
  
//       // Return the body of the parsed document as the root element
//       return doc.body;
//     }
  
//     // If input is neither a string nor an HTML element, throw an error
//     throw new Error('Invalid input: expected a string or an HTML element');
//   }

//   const { title, publicationDate, category, network } = data;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100 p-6 sm:p-8">
//       <div className="max-w-6xl mx-auto space-y-12">
//         <header className="text-center mb-12">
//           <div className="inline-block p-1.5 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 mb-6">
//             <Badge>Cyber Security Report</Badge>
//           </div>
//           <h1 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 tracking-tight">
//             {title || "Cyber Threat Report"}
//           </h1>
//         </header>

//         <Card>
//           <div className="p-6 md:p-8">
//             <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 mb-6">
//               {title || "CyberDataPhantomsTeam Targets Organization"}
//             </h2>
            
//             <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-8 bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3">
//               <Calendar className="w-5 h-5 mr-2 text-cyan-500" />
//               <span className="font-medium">
//                 Published: {new Date(publicationDate).toLocaleDateString()}
//               </span>
//             </div>

//             <Tabs defaultTab="rss">
//               <Tab value="rss">Related News</Tab>
//               <Tab value="ipinfo">IP Information</Tab>
//             </Tabs>

//             <div className="mt-6">
//               <Tabs>
//                 <Tab value="rss" className='max-w-full'>
//                   <div className="space-y-8">
//                     <div className="flex items-center space-x-2 mb-6">
//                       <Globe className="w-5 h-5 text-cyan-500" />
//                       <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
//                         Related News
//                       </h3>
//                     </div>
//                     <ul className="space-y-6 divide-y divide-gray-100 dark:divide-gray-800">
//                       {rssFeed.map((item, index) => (
//                         <li key={index} className=" hover:bg-black/15 p-3 rounded-lg ">
//                           <a
//                             href={item.link}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="group block"
//                           >
//                             <h4 className="text-lg text-left font-semibold text-cyan-500 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-200 mb-2">
//                               {item.title}
//                             </h4>
//                             <p className="text-gray-600 text-left dark:text-gray-400 line-clamp-3 text-sm leading-relaxed">
//                               {item.description}
//                             </p>
//                             {/* {item.content} */}
//                           </a>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </Tab>
//               </Tabs>
//             </div>
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default CyberAttackReportPage;

import React, { useEffect, useState } from "react";
import {
  Calendar,
  Globe,
  ChevronRight,
} from "lucide-react";
import { useParams } from "react-router-dom";

// Existing components remain the same
const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95 ${className}`}
  >
    {children}
  </div>
);

const Badge = ({ children, className = "" }) => (
  <span
    className={`inline-flex items-center rounded-full bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900 dark:to-blue-900 px-4 py-1.5 text-xs font-bold text-cyan-800 dark:text-cyan-200 tracking-wider shadow-sm ${className}`}
  >
    {children}
  </span>
);

const Button = ({ children, className = "", ...props }) => (
  <button
    className={`inline-flex items-center justify-center rounded-lg text-sm font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-2.5 px-6 shadow-lg hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    {...props}
  >
    {children}
  </button>
);

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
  </div>
);

const CyberAttackReportPage = () => {
  const [data, setData] = useState({});
  const [rssFeed, setRssFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const { id } = useParams();

  const ITEMS_PER_PAGE = 5;
  const rssUrls = [
    "http://feeds.trendmicro.com/TrendMicroSimplySecurity",
    "http://www.theregister.co.uk/security/headlines.atom",
    "http://thehackernews.com/feeds/posts/default",
    // ... other URLs
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://threatactix-backend.onrender.com/api/v1/incident/incidents/${id}`
        );
        const resJson = await response.json();
        setData(resJson);
      } catch (error) {
        console.log(error?.message);
      }
    };

    const fetchInitialRSSFeeds = async () => {
      try {
        const rssItems = [];
        for (const url of rssUrls.slice(0, 3)) {
          const response = await fetch(
            `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`
          );
          const resJson = await response.json();
          rssItems.push(...(resJson.items || []));
        }
        setRssFeed(rssItems);
      } catch (error) {
        console.log(error?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    fetchInitialRSSFeeds();
  }, [id]);

  const loadMoreFeeds = async () => {
    if (loadingMore || currentPage * ITEMS_PER_PAGE >= rssFeed.length) return;

    try {
      setLoadingMore(true);
      const newFeeds = [];
      const startIdx = currentPage;
      const endIdx = startIdx + 1;

      for (const url of rssUrls.slice(startIdx, endIdx)) {
        const response = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`
        );
        const resJson = await response.json();
        newFeeds.push(...(resJson.items || []));
      }
      setRssFeed((prev) => [...prev, ...newFeeds]);
      setCurrentPage((prev) => prev + 1);
    } catch (error) {
      console.log(error?.message);
    } finally {
      setLoadingMore(false);
    }
  };

  const { title, publicationDate } = data;
  const currentItems = rssFeed.slice(0, currentPage * ITEMS_PER_PAGE);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100 p-6 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="text-center mb-12">
          <Badge>Cyber Security Report</Badge>
          <h1 className="text-4xl sm:text-5xl mt-6 font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 tracking-tight">
            {title || "Cyber Threat Report"}
          </h1>
        </header>

        <Card>
          <div className="p-6 md:p-8">
            {/* <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 mb-6">
              {title || "CyberDataPhantomsTeam Targets Organization"}
            </h2>
            
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-8 bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3">
              <Calendar className="w-5 h-5 mr-2 text-cyan-500" />
              <span className="font-medium">
                Published: {new Date(publicationDate).toLocaleDateString()}
              </span>
            </div> */}

            <div className="mt-6 space-y-8">
              <div className="flex items-center space-x-2 mb-6">
                <Globe className="w-5 h-5 text-cyan-500" />
                <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
                  Related News
                </h3>
              </div>
              <ul className="space-y-6 divide-y divide-gray-100 dark:divide-gray-800">
                {currentItems.map((item, index) => (
                  <li key={index} className="hover:bg-black/15 p-3 rounded-lg">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block"
                    >
                      <h4 className="text-lg font-semibold text-cyan-500 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-200 mb-2">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 line-clamp-3 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </a>
                  </li>
                ))}
              </ul>
              
              <div className="flex justify-center mt-8">
                {loadingMore ? (
                  <LoadingSpinner />
                ) : (
                  currentPage * ITEMS_PER_PAGE < rssFeed.length && (
                    <Button onClick={loadMoreFeeds}>
                      Load More News
                    </Button>
                  )
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CyberAttackReportPage;
