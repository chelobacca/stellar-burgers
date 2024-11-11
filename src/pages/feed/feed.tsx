import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder, TOrdersData } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  fetchFeed,
  getFeedSelector
} from '../../services/slices/burgerAppSlice';
import store, { useDispatch, useSelector } from '../../services/store';
import { getFeedsApi } from '@api';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const feed: TOrdersData = useSelector(getFeedSelector);

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  /** TODO: прелоудер */
  // if (!feed.orders.length) {
  //   return <Preloader />;
  // }

  const handleGetFeeds = () => {
    dispatch(fetchFeed());
    console.log(feed.orders);
  };

  return <FeedUI orders={feed.orders} handleGetFeeds={handleGetFeeds} />;
};
