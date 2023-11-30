import { LoadingContainer} from './style';
import { CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <LoadingContainer>
      <CircularProgress />
    </LoadingContainer>
  )
}

export default Loading;