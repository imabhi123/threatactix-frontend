import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Shield, Calendar, CheckCircle } from 'lucide-react';

const ProfilePage = () => {
  const [planDetails, setPlanDetails] = useState({});
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user)

  const fetchPlanDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/plans/${user.plan.planId}`);
      console.log(response.data);
      setPlanDetails(response.data.data);
    } catch (error) {
      console.error('Error fetching plan details:', error);
    }
  };

  useEffect(() => {
    fetchPlanDetail();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Profile Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 shadow-xl">
          <div className="relative flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-4xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 text-transparent bg-clip-text">
                {user.firstName[0]}{user.lastName[0]}
              </span>
            </div>
            <div className="text-white">
              <h1 className="text-3xl font-bold mb-2">{user.firstName} {user.lastName}</h1>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                  <Shield className="w-4 h-4 mr-2" />
                  <span className="text-sm">{user.email}</span>
                </div>
                {user.status && (
                  <div className="flex items-center bg-green-500 rounded-full px-4 py-2">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">Active</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Plan Details Card */}
        {planDetails && Object.keys(planDetails).length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-purple-100 rounded-xl mr-4">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{planDetails.name} Plan</h2>
                  <p className="text-gray-600">{planDetails.description}</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
                    <span className="text-gray-700">Price</span>
                    <span className="font-semibold text-purple-600">${planDetails.price}/month</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                    <span className="text-gray-700">Billing Cycle</span>
                    <span className="font-semibold text-blue-600 capitalize">{planDetails.duration}</span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold mb-3 text-gray-800">Features</h3>
                  <ul className="space-y-2">
                    {planDetails.features?.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Account Details */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-blue-100 rounded-xl mr-4">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Account Details</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-blue-50 rounded-xl">
                  <Calendar className="w-5 h-5 mr-3 text-blue-600" />
                  <span className="text-gray-700">Member since: {formatDate(user.createdAt)}</span>
                </div>
                <div className="flex items-center p-4 bg-purple-50 rounded-xl">
                  <Shield className="w-5 h-5 mr-3 text-purple-600" />
                  <span className="text-gray-700">Plan ID: {user.plan.planId}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Business Details */}
          {user.payments && user.payments[0] && (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-purple-100 rounded-xl mr-4">
                    <Shield className="w-6 h-6 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Business Details</h2>
                </div>
                <div className="space-y-4">
                  {[
                    { label: 'Name', value: user.payments[0].fullName },
                    { label: 'Email', value: user.payments[0].email },
                    { label: 'Phone', value: user.payments[0].phone },
                    { label: 'Location', value: `${user.payments[0].city} - ${user.payments[0].pincode}` }
                  ].map((detail, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">{detail.label}</span>
                        <span className="font-medium text-gray-800">{detail.value}</span>
                      </div>
                    </div>
                  ))}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">GST Number</span>
                      <span className="font-medium bg-purple-100 px-4 py-2 rounded-full text-purple-700">
                        {user.payments[0].gst}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Last Updated */}
        <div className="text-center">
          <span className="inline-block px-6 py-2 bg-white rounded-full text-sm text-gray-600 shadow-sm">
            Last updated: {formatDate(user.updatedAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;