import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Title = styled.h1`
  text-align: center;
`;
export const Form = styled.form`
  label {
    display: flex;
    width: 180px;
    height: 180px;
    background: #eee;
    border: 5px dashed ${colors.primaryColor};
    cursor: pointer;
    margin: 30px auto;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    img {
      width: 180px;
    }
  }

  input {
    display: none;
  }
`;
