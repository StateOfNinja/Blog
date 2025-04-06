import { Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { useRegisterUserMutation } from '../../../store/slice/apiSlice';

export default function SignUp() {
  const navigation = useNavigate();

  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const [serverError, setSereverError] = useState();

  function onSubmit(data) {
    registerUser(data)
      .unwrap()
      .then((response) => {
        if (!isLoading) {
          localStorage.setItem('user', JSON.stringify(response.user));
          navigation('/articles');
        }
      })
      .catch((error) => {
        console.log(error);
        setSereverError(error.data.errors);
      });
  }

  return (
    <div className="page-form">
      <form className="form form-signUp" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="form-title">Create new account</h1>
        <ul className="form-group">
          <li className="form-group-item">
            <label htmlFor="username" className="label">
              User name
            </label>
            <input
              type="text"
              id="username"
              className={`input ${errors.username ? 'input-error' : ''}`}
              placeholder="User name"
              autoFocus
              {...register('username', {
                required: 'Поле обязательно для заполнения',
                minLength: {
                  value: 3,
                  message: 'Имя слишком короткое',
                },
                maxLength: {
                  value: 20,
                  message: 'Имя слишком длинное',
                },
              })}
            />
            {serverError && <span className="error">{JSON.stringify(serverError.username)}</span>}
            {errors.username && <span className="error">{String(errors.username?.message)}</span>}
          </li>
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
            {serverError && <span className="error">{JSON.stringify(serverError.email)}</span>}
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
          <li className="form-group-item">
            <label htmlFor="repeatPassword" className="label">
              Repeat Password
            </label>
            <input
              type="password"
              id="repeatPassword"
              className={`input ${errors.repeatPassword ? 'input-error' : ''}`}
              placeholder="Repeat Password"
              {...register('repeatPassword', {
                required: 'Поле обязательно для заполнения',
                validate: (value) => {
                  const { password } = getValues();
                  return password === value || 'Пароль не совпадает';
                },
              })}
            />
            {errors.repeatPassword && <span className="error">{String(errors.repeatPassword.message)}</span>}
          </li>
        </ul>

        <label htmlFor="agreement" className="agreement">
          <input
            type="checkbox"
            id="agreement"
            className={`agreement-checkbox ${errors.agreement ? 'inpur-error' : ''}`}
            {...register('agreement', {
              required: 'Поле обязательно для заполнения',
            })}
          />
          {errors.agreement && <span className="error">{String(errors.agreement.message)}</span>}I agree to the
          processing of my personal information
        </label>
        <Button type="primary" htmlType="submit" className="form-btn">
          Create
        </Button>
        <p className="form-switch">
          Already have an account?{' '}
          <Link to={'/sign-in'}>
            <span className="form-switch__link">Sign In.</span>{' '}
          </Link>
        </p>
      </form>
    </div>
  );
}
