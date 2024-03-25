import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import LandingPage from './components/LandingPage';
import Dashboard from './routes/Dashboard';
import Tasks from './routes/Tasks';
import Activities from './routes/Activities';
import Statistics from './routes/Statistics';
import Navigation from './components/Navigation';
import { DataProvider } from './context/DataContext';
import './App.css';

const App: React.FC = () => {
  return (
    <DataProvider>
      <Router>
        <RoutesWithTransition />
      </Router>
    </DataProvider>
  );
};

const RoutesWithTransition: React.FC = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/' && <Navigation />}
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="page" timeout={300}>
          <Routes location={location}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/statistics" element={<Statistics />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </>
  );
};

export default App;
