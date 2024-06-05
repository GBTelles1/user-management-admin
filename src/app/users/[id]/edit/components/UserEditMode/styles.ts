import styled from "styled-components";

export const EditPageContainer = styled.div`
  position: relative;
`;

export const UpdateUserForm = styled.form`
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

  input,
  select {
    width: 40%;
    padding: 0.5rem;

    border-radius: 10px;
  }
`;

export const UserDetail = styled.div`
  width: 40%;
  padding: 1rem;

  border: 2px solid #000000;
  border-radius: 10px;
`;

export const CurrentGroups = styled(UserDetail)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const CurrentGroup = styled.div`
  display: flex;
  gap: 1rem;

  button {
    background: #c30010;
    padding: 0rem 0.5rem;
    border-radius: 8px;
  }
`;

export const SaveDeleteButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const DeleteButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;

  background: #c30010;
  font-size: 1rem;
  padding: 0.8rem 1rem;
  border-radius: 10px;

  cursor: pointer;
`;
