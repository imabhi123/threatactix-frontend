import React, { createContext, useState, useContext, useCallback } from 'react';

// Notification Types
export const NotificationTypes = {
  LOGIN: 'login',
  LOGOUT: 'logout',
  PLAN_PURCHASE: 'plan-purchase',
  PLAN_EXPIRY_WARNING: 'plan-expiry-warning',
  PLAN_EXPIRED: 'plan-expired'
};

// Notification Context
const NotificationContext = createContext(null);

// Notification Provider Component
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // Add a new notification
  const addNotification = useCallback((notification) => {
    const newNotification = {
      ...notification,
      id: Date.now(), // Unique ID
      time: new Date().toLocaleString() // Current timestamp
    };
    setNotifications(prevNotifications => [newNotification, ...prevNotifications]);
  }, []);

  // Remove a specific notification
  const removeNotification = useCallback((id) => {
    setNotifications(prevNotifications => 
      prevNotifications.filter(notification => notification.id !== id)
    );
  }, []);

  // Clear all notifications
  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // Context value
  const contextValue = {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

// Custom hook to use notification context
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

// Notification Item Component
export const NotificationItem = ({ type, title, message, time, onDismiss }) => {
  const getTypeStyles = () => {
    switch (type) {
      case NotificationTypes.LOGIN:
        return {
          background: 'bg-green-50',
          border: 'border-green-200',
          icon: 'text-green-500',
          title: 'text-green-800',
          message: 'text-green-700'
        };
      case NotificationTypes.LOGOUT:
        return {
          background: 'bg-gray-50',
          border: 'border-gray-200',
          icon: 'text-gray-500',
          title: 'text-gray-800',
          message: 'text-gray-700'
        };
      case NotificationTypes.PLAN_PURCHASE:
        return {
          background: 'bg-blue-50',
          border: 'border-blue-200',
          icon: 'text-blue-500',
          title: 'text-blue-800',
          message: 'text-blue-700'
        };
      case NotificationTypes.PLAN_EXPIRY_WARNING:
        return {
          background: 'bg-yellow-50',
          border: 'border-yellow-200',
          icon: 'text-yellow-500',
          title: 'text-yellow-800',
          message: 'text-yellow-700'
        };
      case NotificationTypes.PLAN_EXPIRED:
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
      case NotificationTypes.LOGIN:
        return <LoginIcon className={`w-6 h-6 ${typeStyles.icon}`} />;
      case NotificationTypes.LOGOUT:
        return <LogoutIcon className={`w-6 h-6 ${typeStyles.icon}`} />;
      case NotificationTypes.PLAN_PURCHASE:
        return <PlanIcon className={`w-6 h-6 ${typeStyles.icon}`} />;
      case NotificationTypes.PLAN_EXPIRY_WARNING:
        return <WarningIcon className={`w-6 h-6 ${typeStyles.icon}`} />;
      case NotificationTypes.PLAN_EXPIRED:
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
        <XIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

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

const XIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// Notifications Page Component
export const NotificationPage = () => {
  const { notifications, removeNotification, clearNotifications } = useNotification();

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
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
                  onDismiss={() => removeNotification(notification.id)}
                />
              ))
            )}
          </div>
          {notifications.length > 0 && (
            <div className="bg-gray-50 px-6 py-4 text-right">
              <button 
                onClick={clearNotifications} 
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


// Example of how to trigger notifications in other components
export const ExampleComponent = () => {
  const { addNotification } = useNotification();

  const handleLogin = () => {
    // Simulating a login action
    addNotification({
      type: NotificationTypes.LOGIN,
      title: 'Successful Login',
      message: 'You have successfully logged in to your account.'
    });
  };

  const handlePlanPurchase = () => {
    // Simulating a plan purchase action
    addNotification({
      type: NotificationTypes.PLAN_PURCHASE,
      title: 'Plan Upgraded',
      message: 'You have successfully upgraded to the Pro Plan.'
    });
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handlePlanPurchase}>Upgrade Plan</button>
    </div>
  );
};

export default NotificationPage;