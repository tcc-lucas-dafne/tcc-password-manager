import styled from "styled-components";
import { FaUserCircle } from 'react-icons/fa';

export const Header = styled.header`
  background-color: #FFF;
  display: flex;
  justify-content: end;
  padding: 12px 0.5rem;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  column-gap: 8px;
`;

export const UserIcon = styled(FaUserCircle)`
  font-size: 42px;
`;

export const NewCredentialButton = styled.button`
  border: none;
  cursor: pointer;
  border-radius: 6px;
  color: black;
  padding: 0 16px;
`;