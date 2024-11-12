import React, { useEffect, useState } from "react";
import { WorldMap } from "react-svg-worldmap";
import "leaflet/dist/leaflet.css";

const WorldMapComponent = () => {
  const [countriesData, setCountriesData] = useState([]);
  const [stats, setStats] = useState({
    totalAttacks: 0,
    activeThreats: 0,
    affectedCountries: 0,
    targetedIndustries: 0,
  });

  function getCountryCounts(data) {
    const countryCounts = {};

    data.forEach((item) => {
      item.data.forEach((incident) => {
       
        const country = incident.row.victims_country; console.log(country);

        if (countryCounts[country]) {
          countryCounts[country]++;
        } else {
          countryCounts[country] = 1;
        }
      });
    });

    // Transform the countryCounts object into an array of objects
    return Object.keys(countryCounts).map((country) => ({
      name: country,
      count: countryCounts[country],
    }));
  }

  const fetchStats = async () => {
    try {
      // Fetch attack trend data
      const attackTrendResponse = await fetch(
        "http://localhost:5000/api/v1/incident/incidents"
      );
      const attackTrendData = await attackTrendResponse.json();
      setStats((prev) => ({
        ...prev,
        totalAttacks: attackTrendData?.data?.length,
      }));
      console.log(getCountryCounts(attackTrendData?.data))

      setCountriesData(getCountryCounts(attackTrendData?.data));

      // Fetch most affected countries
      const countriesResponse = await fetch(
        "http://localhost:5000/api/v1/incident/incidents/getMostAffectedCountries",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            startDate: "2023-01-01",
            endDate: "2024-10-18",
          }),
        }
      );
      const countriesData = await countriesResponse.json();
      // console.log(countriesData, "-->abhishekkkkk");
      setCountriesData(countriesData);
      setStats((prev) => ({
        ...prev,
        affectedCountries: countriesData.length,
      }));

      // Fetch most targeted industries
      const industriesResponse = await fetch(
        "http://localhost:5000/api/v1/incident/incidents/getMostTargetedIndustries",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            startDate: "2023-01-01",
            endDate: "2024-10-18",
          }),
        }
      );
      const industriesData = await industriesResponse.json();
      setStats((prev) => ({
        ...prev,
        targetedIndustries: industriesData.length,
      }));
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  const countries = {
    AF: "Afghanistan",
    AL: "Albania",
    DZ: "Algeria",
    AS: "American Samoa",
    AD: "Andorra",
    AO: "Angola",
    AI: "Anguilla",
    AQ: "Antarctica",
    AG: "Antigua and Barbuda",
    AR: "Argentina",
    AM: "Armenia",
    AW: "Aruba",
    AU: "Australia",
    AT: "Austria",
    AZ: "Azerbaijan",
    BS: "Bahamas",
    BH: "Bahrain",
    BD: "Bangladesh",
    BB: "Barbados",
    BY: "Belarus",
    BE: "Belgium",
    BZ: "Belize",
    BJ: "Benin",
    BM: "Bermuda",
    BT: "Bhutan",
    BO: "Bolivia",
    BA: "Bosnia and Herzegovina",
    BW: "Botswana",
    BR: "Brazil",
    IO: "British Indian Ocean Territory",
    BN: "Brunei Darussalam",
    BG: "Bulgaria",
    BF: "Burkina Faso",
    BI: "Burundi",
    KH: "Cambodia",
    CM: "Cameroon",
    CA: "Canada",
    CV: "Cape Verde",
    KY: "Cayman Islands",
    CF: "Central African Republic",
    TD: "Chad",
    CL: "Chile",
    CN: "China",
    CO: "Colombia",
    KM: "Comoros",
    CG: "Congo",
    CD: "Congo, Democratic Republic",
    CR: "Costa Rica",
    CI: "Côte d'Ivoire",
    HR: "Croatia",
    CU: "Cuba",
    CY: "Cyprus",
    CZ: "Czech Republic",
    DK: "Denmark",
    DJ: "Djibouti",
    DM: "Dominica",
    DO: "Dominican Republic",
    EC: "Ecuador",
    EG: "Egypt",
    SV: "El Salvador",
    GQ: "Equatorial Guinea",
    ER: "Eritrea",
    EE: "Estonia",
    ET: "Ethiopia",
    FJ: "Fiji",
    FI: "Finland",
    FR: "France",
    GA: "Gabon",
    GM: "Gambia",
    GE: "Georgia",
    DE: "Germany",
    GH: "Ghana",
    GR: "Greece",
    GD: "Grenada",
    GU: "Guam",
    GT: "Guatemala",
    GN: "Guinea",
    GW: "Guinea-Bissau",
    GY: "Guyana",
    HT: "Haiti",
    HN: "Honduras",
    HU: "Hungary",
    IS: "Iceland",
    IN: "India",
    ID: "Indonesia",
    IR: "Iran",
    IQ: "Iraq",
    IE: "Ireland",
    IL: "Israel",
    IT: "Italy",
    JM: "Jamaica",
    JP: "Japan",
    JO: "Jordan",
    KZ: "Kazakhstan",
    KE: "Kenya",
    KI: "Kiribati",
    KP: "North Korea",
    KR: "South Korea",
    KW: "Kuwait",
    KG: "Kyrgyzstan",
    LA: "Lao People's Democratic Republic",
    LV: "Latvia",
    LB: "Lebanon",
    LS: "Lesotho",
    LR: "Liberia",
    LY: "Libya",
    LI: "Liechtenstein",
    LT: "Lithuania",
    LU: "Luxembourg",
    MG: "Madagascar",
    MW: "Malawi",
    MY: "Malaysia",
    MV: "Maldives",
    ML: "Mali",
    MT: "Malta",
    MH: "Marshall Islands",
    MR: "Mauritania",
    MU: "Mauritius",
    MX: "Mexico",
    FM: "Micronesia",
    MD: "Moldova",
    MC: "Monaco",
    MN: "Mongolia",
    ME: "Montenegro",
    MA: "Morocco",
    MZ: "Mozambique",
    MM: "Myanmar",
    NA: "Namibia",
    NR: "Nauru",
    NP: "Nepal",
    NL: "Netherlands",
    NZ: "New Zealand",
    NI: "Nicaragua",
    NE: "Niger",
    NG: "Nigeria",
    NO: "Norway",
    OM: "Oman",
    PK: "Pakistan",
    PW: "Palau",
    PA: "Panama",
    PG: "Papua New Guinea",
    PY: "Paraguay",
    PE: "Peru",
    PH: "Philippines",
    PL: "Poland",
    PT: "Portugal",
    QA: "Qatar",
    RO: "Romania",
    RU: "Russia",
    RW: "Rwanda",
    KN: "Saint Kitts and Nevis",
    LC: "Saint Lucia",
    VC: "Saint Vincent and the Grenadines",
    WS: "Samoa",
    SM: "San Marino",
    ST: "Sao Tome and Principe",
    SA: "Saudi Arabia",
    SN: "Senegal",
    RS: "Serbia",
    SC: "Seychelles",
    SL: "Sierra Leone",
    SG: "Singapore",
    SK: "Slovakia",
    SI: "Slovenia",
    SB: "Solomon Islands",
    SO: "Somalia",
    ZA: "South Africa",
    ES: "Spain",
    LK: "Sri Lanka",
    SD: "Sudan",
    SR: "Suriname",
    SZ: "Eswatini",
    SE: "Sweden",
    CH: "Switzerland",
    SY: "Syria",
    TW: "Taiwan",
    TJ: "Tajikistan",
    TZ: "Tanzania",
    TH: "Thailand",
    TL: "Timor-Leste",
    TG: "Togo",
    TO: "Tonga",
    TT: "Trinidad and Tobago",
    TN: "Tunisia",
    TR: "Turkey",
    TM: "Turkmenistan",
    TV: "Tuvalu",
    UG: "Uganda",
    UA: "Ukraine",
    AE: "United Arab Emirates",
    GB: "United Kingdom",
    USA: "US",
    UY: "Uruguay",
    UZ: "Uzbekistan",
    VU: "Vanuatu",
    VA: "Vatican City",
    VE: "Venezuela",
    VN: "Vietnam",
    YE: "Yemen",
    ZM: "Zambia",
    ZW: "Zimbabwe",
  };

  const countryToCode = Object.fromEntries(
    Object.entries(countries).map(([code, country]) => [country, code])
  );

  const getStyle = ({
    countryValue,
    countryCode,
    minValue,
    maxValue,
    color,
  }) => ({
    fill: countryCode === "US" ? "blue" : "red",
    fillOpacity: countryValue
      ? 0.1 + (1.5 * (countryValue - minValue)) / (maxValue - minValue)
      : 0,
    stroke: "green",
    strokeWidth: 1,
    strokeOpacity: 0.2,
    cursor: "pointer",
  });

  function getFlagEmoji(countryCode) {
    // console.log(countryCode)
    return countryCode
      .toUpperCase()
      .replace(/./g, (char) =>
        String.fromCodePoint(127397 + char.charCodeAt())
      );
  }

  // Create the new object with country name, code, and flag
  const countriesWithFlags = Object.entries(countries).map(([code, name]) => ({
    countryName: name,
    countryCode: code,
    flag: getFlagEmoji(code),
  }));

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 py-6  rounded-lg text-black dark:text-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Most affected nations</h2>
        <select className="dark:bg-gray-800 bg-gray-100 text-sm rounded px-2 py-1">
          <option>Last 24 hours</option>
        </select>
      </div>

      <div className="h-full  p-8 px-0 md:px-8 pb-4 mb-8 bg-white dark:bg-gray-900">
        <WorldMap
          // styleFunction={getStyle}
          color="red"
          title="Top 10 Populous Countries"
          value-suffix="people"
          size="responsive"
          className="p-4 bg-black"
          data={countriesData
            .filter((country) => country?.name) // Filter out items without a valid country code
            .map((country) => {
              let indexx = country?.name === "USA" ? "US" : country?.name;
              return countryToCode[indexx] !== undefined
                ? {
                    country:
                      countryToCode[indexx] === "USA"
                        ? "US"
                        : countryToCode[indexx].toLowerCase(), // Convert to lowercase for WorldMap compatibility
                    value: country?.count, // Using 'count' as the value for the map
                  }
                : { country: "", value: "" };
            })}
        />
      </div>

      <div className="space-y-2 pl-8 w-full md:w-[50%]">
        {countriesData?.map((item) => (
          <div key={item.country} className="flex items-center text-sm">
            <span className="w-6 mr-2">
              {countryToCode[item?.name]
                ? getFlagEmoji(countryToCode[item?.name])
                : getFlagEmoji("US")}
            </span>
            <span className="w-20">{item?.name}</span>
            <div className="flex-grow">
              <div className="h-1 bg-gray-700 rounded-full">
                <div
                  className="h-full bg-red-500 rounded-full"
                  style={{ width: `${item.value}%` }}
                ></div>
              </div>
            </div>
            <span className="w-8 text-right">{item.value}</span>
            <span className="w-8 text-right text-gray-500">({item.count})</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorldMapComponent;
