import React, { useState } from 'react';
import { Calendar, Globe, Server, AlertTriangle, Tag, ChevronRight } from 'lucide-react';

// Simple Card component
const Card = ({ children, className = '' }) => (
  <div className={`bg-gray-800 rounded-xl shadow-lg overflow-hidden ${className}`}>
    {children}
  </div>
);

// Simple Badge component
const Badge = ({ children, className = '' }) => (
  <span className={`inline-flex items-center rounded-full bg-gray-700 px-2.5 py-0.5 text-xs font-medium text-gray-200 ${className}`}>
    {children}
  </span>
);

// Simple Button component
const Button = ({ children, className = '', ...props }) => (
  <button
    className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-cyan-600 text-white hover:bg-cyan-700 h-10 py-2 px-4 ${className}`}
    {...props}
  >
    {children}
  </button>
);

// Simple Tabs component
const Tabs = ({ children, defaultTab }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div>
      <div className="flex space-x-4 border-b border-gray-700 overflow-auto">
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
      activeTab === value ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400 hover:text-gray-200'
    }`}
    onClick={() => setActiveTab(value)}
  >
    {children}
  </button>
);

const CyberAttackReportPage = () => {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 min-h-screen p-4 sm:p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Cyber Threat Report
          </h1>
        </header>
        
        <Card>
          <div className="p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-cyan-400 mb-2">
              CyberDataPhantomsTeam Targets Educational Institution
            </h2>
            <div className="flex items-center text-sm text-gray-400 mb-4">
              <Calendar className="w-4 h-4 mr-2" />
              <span>Published: Oct 19, 2024</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-yellow-500" />
                <span><strong>Type:</strong> <Badge>Defacement</Badge></span>
              </div>
              <div className="flex items-center">
                <Globe className="w-5 h-5 mr-2 text-blue-400" />
                <span><strong>Domain:</strong> <a href="#" className="text-blue-400 hover:underline">pradeepcomputer.edu.np</a></span>
              </div>
              <div className="flex items-center">
                <Server className="w-5 h-5 mr-2 text-green-400" />
                <span><strong>IP:</strong> 103.232.124.141</span>
              </div>
            </div>
            
            <Tabs defaultTab="details">
              <Tab value="details">Attack Details</Tab>
              <Tab value="timeline">Timeline</Tab>
              <Tab value="ioc">IOCs</Tab>

              {/* <div value="details">
                <Card className="p-4 mt-4">
                  <p className="text-sm">
                    CyberDataPhantomsTeam targets the website of Pradeep Computer Education & Information of Technology.
                  </p>
                </Card>
              </div>
              <div value="timeline">
                <Card className="p-4 mt-4">
                  <ul className="space-y-2">
                    <li className="flex items-center"><ChevronRight className="w-4 h-4 mr-2 text-cyan-400" /> Oct 18, 2024: Initial compromise detected</li>
                    <li className="flex items-center"><ChevronRight className="w-4 h-4 mr-2 text-cyan-400" /> Oct 19, 2024: Website defacement discovered</li>
                  </ul>
                </Card>
              </div>
              <div value="ioc">
                <Card className="p-4 mt-4">
                  <p className="text-sm">No additional Indicators of Compromise (IOCs) available at this time.</p>
                </Card>
              </div> */}
            </Tabs>
          </div>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <div className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-cyan-400 mb-4">Meta Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Published:</span>
                  <span className="font-semibold">Oct 19, 2024</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Added:</span>
                  <span className="font-semibold">2 months ago</span>
                </div>
              </div>
            </div>
          </Card>
          
          <Card>
            <div className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-cyan-400 mb-4">Affected Entities</h3>
              <div className="flex flex-wrap gap-2">
                {['Nepal', 'Education', 'pradeep computer education & information of technology', '.np'].map((item, index) => (
                  <Badge key={index} className="bg-gray-700 text-gray-200">
                    <Tag className="w-3 h-3 mr-1" />
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        </div>
        
        <Card>
          <div className="p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-semibold text-cyan-400 mb-4">Evidence</h3>
            <div className="space-y-4">
              <img src="/api/placeholder/800/400" alt="Defacement screenshot" className="w-full rounded-lg shadow-md" />
              <div className="flex space-x-2 overflow-x-auto py-2">
                {[1, 2, 3].map((i) => (
                  <img key={i} src={`/api/placeholder/100/100`} alt={`Thumbnail ${i}`} className="w-24 h-24 rounded-lg shadow-md flex-shrink-0 cursor-pointer transition-transform hover:scale-105" />
                ))}
              </div>
            </div>
          </div>
        </Card>

        <div className="text-center mt-8">
          <Button>
            Download Full Report
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CyberAttackReportPage;
