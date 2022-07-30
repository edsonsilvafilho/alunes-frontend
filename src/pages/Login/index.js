import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import { useLocation, useNavigate } from 'react-router-dom';
import { isEmail } from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import * as actions from '../../store/modules/auth/actions';
import Loading from '../../components/Loading';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordDisplayed, setIsPasswordDisplayed] = useState(false);
  const isLoading = useSelector((state) => state.auth.isLoading);

  const dispatch = useDispatch();

  const location = useLocation();
  const prevPath = get(location, 'state.from.pathname', '/');
  const navigate = useNavigate();

  const handleCheckbox = () => {
    setIsPasswordDisplayed(!isPasswordDisplayed);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formErrors = false;
    if (!isEmail) {
      formErrors = true;
      toast.error('E-mail inválido.');
    }

    if (password === '') {
      formErrors = true;
      toast.error('É necessário informar a senha');
    }

    if (formErrors) return;

    try {
      dispatch(
        actions.LoginRequest({
          email,
          password,
          prevPath,
          navigate,
        })
      );
    } catch (err) {
      const status = get(err, 'response.status', 0);
      const errors = get(err, 'response.data.errors', []);
      if (status === 400) {
        errors.map((error) => toast.error(error));
      } else {
        console.log(err);
      }
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Login</h1>
      <Form method="post" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="email">
          E-mail:
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu email"
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            id="password"
            type={isPasswordDisplayed ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="sua senha"
          />
        </label>
        <label htmlFor="cbPassword" className="checkbox">
          <input
            type="checkbox"
            value={isPasswordDisplayed}
            onClick={handleCheckbox}
          />
          Exibir senha
        </label>
        <button type="submit">Efetuar Login</button>
      </Form>
    </Container>
  );
}
