import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CustomButton = ({ children, className, ...props }) => (
  <button
    className={`w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const CustomBadge = ({ children, className, ...props }) => (
  <span
    className={`inline-flex items-center rounded-md bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700 ${className}`}
    {...props}
  >
    {children}
  </span>
);

const PricingCard = () => {
  const [isYearly, setIsYearly] = useState(false);
  const navigate = useNavigate();
  const [promotion, setPromotion] = useState({});
  const [currentPlan,setCurrentPlan]=useState({})
  const [plans, setPlans] = useState([]);
  const userDetail=JSON.parse(localStorage.getItem('user'));
  console.log(userDetail,'---useer')

  const togglePricing = () => {
    setIsYearly(!isYearly);
  };

  const fetchCurrentPlan=async()=>{
    console.log(userDetail,'kjdslsd')
    try {
      const response=await fetch(`http://localhost:5000/api/v1/plans/${userDetail?.plan?.planId}`);
      const resJson=await response.json();
      setCurrentPlan(resJson.data);
      console.log(resJson);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(()=>{
    if(userDetail?.plan?.planId)fetchCurrentPlan();
  },[])

  const fetchPromotion = async () => {
    try {
    
        const response = await axios.get(
          "http://localhost:5000/api/v1/promo/promocodes"
        );
        console.log(response.data, "promo");
        const newPromo = response.data[0];
        setPromotion(newPromo);
    } catch (error) {
      console.error("Failed to fetch promotion", error);
    }
  };

  useEffect(() => {
    const fetchPlans = async () => {
      try {
          const cachedPlans = localStorage.getItem('plans');
          const cachedPlansTimestamp = localStorage.getItem('plansTimestamp');
          const cacheDuration = 60 * 60 * 1000; // 1 hour in milliseconds

          if (cachedPlans && cachedPlansTimestamp) {
              const isCacheValid = Date.now() - parseInt(cachedPlansTimestamp, 10) < cacheDuration;

              if (isCacheValid) {
                  console.log('Using cached plans data');
                  setPlans(JSON.parse(cachedPlans));
                  return;
              }
          }

          console.log('Fetching new plans data...');
          const response = await fetch(
              'http://localhost:5000/api/v1/plans',
              { method: 'GET' }
          );
          const resJson = await response.json();
          setPlans(resJson);

          localStorage.setItem('plans', JSON.stringify(resJson));
          localStorage.setItem('plansTimestamp', Date.now().toString());
      } catch (error) {
          console.error('Error fetching plans:', error);
      }
  };

  fetchPromotion();
  fetchPlans();
  }, []);

  const filteredPlans = plans.filter((plan) =>
    isYearly ? plan.duration === "yearly" : plan.duration === "monthly"
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Unlock the power of advanced threat intelligence
          </p>
          <div className="flex justify-center items-center space-x-4 mb-12">
            <span className="text-gray-900 dark:text-gray-300 font-medium">
              Monthly
            </span>
            <label className="switch">
              <input
                type="checkbox"
                checked={isYearly}
                onChange={togglePricing}
              />
              <span className="slider round"></span>
            </label>
            <span className="text-gray-900 dark:text-gray-300 font-medium">
              Yearly
            </span>
            <CustomBadge className="ml-2">Save up to 20%</CustomBadge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredPlans.map((plan) => (
            <motion.div
              key={plan._id}
              className="bg-white dark:bg-gray-800 bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl overflow-hidden shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-8 flex min-h-full flex-col">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {plan.name}
                </h3>
                <div className="text-4xl font-bold text-purple-600 dark:text-purple-300 mb-6">
                  ${plan.price}
                  <span className="text-lg font-normal text-gray-500 dark:text-gray-400">
                    /{plan.duration}
                  </span>
                </div>
                <ul className="text-gray-700 dark:text-gray-400 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center mb-3">
                      <svg
                        className="min-w-5 max-w-5 min-h-5 max-h-5 mr-2 text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <CustomButton
                  onClick={() =>
                    navigate("/checkout", {
                      state: {
                        promo: promotion,
                        pricing: plan.price,
                        features: plan.features,
                        duration: plan.duration,
                        plan,
                      },
                    })
                  }
                  className={"mt-auto"}
                >
                  {`${plan.price>currentPlan.price?'Upgrade Plan':plan.price<currentPlan.price?'Upgrade Plan':'Renew Plan'}`}
                </CustomButton>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .switch {
          position: relative;
          display: inline-block;
          width: 60px;
          height: 34px;
        }
        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: 0.4s;
        }
        .slider:before {
          position: absolute;
          content: "";
          height: 26px;
          width: 26px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: 0.4s;
        }
        input:checked + .slider {
          background-color: #2196f3;
        }
        input:checked + .slider:before {
          transform: translateX(26px);
        }
        .slider.round {
          border-radius: 34px;
        }
        .slider.round:before {
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
};

export default PricingCard;
