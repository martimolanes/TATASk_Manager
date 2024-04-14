import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <img className="mx-auto h-24 w-auto" src="../favicon.png" alt="Activity App" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Welcome to Activity App
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          An application that helps you track and manage your daily activities.
        </p>
        <div className="mt-5">
          <a 
            onClick={handleGetStartedClick}
            className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer">
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
