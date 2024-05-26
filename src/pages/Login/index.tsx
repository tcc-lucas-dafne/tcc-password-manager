import { useState } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import ConfirmButton from "../../components/ConfirmButton";
import LoginInput from "../../components/LoginInput";
import UserService from "../../services/user";
import PasswordInput from "../../components/PasswordInput";
import { AxiosError } from "axios";
import { toast } from 'react-toastify';

import { 
  Container, 
  FormContainer, 
  Label, 
  FieldContainer,
  SiteName
} from "./style";
import { useAppContext } from "../../context";
import { Navigate } from "react-router";
import { Button } from "@mui/material";

const Login = () => {
  const { user } = useAppContext();

  const [loginForm, setLoginForm] = useState<Login>({ email: "", password: "" });

  const handleLoginForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm(currState => {
      return { ...currState, [event.target.name]: event.target.value };
    })
  }

  const loginUser = async (event: any) => {
    event.preventDefault();
    const data: Login = {
      email: loginForm.email,
      password: loginForm.password
    };

    try {
      const response = await UserService.login(data);
      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem("token", data.token);
        window.location.reload();
      }
    } catch (e) {
      const error = e as AxiosError;
      if (error.response && error.response.data) {
        const errorMessage = (error.response.data as ResponseError).error;
        if (errorMessage) {
          toast.error(errorMessage)
        }
      } else {
        toast.error("Ocorreu um erro ao realizar o login.");
      }
    }
  }

  if (user?.id) return <Navigate to="/" replace />

  return (
    <Container>
      <FormContainer onSubmit={loginUser}>
        <SiteName>Gerenciador de Senhas</SiteName>
        <FieldContainer>
          <LoginInput 
            name="email" 
            type="email"
            label="Email"
            placeholder="Insira seu Email"
            value={loginForm.email} 
            onChange={handleLoginForm} 
          />
        </FieldContainer>
        <FieldContainer>
          <LoginInput 
            name="password"
            type="password"
            label="Senha" 
            placeholder="Insira sua Senha"
            value={loginForm.password} 
            onChange={handleLoginForm} 
          />
        </FieldContainer>
      
        <Button variant="contained" color="primary" type="submit" disabled={!loginForm.email || !loginForm.password}>
          Entrar
        </Button>
        <a href="/register">Não possui uma conta?</a>
      </FormContainer>
    </Container>
  )
}

export default Login;