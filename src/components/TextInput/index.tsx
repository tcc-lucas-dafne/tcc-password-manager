import { HTMLInputTypeAttribute } from "react";
import { Input, Label, TextInputContainer } from "./style";

interface ITextInputProps {
  label?: string;
  isRequired?: boolean;
  name: string;
  value: string;
  type?: HTMLInputTypeAttribute;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = (props: ITextInputProps) => {
  return (
    <TextInputContainer>
      {props.label && <Label isRequired={!!props.isRequired}>{props.label}:</Label>}
      <Input type={props.type || "text"} name={props.name} value={props.value} onChange={props.onChange} />
    </TextInputContainer>
  )
};

export default TextInput;