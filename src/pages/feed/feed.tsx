import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder, TOrdersData } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  fetchFeed,
  getFeedSelector,
  selectLoading
} from '../../services/slices/burgerAppSlice';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const feed: TOrdersData = useSelector(getFeedSelector);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  if (loading) {
    return <Preloader />;
  }

  const handleGetFeeds = () => {
    dispatch(fetchFeed());
  };

  return <FeedUI orders={feed.orders} handleGetFeeds={handleGetFeeds} />;
};
