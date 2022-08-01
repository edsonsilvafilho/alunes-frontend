import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { isEmail, isFloat, isInt } from 'validator';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import { useDispatch } from 'react-redux';
import { FaUserCircle, FaEdit } from 'react-icons/fa';
import { Container } from '../../styles/GlobalStyles';
import { Title, Form, ProfilePicture } from './styled';
import Loading from '../../components/Loading';
import axios from '../../services/axios';
import { LoginFailure } from '../../store/modules/auth/actions';

export default function Alune() {
  const { id } = useParams();
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [foto, setFoto] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return;
    async function getData() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`/alunes/${id}`);
        setNome(get(data, 'nome', ''));
        setSobrenome(get(data, 'sobrenome', ''));
        setEmail(get(data, 'email', ''));
        setIdade(get(data, 'idade', 0));
        setPeso(get(data, 'peso', ''));
        setAltura(get(data, 'altura', ''));
        setFoto(get(data, 'Fotos[0].url', ''));
      } catch (err) {
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.data.errors', []);
        if (status === 400) {
          errors.map((error) => toast.error(error));
          navigate('/', { replace: true });
        } else {
          console.log(err);
        }
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [id, navigate]);

  const validateForm = () => {
    let isFormValid = true;
    if (nome.length < 3 || nome.length > 255) {
      isFormValid = false;
      toast.error('Nome precisa ter entre 3 e 255 caracteres.');
    }
    if (sobrenome.length < 3 || sobrenome.length > 255) {
      isFormValid = false;
      toast.error('Sobrenome precisa ter entre 3 e 255 caracteres.');
    }
    if (!isEmail(email)) {
      isFormValid = false;
      toast.error('Email inválido');
    }
    if (!isInt(String(idade)) || idade <= 0) {
      isFormValid = false;
      toast.error(
        'Idade precisa ser um valor inteiro válido e maior do que zero'
      );
    }
    if (!isFloat(String(peso)) || peso <= 0) {
      isFormValid = false;
      toast.error(
        'Peso precisa ser um valor de ponto flutuante válido e maior que zero'
      );
    }
    if (!isFloat(String(altura)) || altura <= 0) {
      isFormValid = false;
      toast.error(
        'Altura precisa ser um valor de ponto flutuante válido e maior do que zero'
      );
    }

    return isFormValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsLoading(true);
      if (id) {
        // editando

        await axios.patch(`/alunes/${id}`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        toast.success('Alune alterade com sucesso');
      } else {
        // criando
        const response = await axios.post(`/alunes/`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        const novoID = get(response, 'data.id', 0);
        toast.success('Alune cadastrade com sucesso');
        navigate(`/alune/${novoID}/edit`, { replace: true });
      }
    } catch (err) {
      console.log(err);
      const status = get(err, 'response.status', 0);
      const data = get(err, 'response.data', {});
      const errors = get(data, 'errors', []);

      if (status === 401) {
        dispatch(LoginFailure());
      }
      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('Erro desconhecido');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Title>{id ? 'Editar alune' : 'Criar novo alune'}</Title>

      {id && (
        <ProfilePicture>
          {foto ? (
            <img src={foto} alt={nome} crossOrigin="" />
          ) : (
            <FaUserCircle size={256} />
          )}
          <Link to={`/fotos/${id}`}>
            <FaEdit size={24} />
          </Link>
        </ProfilePicture>
      )}

      <Form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="nome">
          Nome:
          <input
            type="text"
            id="nome"
            value={nome}
            placeholder="Nome"
            onChange={(e) => setNome(e.target.value)}
          />
        </label>
        <label htmlFor="sobrenome">
          Sobrenome:
          <input
            type="text"
            id="sobrenome"
            value={sobrenome}
            placeholder="Sobrenome"
            onChange={(e) => setSobrenome(e.target.value)}
          />
        </label>
        <label htmlFor="email">
          E-mail:
          <input
            type="email"
            id="email"
            value={email}
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="idade">
          Idade:
          <input
            type="number"
            id="idade"
            value={idade}
            placeholder="Idade"
            onChange={(e) => setIdade(e.target.value)}
          />
        </label>
        <label htmlFor="peso">
          Peso:
          <input
            type="text"
            id="peso"
            value={peso}
            placeholder="Peso"
            onChange={(e) => setPeso(e.target.value)}
          />
        </label>
        <label htmlFor="altura">
          Altura:
          <input
            type="text"
            id="altura"
            value={altura}
            placeholder="Altura"
            onChange={(e) => setAltura(e.target.value)}
          />
        </label>
        <button type="submit">{id ? 'Salvar' : 'Criar'}</button>
      </Form>
    </Container>
  );
}
