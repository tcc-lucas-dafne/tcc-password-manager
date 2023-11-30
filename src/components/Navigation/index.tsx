import { Menu, MenuItem } from "@mui/material";
import { useAppContext } from "../../context";
import { Header, HeaderWrapper, NewCredentialButton, UserIcon } from "./style";
import { useState } from "react";


const Navigation = () => {
  const { logout, handleOpenDialog } = useAppContext();
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event: any) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Header>
      <HeaderWrapper>
        <NewCredentialButton onClick={handleOpenDialog}>Cadastrar Nova Credencial</NewCredentialButton>
        <UserIcon
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={(event) => handleClick(event)}
        />
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{ 'aria-labelledby': 'basic-button' }}>
          <MenuItem onClick={handleClose}>Perfil</MenuItem>
          <MenuItem onClick={handleClose}>Credenciais</MenuItem>
          <MenuItem onClick={logout}>Sair</MenuItem>
        </Menu>
      </HeaderWrapper>
    </Header>
  )
}

export default Navigation;
