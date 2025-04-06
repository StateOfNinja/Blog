import { Pagination, Spin, Empty, Alert } from 'antd';
import { useState } from 'react';

import ArticleForm from '../article/articleForm/articleForm';
import { useGetArticlesQuery } from '../../store/slice/apiSlice';

import './articlesList.css';

export default function ArticlesList() {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;
  const offset = (currentPage - 1) * limit;

  const { data, isLoading, error } = useGetArticlesQuery({ limit, offset });

  const articles: IArticle[] = data?.articles || [];

  const articlesCount = data?.articlesCount;

  interface IArticle {
    slug: string;
    author: { [key: string]: boolean | string };
    description: string;
    favorited: boolean;
    favoritesCount: number;
    tagList: string[];
    title: string;
    createdAt: string;
  }

  function changePage(page: number): void {
    setCurrentPage(page);
  }

  const erorr = error && <Alert message="Error Text" type="error" />;

  const loading = isLoading && <Spin size="large" />;

  const content =
    articles.length > 0
      ? articles.map((article) => <ArticleForm key={article.slug} article={article}></ArticleForm>)
      : !isLoading && <Empty description={'Ничего не найдено'} />;

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
    <main className="main">
      <ul className="articles-list">
        {erorr}
        {loading}
        {content}
      </ul>
      {pagination}
    </main>
  );
}
