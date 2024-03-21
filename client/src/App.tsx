import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './views/Dashboard';
import Tasks from './views/Tasks';
import Activities from './views/Activities';
import Statistics from './views/Statistics';
import { DataProvider } from './context/DataContext';

function App() {
  return (
    <DataProvider>
    <Router>
      <div>
        <Navbar />
        <div className="p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/statistics" element={<Statistics />} />
          </Routes>
        </div>
      </div>
    </Router>
    </DataProvider>
  );
}

export default App;
