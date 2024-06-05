import styled from 'styled-components';

export const DataTableContainer = styled.div`
  flex: 1;
  overflow: auto;
  margin-top: 2rem;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    th {
      background-color: #202024;
      padding: 1.5rem;
      text-align: left;
      color: ${(props) => props.theme.colors.white};
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }

      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    td {
      background-color: #202024;
      border-top: 4px solid black;
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        padding-left: 1.5rem;
      }

      &:nth-child(2) {
        width: 40%;
      }

      &:nth-child(4) {
        text-align: center;
      }

      &:last-child {
        padding-right: 1.5rem;
      }
    }
  }
`;
