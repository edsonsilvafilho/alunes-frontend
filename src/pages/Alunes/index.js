/* eslint-disable react/void-dom-elements-no-children */
import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import { Link } from 'react-router-dom';
import {
  FaUserCircle,
  FaEdit,
  FaWindowClose,
  FaExclamationCircle,
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from '../../services/axios';
import { Container } from '../../styles/GlobalStyles';
import { AluneContainer, ProfilePicture } from './styled';
import Loading from '../../components/Loading';
import { primaryColor } from '../../config/colors';

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

  const handleDeteleAsk = (e) => {
    e.preventDefault();
    const exclamation = e.currentTarget.nextSibling;
    exclamation.setAttribute('display', 'block');
    e.currentTarget.remove();
  };

  const handleDeleteAlune = (e, id) => {
    try {
      axios.delete(`/alunes/${id}`);
      e.currentTarget.parentElement.remove();
      toast.success('Alune excluíde com sucesso.', {
        autoClose: 600,
        pauseOnHover: false,
      });
    } catch (err) {
      const status = get(err, 'reponse.status');
      if (status === 401) {
        toast.error('Você precisa estar logade para excluir um alune');
      }
    } finally {
      setIsLoading(false);
    }
  };

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
            <Link to={`/alune/${alune.id}/delete`} onClick={handleDeteleAsk}>
              <FaWindowClose size={16} />
            </Link>
            <FaExclamationCircle
              size={16}
              color={primaryColor}
              cursor="pointer"
              display="none"
              onClick={(e) => handleDeleteAlune(e, alune.id)}
            />
          </div>
        ))}
      </AluneContainer>
    </Container>
  );
}
