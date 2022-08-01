import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Form = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  input {
    height: 40px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 0 10px;
  }
`;

export const Title = styled.h1`
  text-align: center;
`;

export const ProfilePicture = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 0 0 20px;
  position: relative;
  margin-top: 30px;

  img {
    width: 256px;
    height: 256px;
    border-radius: 50%;
    object-fit: contain;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    border: none;
    bottom: 0;
    color: #fff;
    background: ${colors.primaryColor};
    width: 36px;
    height: 36px;
    border-radius: 50%;
    margin: 0 auto;
  }
`;
