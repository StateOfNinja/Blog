import { useParams } from 'react-router-dom';

import { useGetArticleQuery } from '../../../store/slice/apiSlice';
import ArticleForm from '../articleForm/articleForm';

export default function ArticlePage() {
  const { slug } = useParams();
  const { data, isLoading, error } = useGetArticleQuery(slug);

  if (isLoading) return <div>isLoading</div>;
  if (error) return <div>error</div>;

  return (
    <div className="article-page">
      <ArticleForm article={data.article} />
    </div>
  );
}
