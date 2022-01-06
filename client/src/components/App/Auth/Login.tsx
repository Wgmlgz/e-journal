import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../../../api/api';
export default function Login() {
  const [data, setData] = useState<LoginData>({
    username: '',
    password: '',
  });
  return (
    <div
      style={{
        height: '100vh',
        width: '100wh',
        display: 'grid',
        justifyItems: 'center',
        alignContent: 'center',
      }}
    >
      <div
        style={{
          display: 'grid',
          justifyItems: 'center',
        }}
      >
        <div>
          <label htmlFor='uname'>
            <b> Имя пользователя </b>
          </label>
          <input
            type='text'
            placeholder='Enter Username'
            name='uname'
            onChange={(e) => setData({ ...data, username: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor='psw'>
            <b> Пароль </b>
          </label>
          <input
            type='password'
            placeholder='Enter Password'
            name='psw'
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>
        <br />

        <button
          onClick={async () => {
            console.log(data);
            login(data)
              .then((response) => {
                console.log(response);
                if (response.data !== 'Successfully Authenticated') {
                  alert(response.data);
                } else {
                  window.location.replace('/dashboard');
                }
              })
              .catch((error) => {
                if (error.response) {
                  alert(error.response.data.err);
                }
              });
          }}
        >
          Войти
        </button>
        <br />

        <div>
          <label> Нет аккаунта? </label>
          <Link to={'/register'}> зарегистрироваться </Link>
        </div>
      </div>
    </div>
  );
}
