import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { primaryColor } from '../../config/colors';

export const AluneContainer = styled.div`
  margin-top: 20px;
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;
  }

  div + div {
    border-top: 1px solid #eee;
  }
`;

export const ProfilePicture = styled.div`
  img {
    border: 3px solid ${primaryColor};
    width: 36px;
    height: 36px;
    object-fit: contain;
    border-radius: 50%;
  }
`;

export const NovoAluno = styled(Link)`
  display: block;
  padding: 20px 0 10px 0;
`;
