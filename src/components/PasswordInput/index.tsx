import { Input } from "./style";

interface IPasswordInputProps {
  name: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput = (props: IPasswordInputProps) => {
  return (
    <Input type="password" {...props} />
  )
};

export default PasswordInput;