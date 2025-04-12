import { Route, Routes } from 'react-router-dom';

import Layout from '../layout/layout';
import ArticlesList from '../articlesList/articlesList';
import ArticlePage from '../article/articlePage/articlePage';
import SignIn from '../user/signIn/signInForm';
import SignUp from '../user/signUp/signUpForm';
import EditProfileForm from '../user/profile/editProfileForm';
import CreateArticleForm from '../article/createArticle/createArticleForm';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ArticlesList />} />
        <Route path="articles" element={<ArticlesList />} />
        <Route path="articles/:slug" element={<ArticlePage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<EditProfileForm />}></Route>
        <Route path="/new-article" element={<CreateArticleForm />}></Route>
        <Route path="/articles/:slug/edit" element={<CreateArticleForm />}></Route>
      </Route>
    </Routes>
  );
}
