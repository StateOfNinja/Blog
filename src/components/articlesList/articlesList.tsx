import { Pagination, Spin, Alert } from 'antd';
import { useEffect, useState } from 'react';

import ArticleForm from '../article/articleForm/articleForm';
import { token } from '../../store/token';
import { IArticle } from '../../store/types-and-interfaces/article';
import { useGetArticlesQuery } from '../../store/slice/apiSlice';

import styles from './articlesList.module.css';

export default function ArticlesList() {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;
  const offset = (currentPage - 1) * limit;

  const { data, isLoading, error, refetch } = useGetArticlesQuery({ limit, offset, token });

  const articles: IArticle[] = data?.articles || [];

  const articlesCount: number = data?.articlesCount;

  function changePage(page: number): void {
    setCurrentPage(page);
  }

  useEffect(() => {
    refetch();
  }, [currentPage]);

  const erorr = error && <Alert message="Error Text" type="error" />;

  const loading = isLoading && <Spin size="large" />;

  const content = articles.map((article) => <ArticleForm key={article.slug} article={article}></ArticleForm>);

  const pagination = !isLoading && (
    <Pagination
      align="center"
      defaultCurrent={1}
      showSizeChanger={false}
      onChange={changePage}
      total={articlesCount * 2}
    />
  );

  return (
    <main className={styles.main}>
      <ul className={styles.articlesList}>
        {erorr}
        {loading}
        {content}
      </ul>
      {pagination}
    </main>
  );
}
