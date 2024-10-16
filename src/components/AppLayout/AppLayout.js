import { Button, Avatar, ConfigProvider } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';

import { logOut } from '../../redux/slices/userSlice';

import classes from './AppLayout.module.scss';
import { ROUTES } from '../../routes';

const AppLayout = () => {
  return (
    <div className={classes.app}>
      <header className={classes.header}>
        <Link to={ROUTES.HOME}>
          <Button size="large" type="link">
            Realworld Blog
          </Button>
        </Link>
        <div className={classes.menu}>
          <Menu />
        </div>
      </header>
      <main className={classes.main}>
        <Outlet />
      </main>
    </div>
  );
};

const Menu = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  if (user) {
    return (
      <>
        <Link to={ROUTES.NEW_ARTICLE}>
          <ConfigProvider
            theme={{
              token: { colorPrimary: '#00b96b' },
            }}
          >
            <Button size="large">Create article</Button>
          </ConfigProvider>
        </Link>
        <Link to={ROUTES.EDIT_PROFILE} style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.88)' }}>
          <div className={classes.profile}>
            <span className={classes.username}>{user.username}</span>
            <Avatar src={user.image} size={40} />
          </div>
        </Link>
        <Button
          size="large"
          onClick={() => {
            dispatch(logOut());
          }}
        >
          Log Out
        </Button>
      </>
    );
  }

  return (
    <>
      <Link to={ROUTES.SIGN_IN}>
        <Button size="large">Sign In</Button>
      </Link>
      <Link to={ROUTES.SIGN_UP}>
        <ConfigProvider
          theme={{
            token: { colorPrimary: '#00b96b' },
          }}
        >
          <Button size="large">Sign Up</Button>
        </ConfigProvider>
      </Link>
    </>
  );
};

export default AppLayout;