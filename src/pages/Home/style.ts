import styled from "styled-components";
import { FaEye, FaEyeSlash, FaTrashAlt } from "react-icons/fa";

export const Container = styled.div`
  margin: 1rem 28px;
  padding: 1rem;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 3rem;
  background-color: white;
`;

export const PasswordField = styled.span`
  display: flex;
  column-gap: 6px;
`;

export const EyeOpen = styled(FaEye)`
  font-size: 20px;
  cursor: pointer;
`;

export const EyeClosed = styled(FaEyeSlash)`
  font-size: 20px;
  cursor: pointer;
`;

export const Delete = styled(FaTrashAlt)`
  font-size: 20px;
  cursor: pointer;
`;