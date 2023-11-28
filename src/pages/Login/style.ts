import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FormContainer = styled.div`
  min-width: 500px;
  background-color: #FFF;
  border-radius: 18px;
  padding: 32px;

  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

export const Label = styled.label``;

export const FieldContainer = styled.div`
  text-align: left;
`;