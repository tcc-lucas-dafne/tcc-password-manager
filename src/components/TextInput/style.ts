import styled from "styled-components";

interface LabelProps {
  isRequired: boolean;
}

export const Input = styled.input`
  border: 1px solid grey;
  border-radius: 6px;
  padding: 8px;
  color: #000;
  outline: none;
  font-size: 18px;
`;

export const Label = styled.label<LabelProps>`
  text-align: left;

  ${props => props.isRequired && `
    &:after {
      content: "*";
      color: red;
      font-weight: bold;
    }
  `}
`;

export const TextInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 6px;
`;