import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { ArticlesPage } from '../../pages/ArticlesPage';
import { ArticlePage } from '../../pages/ArticlePage';
import { EditProfilePage } from '../../pages/EditProfilePage';
import { NewArticlePage } from '../../pages/NewArticlePage';
import { SignInPage } from '../../pages/SignInPage';
import { SignUpPage } from '../../pages/SignUpPage';
import { AppLayout } from '../AppLayout';
import { RequireAuth } from '../../hoc/RequireAuth';
import { getUser } from '../../redux/slices/userSlice';
import { ROUTES } from '../../routes';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(getUser(localStorage.getItem('token')));
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<AppLayout />}>
        <Route index element={<ArticlesPage />} />
        <Route path={ROUTES.ARTICLES} element={<ArticlesPage />} />
        <Route path={ROUTES.ARTICLE_DETAILS} element={<ArticlePage />} /> {/* Обновлено */}
        <Route path={ROUTES.SIGN_IN} element={<SignInPage />} />
        <Route path={ROUTES.SIGN_UP} element={<SignUpPage />} />
        <Route
          path={ROUTES.EDIT_PROFILE}
          element={
            <RequireAuth>
              <EditProfilePage />
            </RequireAuth>
          }
        />
        <Route
          path={ROUTES.NEW_ARTICLE}
          element={
            <RequireAuth>
              <NewArticlePage />
            </RequireAuth>
          }
        />
        <Route path="*" element={<h2>NotFoundPage</h2>} />
      </Route>
    </Routes>
  );
};

export default App;
