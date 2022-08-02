import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import { Container } from '../../styles/GlobalStyles';
import Loading from '../../components/Loading';
import { Title, Form } from './styled';
import axios from '../../services/axios';
import { LoginFailure } from '../../store/modules/auth/actions';

export default function Fotos() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [foto, setFoto] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`/alunes/${id}`);
        setFoto(get(data, 'Fotos[0].url'), '');
      } catch (err) {
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.data.errors', []);
        if (status === 400) {
          errors.map((error) => toast.error(error));
          navigate('/', { replace: true });
        }
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [id, navigate]);

  const handleChange = async (e) => {
    const file = e.target.files[0];
    const fotoURL = URL.createObjectURL(file);
    setFoto(fotoURL);
    const formData = new FormData();
    formData.append('alune_id', id);
    formData.append('foto', file);
    setIsLoading(true);
    try {
      await axios.post('/fotos/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Foto enviada com sucesso.');
      navigate(`/alune/${id}/edit`);
    } catch (err) {
      const status = get(err, 'response.status');
      toast.error('Erro ao enviar a foto');
      if (status === 401) {
        dispatch(LoginFailure());
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Title>Fotos</Title>

      <Form>
        <label htmlFor="foto">
          {foto ? <img src={foto} alt="Foto" crossOrigin="" /> : 'Selecionar'}
          <input
            type="file"
            id="foto"
            onChange={handleChange}
            accept="image/*"
          />
        </label>
      </Form>
    </Container>
  );
}
