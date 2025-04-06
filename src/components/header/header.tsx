import { Link } from 'react-router-dom';

import './header.css';

export default function Header() {
  // const headerAuthorization = (
  //   <div className="auth-links">
  //     <Link to={'/sign-in'}>
  //       <div className="link-btn link-btn--black auth-links__link">Sign In</div>
  //     </Link>
  //     <Link to={'/sign-up'}>
  //       <div className="link-btn link-btn--green auth-links__link link-login">Sign Up</div>
  //     </Link>
  //   </div>
  // );

  const headerProfile = (
    <div className="profile">
      <Link to={'/new-article'}>
        <div className="link-btn link-btn--green create-article">Create article</div>
      </Link>
      <Link to={'/profile'} className="profile-info">
        <div className="profile-info__name">123</div>
        <div className="profile-info__avatar">qwe</div>
      </Link>
      <Link to={'/articles'}>
        <div className="link-btn link-btn--black log-out">Log Out</div>
      </Link>
    </div>
  );

  return (
    <header className="header">
      <Link to={'/articles'}>
        <div className="header__title">Realworld Blog</div>
      </Link>
      {headerProfile}
    </header>
  );
}
