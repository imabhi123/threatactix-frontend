import React, { useEffect, useState } from 'react';

// Icon Components
const LoginIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
  </svg>
);

const LogoutIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

const PlanIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

const WarningIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

// Notification Component
const NotificationItem = ({ type, title, message, time, onDismiss }) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'login':
        return {
          background: 'bg-green-50',
          border: 'border-green-200',
          icon: 'text-green-500',
          title: 'text-green-800',
          message: 'text-green-700'
        };
      case 'logout':
        return {
          background: 'bg-gray-50',
          border: 'border-gray-200',
          icon: 'text-gray-500',
          title: 'text-gray-800',
          message: 'text-gray-700'
        };
      case 'plan-purchase':
        return {
          background: 'bg-blue-50',
          border: 'border-blue-200',
          icon: 'text-blue-500',
          title: 'text-blue-800',
          message: 'text-blue-700'
        };
      case 'plan-expiry-warning':
        return {
          background: 'bg-yellow-50',
          border: 'border-yellow-200',
          icon: 'text-yellow-500',
          title: 'text-yellow-800',
          message: 'text-yellow-700'
        };
      case 'plan-expired':
        return {
          background: 'bg-red-50',
          border: 'border-red-200',
          icon: 'text-red-500',
          title: 'text-red-800',
          message: 'text-red-700'
        };
      default:
        return {
          background: 'bg-gray-50',
          border: 'border-gray-200',
          icon: 'text-gray-500',
          title: 'text-gray-800',
          message: 'text-gray-700'
        };
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'login':
        return <LoginIcon className={`w-6 h-6 ${typeStyles.icon}`} />;
      case 'logout':
        return <LogoutIcon className={`w-6 h-6 ${typeStyles.icon}`} />;
      case 'plan-purchase':
        return <PlanIcon className={`w-6 h-6 ${typeStyles.icon}`} />;
      case 'plan-expiry-warning':
        return <WarningIcon className={`w-6 h-6 ${typeStyles.icon}`} />;
      case 'plan-expired':
        return <WarningIcon className={`w-6 h-6 ${typeStyles.icon}`} />;
      default:
        return null;
    }
  };



  const typeStyles = getTypeStyles();

  return (
    <div className={`relative flex items-start p-4 rounded-lg shadow-sm mb-4 ${typeStyles.background} ${typeStyles.border} border`}>
      <div className="flex-shrink-0 mr-4">
        {getIcon()}
      </div>
      <div className="flex-grow">
        <h3 className={`text-sm font-medium ${typeStyles.title}`}>{title}</h3>
        <p className={`text-sm ${typeStyles.message} mt-1`}>{message}</p>
        <p className={`text-xs ${typeStyles.message} opacity-70 mt-1`}>{time}</p>
      </div>
      <button 
        onClick={onDismiss} 
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 focus:outline-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

// Main Notifications Page
const NotificationPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'login',
      title: 'Successful Login',
      message: 'You have successfully logged in to your account.',
      time: '2 minutes ago'
    },
    {
      id: 2,
      type: 'plan-expiry-warning',
      title: 'Plan Expiry Warning',
      message: 'Your current plan will expire in 7 days. Renew now to continue enjoying full features.',
      time: '15 minutes ago'
    },
    {
      id: 3,
      type: 'plan-expired',
      title: 'Plan Expired',
      message: 'Your subscription has expired. Please upgrade to continue accessing all features.',
      time: '1 hour ago'
    },
    {
      id: 4,
      type: 'plan-purchase',
      title: 'Plan Upgraded',
      message: 'You have successfully upgraded to the Pro Plan. Enjoy all premium features!',
      time: '3 hours ago'
    },
    {
      id: 5,
      type: 'logout',
      title: 'Logged Out',
      message: 'You have been successfully logged out of your account.',
      time: '5 hours ago'
    }
  ]);

  const handleDismiss = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const fetchNotifications=async()=>{
    try {
      const response=await fetch('http://localhost:5000/api/v1/notification/me',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({userId:localStorage.getItem('userId')})
      })
      const resJson=await response.json();
      console.log(resJson);
      setNotifications(resJson?.notifications)
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    fetchNotifications();
    }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className=" mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 mr-3 text-gray-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              Notifications
              <span className="ml-3 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {notifications.length}
              </span>
            </h2>
          </div>
          <div className="p-6">
            {notifications.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-12 h-12 mx-auto mb-4 text-gray-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <p>No notifications</p>
              </div>
            ) : (
              notifications.map(notification => (
                <NotificationItem
                  key={notification.id}
                  {...notification}
                  onDismiss={() => handleDismiss(notification.id)}
                />
              ))
            )}
          </div>
          {notifications.length > 0 && (
            <div className="bg-gray-50 px-6 py-4 text-right">
              <button 
                onClick={() => setNotifications([])} 
                className="text-sm text-gray-600 hover:text-gray-800 font-medium"
              >
                Clear All Notifications
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;