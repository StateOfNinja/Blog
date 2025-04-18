import { Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { TSignError, ISignUpData } from '../../../store/types-and-interfaces/sign';
import { setUser } from '../../../store/slice/userSlice';
import { useRegisterUserMutation } from '../../../store/slice/apiSlice';
import styles from '../../../style/form.module.css';

export default function SignUp() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<ISignUpData>();

  const [registerUser, { isLoading }] = useRegisterUserMutation();

  async function onSubmit(data: ISignUpData) {
    try {
      const response = await registerUser(data).unwrap();
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
      if (error.data.errors['username']) {
        setError('username', {
          type: 'serverError',
          message: error.data.errors['username'],
        });
      } else {
        setError('email', {
          type: 'serverError',
          message: error.data.errors['email'],
        });
      }
    }
  }

  return (
    <div className={styles.pageForm}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.formTitle}>Create new account</h1>
        <ul className={styles.formGroup}>
          <li className={styles.formGroupItem}>
            <label htmlFor="username" className={styles.label}>
              User name
            </label>
            <input
              type="text"
              id="username"
              className={`${styles.input} ${errors.username ? styles.inputError : ''}`}
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
            {errors.username && <span className={styles.error}>{String(errors.username.message)}</span>}
          </li>

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
            />
            {errors.password && <span className={styles.error}>{String(errors.password.message)}</span>}
          </li>

          <li className={styles.formGroupItem}>
            <label htmlFor="repeatPassword" className={styles.label}>
              Repeat Password
            </label>
            <input
              type="password"
              id="repeatPassword"
              className={`${styles.input} ${errors.repeatPassword ? styles.inputError : ''}`}
              placeholder="Repeat Password"
              {...register('repeatPassword', {
                required: 'Поле обязательно для заполнения',
                validate: (value) => {
                  const { password } = getValues();
                  return password === value || 'Пароль не совпадает';
                },
              })}
            />
            {errors.repeatPassword && <span className={styles.error}>{String(errors.repeatPassword.message)}</span>}
          </li>
        </ul>
        <label htmlFor="agreement" className={styles.agreement}>
          <input
            type="checkbox"
            id="agreement"
            className={`${styles.agreementCheckbox} ${errors.agreement ? styles.inputError : ''}`}
            {...register('agreement', {
              required: 'Поле обязательно для заполнения',
            })}
          />
          <span>I agree to the processing of my personal information</span>
        </label>
        {errors.agreement && <span className={styles.error}>{String(errors.agreement.message)}</span>}

        <Button type="primary" htmlType="submit" className={`${styles.formBtn} ${isLoading ? styles.disabled : ''}`}>
          Create
        </Button>

        <p className={styles.formSwitch}>
          Already have an account?{' '}
          <Link to="/sign-in">
            <span className={styles.formSwitchLink}>Sign In.</span>
          </Link>
        </p>
      </form>
    </div>
  );
}
