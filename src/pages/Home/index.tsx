import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import ManagerServices from "../../services/manager";
import { AxiosError } from "axios";
import { useAppContext } from "../../context";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container, Delete, EyeClosed, EyeOpen, PasswordField } from "./style";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Pagination } from "@mui/material";
import { styled } from '@mui/material/styles';
import Loading from "../../components/Loading";
import { toast } from "react-toastify";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Home = () => {
  const { id } = useParams();
  const { user, credentials, loading, getCredentials  } = useAppContext();

  const [isCredentialPasswordDisplayed, setIsCredentialPasswordDisplayed] = useState<boolean[]>([]);
  const [deleteCredentialDialog, setDeleteCredentialDialog] = useState<number>(0);

  const showCredentialPassword = (idx: number) => {
    setIsCredentialPasswordDisplayed(currState => {
      const newState = [...currState];
      newState[idx] = !newState[idx];
      return newState;
    })
  };

  const openDeleteCredentialDialog = (id: number) => setDeleteCredentialDialog(id);
  const closeDeleteCredentialDialog = () => setDeleteCredentialDialog(0);

  const deleteCredential = async () => {
    try {
      const response = await ManagerServices.deleteCredential(deleteCredentialDialog);
      if (response.status === 201) {
        toast.success("Credencial Removida com Sucesso!");
        if (id) getCredentials(id);
      }
    } catch (e) {
      const error = e as AxiosError;
      console.log(error);
      toast.error("Ocorreu um erro ao deletar a credencial. Tente novamente.")
    } finally {
      closeDeleteCredentialDialog()
    }
  }

  useEffect(() => {
    if (id) getCredentials(id);
  }, []);

  useEffect(() => {
    if (credentials) {
      setIsCredentialPasswordDisplayed(Array(credentials.length).fill(false));
    }
  }, [credentials]);

  if (!user) return <Navigate to="/login" replace />;

  return (
    <Container>
      {!loading ? (
        <>
          {credentials.length && isCredentialPasswordDisplayed.length ? (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell>Site</StyledTableCell>
                    <StyledTableCell>URL</StyledTableCell>
                    <StyledTableCell>Email</StyledTableCell>
                    <StyledTableCell>Senha</StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {credentials.map((credential: SiteCredential, idx: number) => {
                    let showPassword: boolean = isCredentialPasswordDisplayed[idx];
                    return (
                      <StyledTableRow key={credential.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <StyledTableCell component="th" scope="row">{credential.name}</StyledTableCell>
                        <StyledTableCell>
                          {credential.url ? <a target="_blank" href={credential.url}>{credential.url}</a> : "---"}
                        </StyledTableCell>
                        <StyledTableCell>{credential.email}</StyledTableCell>
                        <StyledTableCell>
                          {showPassword ? (
                            <PasswordField>
                              {credential.password}
                              <EyeClosed onClick={showCredentialPassword.bind(null, idx)} />
                            </PasswordField>
                          ) : (
                            <PasswordField>
                              {credential.password.replace(/[a-zA-Z0-9]/g, "#")}
                              <EyeOpen onClick={showCredentialPassword.bind(null, idx)} />
                            </PasswordField>
                          )}
                        </StyledTableCell>
                        <StyledTableCell>
                          <Delete onClick={openDeleteCredentialDialog.bind(null, credential.id)} />
                        </StyledTableCell>
                      </StyledTableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <span>Nenhuma Credencial Cadastrada</span>
          )}
        </>
      ) : (
        <Loading />
      )}
      <Dialog open={!!deleteCredentialDialog} onClose={closeDeleteCredentialDialog} fullWidth maxWidth="sm">
        <DialogTitle>Tem Certeza que Deseja Deletar a Credencial?</DialogTitle>
        <DialogContent>
          Não será possível recuperar a credencial depois de removida
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={deleteCredential}>
            Remover
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Home;