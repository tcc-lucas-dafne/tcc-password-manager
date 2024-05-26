import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const FormContainer = styled.form`
  min-width: 500px;
  background-color: #FFF;
  border-radius: 18px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

export const SiteName = styled.div`
  text-align: center;
  font-weight: 800;
  color: blue;
  font-size: 2.5rem;
  margin: 0rem 0rem 3rem 0rem;
  letter-spacing: 0rem;
`;

export const Label = styled.label``;

export const FieldContainer = styled.div`
  text-align: left;
`;