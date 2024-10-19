import React from 'react';
import { ChevronRight } from 'lucide-react';

const DynamicTable = ({ headers, data }) => {
  return (
    <div className="bg-gray-900 text-gray-200 p-4 rounded-lg">
      <table className="w-full">
        <thead>
          <tr className="text-left text-gray-500 border-b border-gray-700">
            {headers.map((header, index) => (
              <th key={index} className="pb-2 font-medium uppercase text-xs">
                {header}
              </th>
            ))}
            <th className="pb-2"></th> {/* Empty header for the chevron column */}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-gray-800 hover:bg-gray-800">
              {headers.map((header, colIndex) => (
                <td key={colIndex} className="py-4">
                  {colIndex === 0 && (
                    <span className="inline-block w-6 h-6 rounded-full bg-blue-500 text-white text-center mr-2">
                      {rowIndex + 1}
                    </span>
                  )}
                  {row[header]}
                </td>
              ))}
              <td className="py-4 text-right">
                <ChevronRight className="inline-block text-gray-500" size={20} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Example usage
const ExampleTable = () => {
  const headers = ['VICTIMS', 'INDUSTRY', 'COUNTRY', 'LAST INCIDENT'];
  const data = [
    {
      VICTIMS: 'Courtney Construction',
      INDUSTRY: 'Oil & Gas',
      COUNTRY: 'USA',
      'LAST INCIDENT': 'Oct 15, 2024'
    },
    {
      VICTIMS: 'Byerly Aviation',
      INDUSTRY: 'Aviation & Aerospace',
      COUNTRY: 'USA',
      'LAST INCIDENT': 'Oct 15, 2024'
    },
    // ... add more rows as needed
  ];

  return <DynamicTable headers={headers} data={data} />;
};

export default DynamicTable;