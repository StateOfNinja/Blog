import { useParams } from 'react-router-dom';
import { Spin, Alert, Flex } from 'antd';

import { useGetArticleQuery } from '../../../store/slice/apiSlice';
import ArticleForm from '../articleForm/articleForm';

import styles from './articlePage.module.css';

export default function ArticlePage() {
  const { slug } = useParams();

  const token = JSON.parse(localStorage.getItem('user'))?.token;

  const { data, isLoading, error } = useGetArticleQuery({ slug, token });

  const loading = isLoading && <Spin size="large" />;

  const isError = error && <Alert message="Материал не загружен" type="error" />;

  const content = !loading && !isError && <ArticleForm article={data.article} />;

  return (
    <div className={styles.articlePage}>
      <Flex justify="center">
        {isError}
        {loading}
      </Flex>
      {content}
    </div>
  );
}
