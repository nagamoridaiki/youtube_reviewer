import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import VideosListTemplate from '~/components/templates/VideoPlayerTemplate';
import Header from '~/components/organisms/Header';
import VideoInfo from '~/components/organisms/VideoInfo';
import VideosList from '~/components/organisms/VideosList';
import YouTubeInlineFrame from '~/components/atoms/YouTubeInlineFrame';
import Typography from '~/components/atoms/Typography';

const RecommendVideosWrapper = styled.div`
  padding: 10px;
  box-sizing: border-box;
`;

export const PlayerPagePresenter = ({
  videoId,
  videoData,
  relatedVideos,
  loadingRelatedVideos,
  onScrollEnd,
}) => (
  <VideosListTemplate
    headerContents={<Header />}
    playerContents={<YouTubeInlineFrame videoId={videoId} />}
    videoInfoContents={videoData && <VideoInfo item={videoData} />}
    relatedVideosListContents={(
      <RecommendVideosWrapper>
        <Typography variant="subtitle" bold>関連動画</Typography>
        <VideosList videos={relatedVideos} loading={loadingRelatedVideos} />
      </RecommendVideosWrapper>
    )}
    onScrollEnd={onScrollEnd}
  />
);

PlayerPagePresenter.propTypes = {
  videoId: PropTypes.string.isRequired,
  relatedVideos: PropTypes.arrayOf(PropTypes.shape({})),
  loadingRelatedVideos: PropTypes.bool,
  videoData: PropTypes.shape({}),
  onScrollEnd: PropTypes.func,
};

PlayerPagePresenter.defaultProps = {
  relatedVideos: [],
  loadingRelatedVideos: false,
  videoData: null,
  onScrollEnd: null,
};

export const PlayerPageContainer = ({
  api,
  presenter,
}) => {
  const { videoId } = useParams();
  const [videoData, setVideoData] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loadingRelatedVideos, setLoadingRelatedVideos] = useState(false);
  const [nextPageToken, setNextPageToken] = useState('');

  // 動画の詳細情報取得
  const getVideoData = async () => {
    const { data } = await api.getVideoData(videoId);
    setVideoData(data);
  };

  // 関連動画の取得
  const getRelatedVideos = async () => {
    if (loadingRelatedVideos) {
      // 関連動画読み込み中であれば何もしない
      return;
    }
    // 関連動画読み込み中のフラグをtrueにする
    setLoadingRelatedVideos(true);
    // APIから関連動画を取得
    const {
      data: {
        items: videos,
        // 前回関連動画を読み込んだ時に、nextPageTokenが返ってきていればそれを設定して続きから取得する
        nextPageToken: newNextPageToken,
      },
    } = await api.getRelatedVideos(videoId, nextPageToken);
    // 関連動画読み込み中のフラグをfalseにする
    setLoadingRelatedVideos(false);
    // 重複を削除して既に取得済みのものと結合してセット
    setRelatedVideos(relatedVideos.concat(videos.filter(
      ({ id: itemId }) => !relatedVideos.find(({ id }) => id === itemId),
    )));
    // 続きを取得するためのnextPageTokenを覚えておく
    setNextPageToken(newNextPageToken);
  };

  useEffect(() => {
    getVideoData();
    getRelatedVideos();
  }, [videoId]);

  return presenter({
    videoId,
    videoData,
    relatedVideos,
    loadingRelatedVideos,
    onScrollEnd: getRelatedVideos,
  });
};

PlayerPageContainer.propTypes = {
  api: PropTypes.shape({
    getRelatedVideos: PropTypes.func,
    getVideoData: PropTypes.func,
  }),
};

PlayerPageContainer.defaultProps = {
  api: {
    getVideoData: (videoId) => axios.get(`/api/videos/${videoId}`),
    getRelatedVideos: (videoId, pageToken = '') => axios.get(`/api/videos/${videoId}/related?pageToken=${pageToken}`),
  },
};

export default (props) => (
  <PlayerPageContainer
    presenter={PlayerPagePresenter}
    {...props}
  />
);
