import { Avatar, Button, ConfigProvider, Modal } from 'antd';
import { format } from 'date-fns';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { changeSuccess, deleteArticle } from '../../redux/slices/articlesSlice';

import classes from './ArticleMeta.module.scss';
import { ROUTES } from '../../routes';

const { confirm } = Modal;

const ArticleMeta = ({ username, avatar, date, author, slug, single }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { success } = useSelector((state) => state.articles);
  
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      dispatch(changeSuccess());
      navigate('/');
    }
  }, [dispatch, success, navigate]);

  const showConfirm = () => {
    confirm({
      title: 'Do you want to delete this article?',
      content: 'This action cannot be undone.',
      onOk() {
        dispatch(deleteArticle({ slug, token: user.token }));
      },
      onCancel() {},
    });
  };

  let menu = null;

  if (user && user.username === author && single) {
    menu = (
      <div className={classes.menu}>
        <Button danger onClick={showConfirm}>
          Delete
        </Button>
        <Link to={ROUTES.ARTICLE.replace(':slug', slug) + '/edit'}>
          <ConfigProvider
            theme={{
              token: { colorPrimary: '#00b96b' },
            }}
          >
            <Button>Edit</Button>
          </ConfigProvider>
        </Link>
      </div>
    );
  }

  return (
    <div className={classes.meta}>
      <div className={classes.wrapper}>
        <div className={classes.info}>
          <h2>{username}</h2>
          <span className={classes.created}>{format(new Date(date), 'MMMM d, y')}</span>
        </div>
        <Avatar src={avatar} size={55} />
      </div>
      {menu}
    </div>
  );
};

export default ArticleMeta;
