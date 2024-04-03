import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import LandingPage from './components/LandingPage';
import Dashboard from './routes/dashboard';
import Activities from './routes/activities';
import Tasks from './routes/tasks';
import Statistics from './routes/statistics';
import Navigation from './components/Navigation';
import {DataProvider} from './context/DataContext';
import './App.css';

const DashboardRoutes: React.FC = () => {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="activities" element={<Activities />} />
      <Route path="tasks" element={<Tasks />} />
      <Route path="statistics" element={<Statistics />} />
    </Routes>
  );
};

const AnimatedDashboardRoutes: React.FC = () => {
  const location = useLocation();
  
  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="page" timeout={300} unmountOnExit>
        <DashboardRoutes />
      </CSSTransition>
    </TransitionGroup>
  );
};

const App: React.FC = () => {
  
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="dashboard/*" element={<><Navigation /><AnimatedDashboardRoutes /></>} />
        </Routes>
      </Router>
    </DataProvider>
  );
};

export default App;
