import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import styled from 'styled-components';
import FavoriteContext from '~/contexts/FavoriteContext';
import VideosListTemplate from '~/components/templates/VideosListTemplate';
import Header from '~/components/organisms/Header';
import VideosList from '~/components/organisms/VideosList';
import Typography from '~/components/atoms/Typography';

const SubTitle = styled(Typography).attrs({ size: 'title' })`
  margin-top: 10px;
`;

export const FavoritePagePresenter = ({
  videos,
  loading,
}) => (
  <VideosListTemplate
    headerContents={<Header />}
    titleContents={(
      <SubTitle size="title">お気に入り動画</SubTitle>
    )}
    videosListContents={<VideosList videos={videos} loading={loading} />}
  />
);

FavoritePagePresenter.propTypes = {
  videos: VideosList.propTypes.videos,
  loading: PropTypes.bool,
};

FavoritePagePresenter.defaultProps = {
  videos: [],
  loading: false,
};

const FavoritePageContainer = ({
  api,
  presenter,
}) => {
  const { state: { ids, initialized } } = useContext(FavoriteContext);
  const [videos, setVideos] = useState();
  const [loading, setLoading] = useState(false);

  const getVideos = async () => {
    // お気に入り動画の取得
    setLoading(true);
    const {
      data: {
        items,
      },
    } = await api.getFavoriteVideos();
    setVideos(items);
    setLoading(false);
  };

  // お気に入りが変わったらお気に入り動画を取得
  useEffect(() => {
    if (!initialized) {
      // お気に入りがまだ設定されていなければ何もしない
      return;
    }
    getVideos();
  }, [ids]);

  return presenter({
    videos,
    loading,
  });
};

FavoritePageContainer.propTypes = {
  api: PropTypes.shape({
    getFavoriteList: PropTypes.func,
  }),
  presenter: PropTypes.func.isRequired,
};

FavoritePageContainer.defaultProps = {
  api: {
    getFavoriteVideos: () => axios.get('/api/videos/favorites'),
  },
};

export default (props) => (
  <FavoritePageContainer
    presenter={FavoritePagePresenter}
    {...props}
  />
);
