import styled from 'styled-components';

export const CreateGroupForm = styled.form`
  padding: 0rem 5rem;
  
  display: flex;
  flex-direction: column;
  gap: 2rem;

  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
`;

export const FormInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  label {
    font-size: 1.5rem;
  }

  input, select {
    width: 40%;
    padding: 0.5rem;

    border-radius: 10px;
  }
`;
