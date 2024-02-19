import React, { createContext, useState, useEffect } from 'react';

export const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const [isLoadingTasks, setIsLoadingTasks] = useState(true);

  const contextValue = {}

  return (
    <AuthenticationContext.Provider value={contextValue}>
        {children}
    </AuthenticationContext.Provider>
  ) 
}