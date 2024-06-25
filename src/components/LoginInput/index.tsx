import { HTMLInputTypeAttribute } from "react";
import { Input, Label, LoginInputContainer } from "./style";

interface ILoginInputProps {
  label?: string;
  isRequired?: boolean;
  name: string;
  value: string;
  type?: HTMLInputTypeAttribute;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoginInput = (props: ILoginInputProps) => {
  return (
    <LoginInputContainer>
      {props.label && <Label isRequired={!!props.isRequired}>{props.label}:</Label>}
      <Input type={props.type || "Login"} name={props.name} value={props.value} onChange={props.onChange} placeholder={props.placeholder} />
    </LoginInputContainer>
  )
};

export default LoginInput;