import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom'
import StoreContext from '../../Store/Context'
import UIButton from 'components/UI/Button/Button';

import './Login.css';

function initialState() {
  return { user: '', password: ''}
}

// Função fake pois ainda não estamos lidando com auth
function login({ user, password }){
  if(user === 'admin' && password === 'admin'){
    return { token: '1234'};
  }
  return { error: 'Usuário ou senha invalido'}
}


const UserLogin = () => {
  const [values, setValues] = useState(initialState)
  const { setToken } = useContext(StoreContext)
  const histroy = useHistory();

  function onChange(event){
    const { value, name } = event.target

    setValues({
      ...values,
      // Desestruturamos o name em formato de array pois, cada name (name = 'user'/'password') acessará um value
      // esse value acessará o state values.user/password e como estão na setValues, esse valor está sendo alterado
      // automáticamente, mas lembresse que como estamos acessando a função initialState(), em cada value alteramos
      // o valor do retorno (user: '', password: '')
      [name]: value,
    })
  }

  function onSubmit(event) {
    event.preventDefault();

    const { token } = login(values)

    if(token) {
      setToken(token);
      return histroy.push('/')
    }

    setValues(initialState);
  }

  return (
    <div className="user-login">
      <h1 className="user-login__title">Acessar o Sistema</h1>
      <form autoComplete="nope" onSubmit={onSubmit}>
        <div className="user-login__form-control">
          <label htmlFor="email">E-mail</label>
          <input id="user" type="text" name="user" autoComplete="off" onChange={onChange} value={values.user} />
        </div>
        <div className="user-login__form-control">
          <label htmlFor="password">Senha</label>
          <input id="password" type="password" name="password" onChange={onChange} value={values.password} />
        </div>
        <UIButton
          type="submit"
          theme="contained-green"
          className="user-login__submit-button"
          rounded
        >
          Entrar
        </UIButton>
      </form>
    </div>
  );
};

export default UserLogin;
