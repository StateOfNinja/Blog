import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';

import { logOut, getUser } from '../../store/slice/userSlice';

import styles from './header.module.css';

export default function Header() {
  const user = useSelector((state) => state.user.user);

  const avatar = user?.image ? user.image : 'https://static.productionready.io/images/smiley-cyrus.jpg';

  const dispatch = useDispatch();

  function clickLogOut() {
    dispatch(logOut());
  }

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const headerAuthorization = (
    <div className={styles.authLinks}>
      <Link to="/sign-in">
        <Button color="default" variant="outlined" className={`${styles.linkBtn} ${styles.createArticle}`}>
          Sign In
        </Button>
      </Link>
      <Link to="/sign-up">
        <Button color="green" variant="outlined" className={`${styles.linkBtn} ${styles.createArticle}`}>
          Sign Up
        </Button>
      </Link>
    </div>
  );

  const headerProfile = (
    <div className={styles.profile}>
      <Link to="/new-article">
        <Button color="green" variant="outlined" className={`${styles.linkBtn} ${styles.createArticle}`}>
          Create article
        </Button>
      </Link>
      <Link to="/profile" className={styles.profileInfo}>
        <div className={styles.profileInfoName}>{user?.username}</div>
        <img src={avatar} alt="user avatar" className={styles.avatar} />
      </Link>
      <Link to="/articles">
        <Button
          color="default"
          variant="outlined"
          className={`${styles.linkBtn} ${styles.linkBtnBlack} ${styles.logOut}`}
          onClick={clickLogOut}
        >
          Log Out
        </Button>
      </Link>
    </div>
  );

  return (
    <header className={styles.header}>
      <Link to="/articles">
        <div className={styles.title}>Realworld Blog</div>
      </Link>
      {user ? headerProfile : headerAuthorization}
    </header>
  );
}
