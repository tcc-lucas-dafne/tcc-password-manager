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
import { Container, EyeClosed, EyeOpen, PasswordField } from "./style";
import { Pagination } from "@mui/material";
import { styled } from '@mui/material/styles';

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
  const { user } = useAppContext();

  const [credentials, setCredentials] = useState<SiteCredential[]>([]);
  const [activePage, setActivePage] = useState<number>(1);
  const [isCredentialPasswordDisplayed, setIsCredentialPasswordDisplayed] = useState<boolean[]>([]);

  const showCredentialPassword = (idx: number) => {
    setIsCredentialPasswordDisplayed(currState => {
      const newState = [...currState];
      newState[idx] = !newState[idx];
      return newState;
    })
  };

  const handlePaginationChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setActivePage(value);
  };

  useEffect(() => {
    const getPasswords = async () => {
      try {
        const response = await ManagerServices.getSiteCredentials(id as string);
        if (response.status === 200) {
          setCredentials(response.data);
          setIsCredentialPasswordDisplayed(Array(response.data.length).fill(false));
        }
        console.log(response);
      } catch (e) {
        const error = e as AxiosError;
        console.log(error);
      }
    };

    if (id) {
      getPasswords();
    }
  }, []);

  if (!user) return <Navigate to="/login" replace />;

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Site</StyledTableCell>
              <StyledTableCell>URL</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Senha</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {credentials.length && isCredentialPasswordDisplayed.length && credentials.map((credential: SiteCredential, idx: number) => {
              let showPassword: boolean = isCredentialPasswordDisplayed[idx];
              return (
                <StyledTableRow key={idx} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
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
                        #####
                        <EyeOpen onClick={showCredentialPassword.bind(null, idx)} />
                      </PasswordField>
                    )}
                  </StyledTableCell>
                </StyledTableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <div style={{ backgroundColor: 'white' }}>
        <Pagination 
          count={10} 
          variant="outlined" 
          color="primary"
          page={activePage} 
          onChange={handlePaginationChange}
        />
      </div> */}
    </Container>
  );
};


export default Home;