import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextInput from "../../components/TextInput";
import ConfirmButton from "../../components/ConfirmButton";

import ManagerServices from '../../services/manager';
import { AxiosError } from 'axios';
import { useAppContext } from '../../context';
import { Button } from '@mui/material';
import { CredentialFormContainer } from './style';
import { toast } from 'react-toastify';
import { useMatch } from 'react-router';

const NewCredentialDialog = () => {
  const match = useMatch("/:id");

  const { user, isNewCredentialDialogOpen, handleCloseDialog, getCredentials } = useAppContext();

  const [credentialsForm, setCredentialsForm] = useState<SiteCredentials>({});

  const handleCredentialsForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentialsForm(currState => {
      return { ...currState, [event.target.name]: event.target.value };
    })
  };

  const createCredential = async () => {
    try {
      let url = credentialsForm.url;
      if (url && !url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
      }

      const data: CreateSiteCredential = {
        id: user.id,
        url,
        name: credentialsForm.name,
        username: credentialsForm.username,
        email: credentialsForm.email,
        password: credentialsForm.password
      };

      const response = await ManagerServices.storeSiteCredentials(data);
      if (response.status === 201) {
        toast.success("Credencial cadastrada com sucesso!");
        setCredentialsForm({});
        handleCloseDialog();

        if (match && match.params && match.params.id) {
          getCredentials(match.params.id);
        }
      }
    } catch (e) {
      const error = e as AxiosError;
      console.error(error);
      toast.error("Ocorreu um erro ao realizar o cadastro da credencial.");
    }
  };

  const isValid = (): boolean => {
    return !credentialsForm.name || !(credentialsForm.email || credentialsForm.username) || !credentialsForm.password;
  };

  return (
    <Dialog open={isNewCredentialDialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
      <DialogTitle>Cadastre um Novo Site</DialogTitle>
      <DialogContent>
        <CredentialFormContainer>
          <TextInput
            name="name"
            type="text"
            label="Nome do Site"
            placeholder="Insira o Nome do Site"
            value={credentialsForm.name || ""}
            onChange={handleCredentialsForm}
          />
          <TextInput
            name="username"
            type="text"
            label="Nome de Usuário"
            placeholder="Insira o Nome de Usuário"
            value={credentialsForm.username || ""}
            onChange={handleCredentialsForm}
          />
          <TextInput
            name="email"
            type="email"
            label="Email"
            placeholder="Insira o Email"
            value={credentialsForm.email || ""}
            onChange={handleCredentialsForm}
          />
          <TextInput
            name="password"
            type="password"
            label="Senha"
            isRequired
            placeholder="Insira a Senha do site"
            value={credentialsForm.password || ""}
            onChange={handleCredentialsForm}
          />
          <TextInput
            name="url"
            type="url"
            label="URL"
            placeholder="Insira a URL do site"
            value={credentialsForm.url || ""}
            onChange={handleCredentialsForm}
          />
        </CredentialFormContainer>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={createCredential} disabled={isValid()}>
          Adicionar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default NewCredentialDialog;