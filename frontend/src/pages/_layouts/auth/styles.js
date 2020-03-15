import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #7d40e7;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 360px;
  text-align: center;
  background: #fff;
  border-radius: 4px;
  padding: 55px 30px;
  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    label {
      align-self: flex-start;
      font-weight: bold;
      margin-bottom: 10px;
      color: #444;
    }

    input {
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      margin: 0 0 10px;
      &::placeholder {
      }
    }

    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    button {
      color: #fff;
      background: #7d40e7;
      border: 0;
      border-radius: 4px;
      height: 44px;
      font-size: 16px;
      font-weight: bold;
      transition: background 0.2s;
      &:hover {
        background: ${darken(0.03, '#7d40e7')};
      }
    }
  }
`;
