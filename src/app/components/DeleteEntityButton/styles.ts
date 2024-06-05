import styled from "styled-components";

export const DeleteButton = styled.button`
  background: #c30010;
  font-size: 1rem;
  padding: 0.8rem 1rem;
  border-radius: 10px;

  cursor: pointer;

  opacity: 70%;
  transition: 1s ease;

  &:hover {
    opacity: 100%;
  }

  &:disabled {
    opacity: 30%;
    cursor: not-allowed;
  }
`;
