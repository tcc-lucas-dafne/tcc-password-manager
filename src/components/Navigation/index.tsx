import { Menu, MenuItem } from "@mui/material";
import { useAppContext } from "../../context";
import { Header, HeaderWrapper, NavigationButton, UserIcon } from "./style";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router";


const Navigation = () => {
  const navigate = useNavigate();
  const { user, logout, handleOpenDialog } = useAppContext();

  const [anchorEl, setAnchorEl] = useState<null | SVGElement>(null);
  const open = Boolean(anchorEl);

  if (!user) return <Navigate to="/login" replace />;

  const goToCredentialsPage = () => navigate(`/${user.id}`);
  
  const handleClick = (event: React.MouseEvent<SVGElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Header>
      <HeaderWrapper>
        <NavigationButton onClick={goToCredentialsPage}>Credenciais</NavigationButton>
        <NavigationButton onClick={handleOpenDialog}>Cadastrar Nova Credencial</NavigationButton>
        <UserIcon
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={(event) => handleClick(event)}
        />
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{ 'aria-labelledby': 'basic-button' }}>
          <MenuItem onClick={handleClose}>Perfil</MenuItem>
          <MenuItem onClick={logout}>Sair</MenuItem>
        </Menu>
      </HeaderWrapper>
    </Header>
  )
}

export default Navigation;
