import { Button } from "./style";

interface IConfirmButtonProps {
  text: string;
  disabled?: boolean;
  onClick: () => void;
}

const ConfirmButton = (props: IConfirmButtonProps) => {
  return (
    <Button onClick={props.onClick} disabled={props.disabled}>
      {props.text}
    </Button>
  )
}

export default ConfirmButton;