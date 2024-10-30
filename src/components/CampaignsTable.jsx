import React, { useState } from 'react';

// Custom Input Component
const Input = ({ className = "", ...props }) => (
  <input
    className={`w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 
    text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 
    focus:ring-blue-500 focus:border-transparent ${className}`}
    {...props}
  />
);

// Custom Select Component
const Select = ({ value, onChange, options, className = "" }) => (
  <div className="relative">
    <select
      value={value}
      onChange={onChange}
      className={`appearance-none w-full px-4 py-2 rounded-lg bg-gray-800 
      border border-gray-700 text-gray-200 cursor-pointer focus:outline-none 
      focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
);

// Custom Button Component
const Button = ({ 
  children, 
  variant = "default", 
  disabled = false, 
  className = "", 
  ...props 
}) => {
  const baseStyles = "px-4 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 transition-colors duration-200";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    outline: "bg-gray-800 border border-gray-700 text-gray-200 hover:bg-gray-700 focus:ring-gray-500",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

// Icons Components
const SearchIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
  </svg>
);

const SortIcon = ({ direction }) => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
      d={direction === 'asc' 
        ? "M5 15l7-7 7 7" 
        : "M19 9l-7 7-7-7"} />
  </svg>
);

// Main Component
const CampaignList = () => {
  // Sample data
  const allCampaigns = [
    {
      id: 1,
      name: "Marketing Campaign 2024",
      team: "Marketing Team Alpha",
      attacks: 24,
      status: "active",
      risk: "high",
      targets: ["B", "M", "U", "R", "X", "Y"],
      lastActivity: "29 Oct, 2024"
    },
    {
      id: 2,
      name: "Email Outreach Q4",
      team: "Growth Team",
      attacks: 18,
      status: "pending",
      risk: "medium",
      targets: ["Z", "T"],
      lastActivity: "29 Oct, 2024"
    },
    {
      id: 3,
      name: "Social Media Push",
      team: "Digital Team",
      attacks: 32,
      status: "active",
      risk: "low",
      targets: ["L", "T", "G", "S"],
      lastActivity: "27 Oct, 2024"
    },
    {
      id: 4,
      name: "Website Optimization",
      team: "Tech Team",
      attacks: 15,
      status: "completed",
      risk: "medium",
      targets: ["A", "B", "C"],
      lastActivity: "26 Oct, 2024"
    }
  ];

  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ field: "lastActivity", direction: "desc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [statusFilter, setStatusFilter] = useState("all");
  const [isHovered, setIsHovered] = useState(null);

  // Filter options
  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "active", label: "Active" },
    { value: "pending", label: "Pending" },
    { value: "completed", label: "Completed" }
  ];

  // Filtering logic
  const filteredCampaigns = allCampaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.team.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Sorting logic
  const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
    if (sortConfig.field === "attacks") {
      return sortConfig.direction === "asc" ? a.attacks - b.attacks : b.attacks - a.attacks;
    }
    return sortConfig.direction === "asc" 
      ? a[sortConfig.field].localeCompare(b[sortConfig.field])
      : b[sortConfig.field].localeCompare(a[sortConfig.field]);
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCampaigns = sortedCampaigns.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedCampaigns.length / itemsPerPage);

  // Handle sort
  const handleSort = (field) => {
    setSortConfig({
      field,
      direction: sortConfig.field === field && sortConfig.direction === "asc" ? "desc" : "asc"
    });
  };

  // Status badge styles
  const getStatusStyles = (status) => {
    const styles = {
      active: "bg-green-500/20 text-green-500",
      pending: "bg-yellow-500/20 text-yellow-500",
      completed: "bg-blue-500/20 text-blue-500"
    };
    return styles[status] || "";
  };

  // Risk level styles
  const getRiskStyles = (level) => {
    const styles = {
      high: "text-red-500",
      medium: "text-yellow-500",
      low: "text-green-500"
    };
    return styles[level] || "";
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <h2 className="text-gray-400 text-sm mr-2">Recent campaigns</h2>
          <ChevronRightIcon />
        </div>
        <div className="text-sm text-gray-400">
          Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, sortedCampaigns.length)} of {sortedCampaigns.length}
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <SearchIcon />
          </div>
          <Input
            type="text"
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          options={statusOptions}
          className="w-40"
        />
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-6 text-sm text-gray-400 pb-2 border-b border-gray-800">
        <div
          className="cursor-pointer flex items-center"
          onClick={() => handleSort("name")}
        >
          CAMPAIGN
          {sortConfig.field === "name" && (
            <span className="ml-1">
              <SortIcon direction={sortConfig.direction} />
            </span>
          )}
        </div>
        <div
          className="text-center cursor-pointer flex items-center justify-center"
          onClick={() => handleSort("attacks")}
        >
          ATTACKS
          {sortConfig.field === "attacks" && (
            <span className="ml-1">
              <SortIcon direction={sortConfig.direction} />
            </span>
          )}
        </div>
        <div className='text-center'>STATUS</div>
        <div>RISK</div>
        <div>TARGETS</div>
        <div className="text-right">LAST ACTIVITY</div>
      </div>

      {/* Campaign rows */}
      <div className="space-y-2">
        {currentCampaigns.map((campaign) => (
          <div 
            key={campaign.id}
            className={`grid grid-cols-6 items-center py-4 text-gray-200 rounded-lg cursor-pointer 
              transition-colors duration-150 ${isHovered === campaign.id ? 'bg-gray-800' : ''}`}
            onMouseEnter={() => setIsHovered(campaign.id)}
            onMouseLeave={() => setIsHovered(null)}
          >
            <div>
              <div className="font-medium">{campaign.name}</div>
              <div className="text-sm text-gray-400">{campaign.team}</div>
            </div>
            
            <div className="text-center font-mono">{campaign.attacks}</div>
            
            <div className='text-center'>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyles(campaign.status)}`}>
                {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
              </span>
            </div>

            <div>
              <span className={`text-sm font-medium ${getRiskStyles(campaign.risk)}`}>
                {campaign.risk.toUpperCase()}
              </span>
            </div>
            
            <div className="flex -space-x-1">
              {campaign.targets.slice(0, 4).map((target, idx) => (
                <div
                  key={idx}
                  className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center 
                    text-xs font-medium ring-2 ring-gray-900"
                >
                  {target}
                </div>
              ))}
              {campaign.targets.length > 4 && (
                <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center 
                  text-xs font-medium ring-2 ring-gray-900"
                >
                  +{campaign.targets.length - 4}
                </div>
              )}
            </div>

            <div className="text-right flex items-center justify-end">
              <span className="text-gray-400">{campaign.lastActivity}</span>
              <ChevronRightIcon className="ml-2 text-gray-600" />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <Button
          variant="outline"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="flex items-center"
        >
          <ChevronLeftIcon />
          <span className="ml-2">Previous</span>
        </Button>
        
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}
        </div>

        <Button
          variant="outline"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="flex items-center"
        >
          <span className="mr-2">Next</span>
          <ChevronRightIcon />
        </Button>
      </div>
    </div>
  );
};

export default CampaignList;