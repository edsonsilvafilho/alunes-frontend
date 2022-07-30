import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import Loading from '../../components/Loading';
import * as actions from '../../store/modules/register/actions';

export default function Register() {
  const {
    id,
    email: emailStored,
    nome: nomeStored,
  } = useSelector((state) =>
    state.register.user.id ? state.register.user : state.auth.user
  );
  const isLoading = useSelector((state) => state.register.isLoading);

  console.log(id, emailStored, nomeStored);

  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  useEffect(() => {
    if (!id) return;
    setNome(nomeStored);
    setEmail(emailStored);
  }, [emailStored, id, nomeStored]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();

    dispatch(
      actions.RegisterRequest({
        id,
        nome,
        password,
        rePassword,
        email,
        navigate,
        redirectPath: '/login',
      })
    );
  }
  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>{id ? 'Editar dados' : 'Crie sua conta'}</h1>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="nome">
          Nome:{' '}
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu nome"
          />
        </label>
        <label htmlFor="email">
          Email:{' '}
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu email"
          />
        </label>
        <label htmlFor="password">
          Senha:{' '}
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="sua senha"
          />
        </label>
        <label htmlFor="re-password">
          Repita:{' '}
          <input
            id="re-password"
            type="password"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
            placeholder="Redigite a senha"
          />
        </label>
        <button type="submit"> {id ? 'Salvar' : 'Criar minha conta'} </button>
      </Form>
    </Container>
  );
}
