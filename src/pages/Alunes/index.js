/* eslint-disable react/void-dom-elements-no-children */
import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaEdit, FaWindowClose } from 'react-icons/fa';
import axios from '../../services/axios';
import { Container } from '../../styles/GlobalStyles';
import { AluneContainer, ProfilePicture } from './styled';
import Loading from '../../components/Loading';

export default function Alunes() {
  const [alunes, setAlunes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await axios.get('/alunes');
      setAlunes(response.data);
      setIsLoading(false);
    }
    getData();
  }, []);
  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Alunes</h1>
      <AluneContainer>
        {alunes.map((alune) => (
          <div key={String(alune.id)}>
            <ProfilePicture>
              {get(alune, 'Fotos[0].url', false) ? (
                <img
                  crossOrigin=""
                  src={alune.Fotos[0].url}
                  alt="Foto do alune"
                />
              ) : (
                <FaUserCircle size={36} />
              )}
            </ProfilePicture>
            <span>{alune.nome}</span>
            <span>{alune.email}</span>

            <Link to={`/alune/${alune.id}/edit`}>
              <FaEdit size={16} />
            </Link>
            <Link to={`/alune/${alune.id}/delete`}>
              <FaWindowClose size={16} />
            </Link>
          </div>
        ))}
      </AluneContainer>
    </Container>
  );
}
