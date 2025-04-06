import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import './articleForm.css';

export default function ArticleForm(article) {
  const { title, slug, favoritesCount, description, favorited, createdAt, tagList, author, body } = article.article;

  const userName = author.username;

  const userAvatar = author.image;

  const convertedDate = format(new Date(createdAt), 'MMMM d y');

  const location = useLocation();
  const isArticlePage = location.pathname.includes('/articles/');

  return (
    <div className={`article ${isArticlePage ? 'article-page ' : ''}`}>
      <div className="article__wrapper">
        <div className="article__content">
          <div className="article__content-title">
            {isArticlePage ? title : <Link to={`/articles/${slug}`}>{title}</Link>}

            <button className="favorites">
              <span>{favorited ? <HeartFilled /> : <HeartOutlined />}</span>
              <span className="favorites-number">{favoritesCount}</span>
            </button>
          </div>

          <ul className="article__content-tags">
            {tagList.map((tag) => tag && <li className="article__content-tag">{tag}</li>)}
          </ul>
          <div className="article__content-description">{description}</div>
        </div>

        <div className="article__info-wrapper">
          <div className="article__info">
            <span className="article__info-name">{userName}</span>
            <span className="article__info-date">{convertedDate}</span>
          </div>
          <img src={userAvatar} alt="avatar" className="avatar" />
        </div>
      </div>
      {isArticlePage && (
        <div className="markdown-body">
          <ReactMarkdown>{body}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
