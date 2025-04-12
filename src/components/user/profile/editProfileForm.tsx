import { useForm } from 'react-hook-form';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { IEditProfile, TSignError } from '../../../store/types-and-interfaces/sign';
import { useEditProfileMutation } from '../../../store/slice/apiSlice';
import { setUser } from '../../../store/slice/userSlice';
import styles from '../../../style/form.module.css';

export default function EditProfileForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<IEditProfile>();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [editProfileForm, { isLoading }] = useEditProfileMutation();

  const user = useSelector((state) => state.user.user);

  const token = JSON.parse(localStorage.getItem('user')).token;

  async function onSubmit(data: IEditProfile) {
    try {
      const response = await editProfileForm({ data, token }).unwrap();
      dispatch(
        setUser({
          username: response.user.username,
          email: response.user.email,
          token: response.user.token,
          image: response.user.image,
          password: response.user.password,
        })
      );
      localStorage.setItem('user', JSON.stringify(response.user));
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
      <form className={`${styles.form}`} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.formTitle}>Edit Profile</h1>
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
              defaultValue={user?.username}
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
              className={styles.input}
              placeholder="Email address"
              defaultValue={user?.email}
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
              New password
            </label>
            <input
              type="password"
              id="password"
              className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
              placeholder="New password"
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
            <label htmlFor="avatarImage" className={styles.label}>
              Avatar image (url)
            </label>
            <input
              type="text"
              id="avatarImage"
              className={`${styles.input} ${errors.avatarImage ? styles.inputError : ''}`}
              placeholder="Avatar Image"
              defaultValue={user?.image}
              {...register('image', {
                pattern: {
                  value: /^https?:\/\/(?:[\w-]+\.)+[a-z]{2,}(\/\S*)?$/i,
                  message: 'Не корректные данные',
                },
              })}
            />
            {errors.image && <span className={styles.error}>{String(errors.image.message)}</span>}
          </li>
        </ul>
        <Button type="primary" htmlType="submit" className={`${styles.formBtn} ${isLoading ? styles.disabled : ''}`}>
          Save
        </Button>
      </form>
    </div>
  );
}
