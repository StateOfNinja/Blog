import { Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

import { TSignError, ISignInData } from '../../../store/types-and-interfaces/sign';
import { setUser } from '../../../store/slice/userSlice';
import { useLoginUserMutation } from '../../../store/slice/apiSlice';
import styles from '../../../style/form.module.css';

export default function SignIn() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ISignInData>();

  const [authError, setAuthError] = useState('');

  async function onSubmit(data: ISignInData) {
    try {
      const response = await loginUser(data).unwrap();
      localStorage.setItem('user', JSON.stringify(response.user));
      dispatch(
        setUser({
          username: response.user.username,
          email: response.user.email,
          token: response.user.token,
        })
      );
      navigate('/articles');
    } catch (err: unknown) {
      const error = err as TSignError;
      if (error.data.errors['email or password']) {
        setAuthError('Email or password is invalid');
      }
    }
  }

  return (
    <div className={styles.pageForm}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.formTitle}>Sign In</h1>
        <ul className={styles.formGroup}>
          <li className={styles.formGroupItem}>
            <label htmlFor="email" className={styles.label}>
              Email address
            </label>
            <input
              type="email"
              id="email"
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              placeholder="Email address"
              {...register('email', {
                required: 'Поле обязательно для заполнения',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Не корректный адрес',
                },
              })}
            />
            {errors.email && <span className={styles.error}>{String(errors.email.message)}</span>}
          </li>
          <li className={styles.formGroupItem}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
              placeholder="Password"
              {...register('password', {
                required: 'Поле обязательно для заполнения',
                minLength: {
                  value: 6,
                  message: 'Пароль слишком короткий',
                },
                maxLength: {
                  value: 40,
                  message: 'Пароль слишком длинный',
                },
              })}
            />{' '}
            {errors.password && <span className={styles.error}>{String(errors.password.message)}</span>}
          </li>
        </ul>
        {authError && <span className={styles.error}>{authError}</span>}

        <Button type="primary" htmlType="submit" className={`${styles.formBtn} ${isLoading ? styles.disabled : ''}`}>
          Login
        </Button>

        <p className={styles.formSwitch}>
          Don’t have an account?{' '}
          <Link to="/sign-up">
            <span className={styles.formSwitchLink}>Sign Up.</span>
          </Link>
        </p>
      </form>
    </div>
  );
}
