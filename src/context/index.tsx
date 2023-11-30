import React, { useEffect, useState } from 'react';
import UserService from '../services/user';
import ManagerServices from '../services/manager';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

type AppContext = {
  user?: any;
  loading: boolean;
  isNewCredentialDialogOpen: boolean;
  credentials: SiteCredential[];
  handleOpenDialog: () => void;
  handleCloseDialog: () => void;
  getCredentials: (id: string) => void;
}

const UserContext = React.createContext({} as AppContext);

const AppProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [credentials, setCredentials] = useState<SiteCredential[]>([]);
  const [isNewCredentialDialogOpen, setIsNewCredentialDialogOpen] = useState<boolean>(false);

  const handleOpenDialog = () => setIsNewCredentialDialogOpen(true);
  const handleCloseDialog = () => setIsNewCredentialDialogOpen(false);

  const getCredentials = async (id: string) => {
    try {
      const response = await ManagerServices.getSiteCredentials(id);
      if (response.status === 200) {
        setCredentials(response.data);
      }
      return response;
    } catch (e) {
      const error = e as AxiosError;
      console.log(error);
      toast.error("Ocorreu um erro ao obter as credenciais. Tente novamente.")
    } finally {
      setLoading(false);
    }
  };

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
        loading,
        credentials,
        isNewCredentialDialogOpen,
        handleOpenDialog,
        handleCloseDialog,
        getCredentials
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
