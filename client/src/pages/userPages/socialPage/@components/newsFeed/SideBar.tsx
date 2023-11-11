import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import NewsCard from './@components/NewsCard';
import { useContext, useEffect, useMemo, useState } from 'react';
import axiosErrorHandler from '../../../../../config/axiosErrorHandler';
import { SkeletonLoader } from '../../../../../components/loader';
import { SnackbarContext } from '../../../../../context/SnackbarContext';
import { AuthContext } from '../../../../../context';
import { NEWS_FEED_URL } from '../../../../../services';

const SideBarContainer = styled(Box)(() => ({
  flex: 4,
  background: '#f0fbff',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  // justifyContent: 'center',
}));

interface INewsFeedData {
  title: string;
  pubDate: string;
  link: string;
  description: string;
  image_url: string;
}

const SideBar = () => {
  const { snackbarShowMessage } = useContext(SnackbarContext);
  const { logout } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const news = useMemo(() => {
    return { articles: [] } as { articles: INewsFeedData[] };
  }, []);

  async function getAllNewsFeed() {
    const response = await axiosErrorHandler({
      endpoint: NEWS_FEED_URL,
      methodType: 'GET',
      snackbarShowMessage,
      logout,
    });

    if (response) {
      for (let i = 0; i < response.length; i++) {
        // eslint-disable-next-line camelcase
        const { title, image_url, description, pubDate, link } = response[i];
        news['articles'].push({
          title,
          // eslint-disable-next-line camelcase
          image_url: image_url,
          description,
          pubDate,
          link,
        });
      }

      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAllNewsFeed();
  }, []);

  return (
    <SideBarContainer>
      {isLoading ? (
        <>
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
        </>
      ) : (
        <>
          {Object.keys(news).includes('articles') &&
            news.articles?.length > 0 &&
            news.articles.map((newsItem) => {
              return (
                <NewsCard
                  key={crypto.randomUUID()}
                  title={newsItem.title}
                  publishedDate={newsItem.pubDate}
                  articleLink={newsItem.link}
                  content={newsItem.description}
                  media={newsItem.image_url}
                />
              );
            })}
        </>
      )}
    </SideBarContainer>
  );
};

export default SideBar;
