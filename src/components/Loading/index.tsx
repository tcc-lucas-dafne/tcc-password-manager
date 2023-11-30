

import { AiOutlineLoading3Quarters as LoadingSpinner } from "react-icons/ai";
import { LoadingContainer} from './style';

const Loading = () => {
  return (
    <LoadingContainer>
      <LoadingSpinner className="loading" />
    </LoadingContainer>
  )
}

export default Loading;