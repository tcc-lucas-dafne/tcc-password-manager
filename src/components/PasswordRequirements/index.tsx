import React from 'react';
import styled from 'styled-components';

const RequirementsContainer = styled.div`
  margin-top: 10px;
`;

const Requirement = styled.div<{ valid: boolean }>`
  color: ${({ valid }) => (valid ? "green" : "red")};
`;

const PasswordRequirements = ({ password }: { password: string }) => {
  const requirements = [
    { text: "Pelo menos 8 caracteres", valid: password.length >= 8 },
    { text: "Pelo menos 1 letra maiúscula", valid: /[A-Z]/.test(password) },
    { text: "Pelo menos 1 letra minúscula", valid: /[a-z]/.test(password) },
    { text: "Pelo menos 1 número", valid: /\d/.test(password) },
    { text: "Pelo menos 1 caractere especial", valid: /[^A-Za-z0-9]/.test(password) }
  ];

  return (
    <RequirementsContainer>
      {requirements.map((req, index) => (
        <Requirement key={index} valid={req.valid}>{req.text}</Requirement>
      ))}
    </RequirementsContainer>
  );
};

export default PasswordRequirements;