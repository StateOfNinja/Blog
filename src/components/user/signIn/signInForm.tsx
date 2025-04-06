import { Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { useLoginUserMutation } from '../../../store/slice/apiSlice';

import '../signForm.css';

export default function SignIn() {
  const navigate = useNavigate();

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [serverError, setServerError] = useState();

  function onSubmit(data) {
    loginUser(data)
      .unwrap()
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.user));
        navigate('/articles');
      })
      .catch((error) => {
        console.log(error);
        setServerError(error.data.errors);
      });
  }

  return (
    <div className="page-form">
      <form className="form form-signIn" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="form-title">Sign In</h1>
        <ul className="form-group">
          <li className="form-group-item">
            <label htmlFor="email" className="label">
              Email address
            </label>
            <input
              type="email"
              id="email"
              className={`input ${errors.email ? 'input-error' : ''}`}
              placeholder="Email address"
              {...register('email', {
                required: 'Поле обязательно для заполнения',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Не корректный адрес',
                },
              })}
            />
            {errors.email && <span className="error">{String(errors.email.message)}</span>}
          </li>
          <li className="form-group-item">
            <label htmlFor="password" className="label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className={`input ${errors.password ? 'input-error' : ''}`}
              placeholder="Password"
              {...register('password', {
                required: 'Поле обязательно для заполнения',
                minLength: {
                  value: 6,
                  message: 'Пароль слишком короткый',
                },
                maxLength: {
                  value: 40,
                  message: 'Пароль слишком длинный',
                },
              })}
            />
            {errors.password && <span className="error">{String(errors.password.message)}</span>}
          </li>
        </ul>

        <Button type="primary" className="form-btn" htmlType="submit">
          Login
        </Button>
        <p className="form-switch">
          Already have an account?{' '}
          <Link to={'/sign-Up'}>
            <span className="form-switch__link">Sign Up.</span>{' '}
          </Link>
        </p>
      </form>
    </div>
  );
}
