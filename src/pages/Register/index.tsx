import { useState } from "react";

import { 
  Container, 
  FormContainer, 
  SiteName,
  Title,
  Label, 
  FieldContainer
} from "./style";
import TextInput from "../../components/TextInput";
import { Button } from "@mui/material";
import UserService from "../../services/user";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useAppContext } from "../../context";
import { Navigate, useNavigate } from "react-router";

const Register = () => {
  const navigate = useNavigate();
  const { user } = useAppContext();
  const [registerForm, setRegisterForm] = useState<Register>({ email: "", password: "" });

  const handleRegisterForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm(currState => {
      return { ...currState, [event.target.name]: event.target.value };
    })
  }

  const createAccount = async () => {    
    try {
      const response = await UserService.createUser(registerForm);
      if (response.status === 201) {
        toast.success("Conta criada com sucesso!");
        navigate("/login");
      }
      console.log(response);
    } catch (e) {
      const error = e as AxiosError;
      console.log(error.response?.data);
      if (error.response && error.response.data) {
        const errorMessage = (error.response.data as ResponseError).error;
        if (errorMessage) {
          toast.error(errorMessage)
        }
      } else {
        toast.error("Ocorreu um erro ao criar a conta");
      }
    }
  }

  if (user && user.id) return <Navigate to="/" replace />

  return (
    <Container>
    <FormContainer>
      <SiteName>Gerenciador de Senhas</SiteName>
      <Title>Criar conta</Title>
      <FieldContainer>
        <TextInput 
          name="email" 
          type="email"
          label="Email"
          placeholder="Insira seu Email"
          value={registerForm.email} 
          onChange={handleRegisterForm} 
        />
      </FieldContainer>
      <FieldContainer>
        <TextInput 
          name="password"
          type="password"
          label="Senha" 
          placeholder="Insira sua Senha"
          value={registerForm.password} 
          onChange={handleRegisterForm} 
        />
      </FieldContainer>
    
      <Button variant="contained" color="primary" onClick={createAccount}>
        Cadastrar
      </Button>
      <a href="/login">Já tenho uma conta</a>
    </FormContainer>
  </Container>
  )
}

export default Register;