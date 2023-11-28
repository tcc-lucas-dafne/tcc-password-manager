import { Input, Label } from "./style";

interface ITextInputProps {
  label?: string;
  name: string;
  value: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = (props: ITextInputProps) => {
  return (
    <div>
      {props.label && <Label>{props.label}</Label>}
      <Input type="text" name={props.name} value={props.value} onChange={props.onChange} />
    </div>
  )
};

export default TextInput;