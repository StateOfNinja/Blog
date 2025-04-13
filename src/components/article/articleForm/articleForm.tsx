import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';
import { format } from 'date-fns';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ReactMarkdown from 'react-markdown';

import { IProfileData } from '../../../store/types-and-interfaces/profile';
import { RootState } from '../../../store/store';
import { IDataResponse } from '../../../store/types-and-interfaces/article';
import { deleteArticle } from '../../../store/slice/articleSlice';
import { useDeleteArticleMutation, useToggleFavoriteArticleMutation } from '../../../store/slice/apiSlice';

import styles from './articleForm.module.css';

export default function ArticleForm(article: IDataResponse) {
  const { title, slug, favoritesCount, description, favorited, createdAt, tagList, author, body } = article.article;

  const [deleteArticleApi] = useDeleteArticleMutation();

  const [toggleFavoriteArticle] = useToggleFavoriteArticleMutation();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  function handleDeleteArticle() {
    deleteArticleApi({ slug })
      .unwrap()
      .then(() => {
        dispatch(deleteArticle(slug));
        navigate('/articles');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const user = useSelector((state: RootState) => state.user.user) as IProfileData | null;

  const authorName = author.username;

  const isAuthor = user?.username === authorName;

  const userAvatar = author.image;

  const convertedDate = format(new Date(createdAt), 'MMMM d y');

  const location = useLocation();
  const isArticlePage = location.pathname.includes('/articles/');

  async function toggleFavorite() {
    try {
      await toggleFavoriteArticle({ slug, favorite: favorited }).unwrap();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className={`${styles.article} ${isArticlePage ? styles.full : ''}`}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.title}>
            {isArticlePage ? title : <Link to={`/articles/${slug}`}>{title}</Link>}
            <button className={styles.favorites} onClick={toggleFavorite}>
              <span>{favorited ? <HeartFilled /> : <HeartOutlined />}</span>
              <span className={styles.favoritesNumber}>{favoritesCount}</span>
            </button>
          </div>
          <ul className={styles.tags}>
            {tagList.map(
              (tag, key) =>
                tag && (
                  <li key={key} className={styles.tag}>
                    {tag}
                  </li>
                )
            )}
          </ul>
          <div className={styles.description}>{description}</div>
        </div>
        <div className={styles.info}>
          <div className={styles.infoContainer}>
            <div className={styles.author}>
              <span className={styles.name}>{authorName}</span>
              <span className={styles.date}>{convertedDate}</span>
            </div>
            <img src={userAvatar} alt="avatar" className={styles.avatar} />
          </div>
          {isArticlePage && isAuthor && (
            <div className={styles.controls}>
              <Popconfirm
                placement="right"
                title="Действительно хотите далить статью ?"
                okText="Да"
                cancelText="Нет"
                onConfirm={handleDeleteArticle}
              >
                <Button danger className="link-btn link-btn--delete">
                  Delete
                </Button>
              </Popconfirm>
              <Link to={`/articles/${slug}/edit`}>
                <Button color="green" variant="outlined" className="link-btn link-btn--edit">
                  Edit
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
      {isArticlePage && (
        <div className={styles.markdown}>
          <ReactMarkdown>{body}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
