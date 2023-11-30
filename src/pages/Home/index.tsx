import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import ManagerServices from "../../services/manager";
import { AxiosError } from "axios";
import { useAppContext } from "../../context";


const Home = () => {
  const { id } = useParams();
  const { user } = useAppContext();

  useEffect(() => {
    const getPasswords = async () => {
      try {
        const response = await ManagerServices.getSiteCredentials(id as string);
        console.log(response);
      } catch (e) {
        const error = e as AxiosError;
        console.log(error);
      }
    };

    if (id) {
      getPasswords();
    }
  }, []);

  if (!user) return <Navigate to="/login" replace />

  return (
    <div>
    </div>
  );
};


export default Home;