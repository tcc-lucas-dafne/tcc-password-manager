import React, { useEffect, useState } from 'react';
import UserService from '../services/user';

type AppContext = {
  isNewCredentialDialogOpen: boolean;
  handleOpenDialog: () => void;
  handleCloseDialog: () => void;
  user?: any;
}

const UserContext = React.createContext({} as AppContext);

const AppProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<any>();
  const [isNewCredentialDialogOpen, setIsNewCredentialDialogOpen] = useState<boolean>(false);

  const handleOpenDialog = () => setIsNewCredentialDialogOpen(true);
  const handleCloseDialog = () => setIsNewCredentialDialogOpen(false);

  useEffect(() => {
    const getUser = async () => {
      if (localStorage && localStorage.getItem("token")) {
        try {
          const response = await UserService.getUser();
          if (response.status === 200) {
            setUser(response.data);
          }
        } catch (err) {
          console.error(err);
        }
      } else {
        setUser(null);
      }
    }

    getUser();
  }, []);

  return (
    <UserContext.Provider 
      value={{ 
        user, 
        isNewCredentialDialogOpen,
        handleOpenDialog,
        handleCloseDialog
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default AppProvider;

export function useAppContext() {
  const Context = React.useContext(UserContext);
  return { ...Context };
}
