import React, { createContext, useState, ReactNode } from 'react';

type TabContextType = {
  activeTab: string;
  setActiveTab: (value: string) => void;
};

export const TabContext = createContext<TabContextType>({ activeTab: 'In Progress', setActiveTab: value => {} });

interface TabProviderProps {
  children: ReactNode;
}

export const TabProvider: React.FC<TabProviderProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState('In Progress');
  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
};
