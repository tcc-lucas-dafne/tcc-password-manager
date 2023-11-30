import { useAppContext } from "../../context";
import { Header, HeaderWrapper, NewCredentialButton, UserIcon } from "./style";


const Navigation = () => {
  const { handleOpenDialog } = useAppContext();

  return (
    <Header>
      <HeaderWrapper>
        <NewCredentialButton onClick={handleOpenDialog}>Cadastrar Nova Credencial</NewCredentialButton>
        <UserIcon />
      </HeaderWrapper>
    </Header>
  )
}

export default Navigation;
