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
  const [rssUrls,setRssUrls]=useState([]);
  const { id } = useParams();

  const ITEMS_PER_PAGE = 5;

  const fetchFeeds = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/v1/threats/threatfeeds');
        const data = await response.json();
        const newArray=data?.map(item=>item?.url);
        setRssUrls(newArray)
        console.log(data) 
    } catch (error) {
        // showSnackbar('Failed to fetch threat feeds', 'error');
    }
};

useEffect(()=>{
  fetchFeeds()
},[])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:5000/api/v1/incident/incidents/${id}`
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
  }, [id,rssUrls]);

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

  function extractTextFromHTML(htmlString) {
    // Remove all HTML tags using regex
    const text = htmlString.replace(/<[^>]*>/g, '');
    return text.trim(); // Trim whitespace from the result
  }

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
                        {extractTextFromHTML(item.description)}
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
