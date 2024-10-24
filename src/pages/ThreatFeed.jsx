import React, { useEffect, useState } from 'react';
import { Calendar, Globe, Server, AlertTriangle, Tag, ChevronRight } from 'lucide-react';
import { useParams } from 'react-router-dom';

const Card = ({ children, className = '' }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-transform hover:scale-105 transform duration-300 overflow-hidden ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, className = '' }) => (
  <span className={`inline-flex items-center rounded-full bg-gray-200 dark:bg-gray-700 px-3 py-1 text-xs font-medium text-gray-800 dark:text-gray-200 ${className}`}>
    {children}
  </span>
);

const Button = ({ children, className = '', ...props }) => (
  <button
    className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-transform transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-cyan-600 text-white hover:bg-cyan-700 h-10 py-2 px-6 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Tabs = ({ children, defaultTab }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div>
      <div className="flex space-x-4 border-b border-gray-300 dark:border-gray-700 overflow-auto">
        {React.Children.map(children, (child) =>
          React.cloneElement(child, { activeTab, setActiveTab })
        )}
      </div>
      <div className="mt-4">
        {React.Children.map(children, (child) =>
          child.props.value === activeTab ? child.props.children : null
        )}
      </div>
    </div>
  );
};

const Tab = ({ children, value, activeTab, setActiveTab }) => (
  <button
    className={`px-4 py-2 font-semibold transition-colors ${
      activeTab === value ? 'text-cyan-400 dark:text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
    }`}
    onClick={() => setActiveTab(value)}
  >
    {children}
  </button>
);

const CyberAttackReportPage = () => {
  const [data, setData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/incident/incidents/${id}`);
        const resJson = await response.json();
        setData(resJson);
      } catch (error) {
        console.log(error?.message);
      }
    };
    fetchData();
  }, [id]);

  if (!data._id) return <p>Loading...</p>;

  const { title, publicationDate, category, network, victims = [], images = [] } = data;

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen p-4 sm:p-6">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="text-center mb-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            {title || 'Cyber Threat Report'}
          </h1>
        </header>

        <Card>
          <div className="p-3 md:p-6">
            <h2 className="text-xl md:text-2xl sm:text-3xl font-semibold text-cyan-400 mb-3">
              {title || 'CyberDataPhantomsTeam Targets Organization'}
            </h2>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
              <Calendar className="w-4 h-4 mr-2" />
              <span>Published: {new Date(publicationDate).toLocaleDateString()}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center">
                <AlertTriangle className="w-6 h-6 mr-2 text-yellow-500" />
                <span><strong>Category:</strong> <Badge>{category}</Badge></span>
              </div>
              <div className="flex items-center">
                <Globe className="w-6 h-6 mr-2 text-blue-400" />
                <span><strong>Network:</strong> {network}</span>
              </div>
            </div>

            <Tabs defaultTab="details">
              <Tab value="details">Attack Details</Tab>
              <Tab value="timeline">Timeline</Tab>
              <Tab value="ioc">IOCs</Tab>
            </Tabs>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <div className="p-3 md:p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-cyan-400 mb-4">Meta Information</h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-gray-400">Published:</span>
                  <span className="font-semibold">{new Date(publicationDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-3 md:p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-cyan-400 mb-4">Affected Entities</h3>
              <div className="flex flex-wrap gap-2">
                {victims.map((victim, index) => (
                  <Badge key={index} className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200">
                    <Tag className="w-4 h-4 mr-1" />
                    {victim.organization} ({victim.country}, {victim.industry})
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <Card>
          <div className="p-3 md:p-6">
            <h3 className="text-lg sm:text-xl font-semibold text-cyan-400 mb-4">Evidence</h3>
            <div className="space-y-4">
              {images.map((image, index) => (
                <div key={index}>
                  <img
                    src={image.url}
                    alt={image.description}
                    className="w-full rounded-lg shadow-md hover:scale-105 transform transition-transform duration-300"
                  />
                  <p className="text-sm mt-2">{image.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <div className="text-center mt-10">
          <Button>
            Download Full Report
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CyberAttackReportPage;
