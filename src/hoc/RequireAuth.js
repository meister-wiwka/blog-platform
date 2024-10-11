import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { ROUTES } from '../routes';

const RequireAuth = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();

  if (!user) {
    return <Navigate to={ROUTES.SIGN_IN} state={{ from: location }} />;
  }

  return children;
};

export { RequireAuth };
