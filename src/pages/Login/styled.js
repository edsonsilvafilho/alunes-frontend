import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  label.checkbox {
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
  }

  input[type='email'],
  input[type='password'],
  input[type='text'] {
    height: 40px;
    font-size: 18px;
    border: 1px solid #ddd;
    padding: 0 10px;
    border-radius: 5px;
    margin-top: 5px;
    transition: all 300ms;

    &:focus {
      border: 1px solid ${colors.primaryColor};
      outline: 1px solid ${colors.primaryColor};
    }

    &:hover {
      border: 1px solid ${colors.infoColor};
      outline: 1px solid ${colors.infoColor};
    }
  }
`;
