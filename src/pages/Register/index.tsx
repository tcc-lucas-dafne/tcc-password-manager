import { useState } from "react";

import { 
  Container, 
  FormContainer, 
  SiteName,
  Title,
  FieldContainer,
} from "./style";
import TextInput from "../../components/TextInput";
import { Button } from "@mui/material";
import UserService from "../../services/user";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useAppContext } from "../../context";
import { Navigate, useNavigate } from "react-router";
import PasswordStrengthMeter from "../../components/PasswordStrengthMeter";
import PasswordRequirements from "../../components/PasswordRequirements";
import zxcvbn from 'zxcvbn';

const Register = () => {
  const navigate = useNavigate();
  const { user } = useAppContext();
  const [registerForm, setRegisterForm] = useState<Register>({ email: "", password: "" });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordValid, setPasswordValid] = useState(false);

  const handleRegisterForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRegisterForm(currState => ({ ...currState, [name]: value }));
    
    if (name === "password") {
      const strength = zxcvbn(value);
      setPasswordStrength(strength.score);
      setPasswordValid(strength.score >= 3);
    }
  };

  const createAccount = async () => {
    if (!passwordValid) {
      toast.error("A senha não atende aos requisitos de segurança.");
      return;
    }
    
    try {
      const response = await UserService.createUser(registerForm);
      if (response.status === 201) {
        toast.success("Conta criada com sucesso!");
        navigate("/login");
      }
    } catch (e) {
      const error = e as AxiosError;
      if (error.response?.data) {
        const errorMessage = (error.response.data as ResponseError).error;
        if (errorMessage) {
          toast.error(errorMessage);
        }
      } else {
        toast.error("Ocorreu um erro ao criar a conta");
      }
    }
  };

  if (user?.id) return <Navigate to="/" replace />;

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
          <PasswordStrengthMeter strength={passwordStrength} />
          <PasswordRequirements password={registerForm.password} />
        </FieldContainer>
        <Button variant="contained" color="primary" onClick={createAccount} disabled={!passwordValid}>
          Cadastrar
        </Button>
        <a href="/login">Já tenho uma conta</a>
      </FormContainer>
    </Container>
  );
};

export default Register;