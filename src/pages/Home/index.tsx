import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ManagerServices from "../../services/manager";
import { AxiosError } from "axios";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextInput from "../../components/TextInput";
import ConfirmButton from "../../components/ConfirmButton";

const Home = () => {
  const { id = "" } = useParams();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [credentialsForm, setCredentialsForm] = useState<SiteCredentials>({});

  const handleOpenDialog = () => setIsOpen(true);
  const handleCloseDialog = () => setIsOpen(false);

  const handleCredentialsForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentialsForm(currState => {
      return { ...currState, [event.target.name]: event.target.value };
    })
  };

  const createCredential = async () => {
    try {
      const response = await ManagerServices.storeSiteCredentials({ id, ...credentialsForm });
      console.log(response);
    } catch (e) {
      const error = e as AxiosError;
      console.log(error);
    }
    
  }

  useEffect(() => {
    const getPasswords = async () => {
      try {
        const response = await ManagerServices.getSiteCredentials(id || '');
        console.log(response);
      } catch (e) {
        const error = e as AxiosError;
        console.log(error);
      }
    };

    if (id)
      getPasswords();
  }, []);

  return (
    <div>
      <button onClick={handleOpenDialog}>Adicionar Nova Senha</button>
      <div>

      </div>
      <Dialog open={isOpen} onClose={handleCloseDialog}>
        <DialogTitle>Cadastre um Novo Site</DialogTitle>
        <DialogContent>
          <TextInput
            name="name"
            label="Nome do Site"
            placeholder="Insira o Nome do Site"
            value={credentialsForm.name || ""}
            onChange={handleCredentialsForm}
          />
          <TextInput
            name="username"
            label="Nome de Usuário"
            placeholder="Insira o Nome de Usuário"
            value={credentialsForm.username || ""}
            onChange={handleCredentialsForm}
          />
          <TextInput
            name="email"
            label="Email"
            placeholder="Insira o Email"
            value={credentialsForm.email || ""}
            onChange={handleCredentialsForm}
          />
          <TextInput
            name="password"
            label="Senha"
            placeholder="Insira a Senha do site"
            value={credentialsForm.password || ""}
            onChange={handleCredentialsForm}
          />
          <TextInput
            name="url"
            label="URL"
            placeholder="Insira a URL do site"
            value={credentialsForm.url || ""}
            onChange={handleCredentialsForm}
          />
        </DialogContent>
        <DialogActions>
          <ConfirmButton 
            text="Adicionar" 
            onClick={createCredential} 
            disabled={!credentialsForm.name || !(credentialsForm.email || credentialsForm.username) || !credentialsForm.password} 
          />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Home;