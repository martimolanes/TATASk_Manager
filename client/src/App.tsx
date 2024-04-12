import React, { ReactNode } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import LandingPage from './components/LandingPage';
import Dashboard from './routes/dashboard';
import Activities from './routes/activities';
import Tasks from './routes/tasks';
import Statistics from './routes/statistics';
import Navigation from './components/Navigation';
import {DataProvider} from './context/DataContext';
import './App.css';
import { TabProvider } from './context/TabContext';

const routeTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const Layout = ({children}: {children: ReactNode}) => {
  const location = useLocation();
  return (
    <motion.div key={location.pathname} {...routeTransition}>
      {children}
    </motion.div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <div>
      {location.pathname !== "/" && <Navigation />}
      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.key}>
          <Route path="/" element={<Layout><LandingPage /></Layout>} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/dashboard/activities" element={<Layout><Activities /></Layout>} />
          <Route path="/dashboard/tasks" element={<Layout><TabProvider><Tasks /></TabProvider></Layout>} />
          <Route path="/dashboard/statistics" element={<Layout><Statistics /></Layout>} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <DataProvider>
      <Router>
        <AnimatedRoutes />
      </Router>
    </DataProvider>
  );
};

export default App;
