import React, { createContext, useState, useEffect } from 'react'

export const EditContext = createContext()

export const EditProvider = ({ children }) => {
  const [edit, setEdit] = useState(false)
  const [account, setAccount] = useState(true)

  const editTask = ()=> {
    setEdit(true);
  };

  const noEdit = ()=> {
    setEdit(false);
  };

  const accountView = ()=> {
    setAccount(true);
  };

  const noAccount = ()=> {
    setAccount(false);
  };
 
  const contextValue = {
    editTask,
    noEdit,
    accountView,
    noAccount,
    account,
    edit
  }

  return (
    <EditContext.Provider value={contextValue}>
      {children}
    </EditContext.Provider>
  )
}
