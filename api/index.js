const express = require('express');
const { google } = require('googleapis');
const { readFavoriteIds, writeFavoriteIds } = require('../utils/favorite');

/* 先ほど取得したAPIキーを設定する */
const YOUTUBE_API_KEY = 'XXXXXXXXXXXXXX';

const youtube = google.youtube({
  version: 'v3',
  auth: YOUTUBE_API_KEY,
});

const router = express.Router();

router.get('/videos/search/:keyword', (req, res, next) => {
  const { keyword } = req.params;
  const { pageToken } = req.query;
  (async () => {
    // 検索結果を動画IDで取得
    const { data: { items: idItems, nextPageToken } } = await youtube.search.list({
      part: 'id',
      q: keyword,
      type: 'video',
      maxResults: 20,
      pageToken,
    });
    // 動画の情報を取得
    const ids = idItems.map(({ id: { videoId } }) => videoId);
    const { data: { items } } = await youtube.videos.list({
      part: 'statistics,snippet',
      id: ids.join(','),
    });
    res.json({ items, nextPageToken });
  })().catch(next);

});

// お気に入り動画の取得
router.get('/videos/favorites', (req, res, next) => {
  (async () => {
    // お気に入り動画IDを取得
    const favoriteIds = await readFavoriteIds();
    if (!favoriteIds.length) {
      // お気に入りが1つもなければ空配列を返す
      res.json({ items: [] });
      return;
    }
    // お気に入りのIDから動画の取得
    const { data: { items } } = await youtube.videos.list({
      part: 'statistics,snippet',
      id: favoriteIds.join(','),
    });
    res.json({ items });
  })().catch(next);
});

router.get('/videos/:videoId', (req, res, next) => {
  const { videoId } = req.params;
  (async () => {
    // 動画の情報を取得
    const { data: { items } } = await youtube.videos.list({
      part: 'statistics,snippet',
      id: videoId,
    });
    res.json(items[0]);
  })().catch(next);
});

// 関連動画取得
router.get('/videos/:videoId/related', (req, res, next) => {
  const { videoId: relatedToVideoId } = req.params;
  const { pageToken } = req.query;
  (async () => {
    // 関連動画のIDを取得
    const { data: { items: idItems, nextPageToken } } = await youtube.search.list({
      part: 'id',
      relatedToVideoId,
      type: 'video',
      maxResults: 20,
      pageToken,
    });
    // 動画の情報を取得
    const ids = idItems.map(({ id: { videoId } }) => videoId);
    const { data: { items } } = await youtube.videos.list({
      part: 'statistics,snippet',
      id: ids.join(','),
    });
    res.json({ items, nextPageToken });
  })().catch(next);
});

// お気に入り動画ID一覧取得
router.get('/favorites', (req, res, next) => {
  readFavoriteIds().then((data) => {
    res.json(data);
  }).catch(next);
});

// お気に入り登録・解除
router.route('/favorites/:id')
  // お気に入り登録
  .post((req, res, next) => {
    (async () => {
      const { id } = req.params;
      // 現時点のお気に入りリストを読み込み
      const favoriteIds = await readFavoriteIds();
      if (favoriteIds.indexOf(id) === -1) {
        // パラメータに指定されたIDが現時点のお気に入りになかった場合
        // お気に入りリストに追加
        favoriteIds.unshift(id);
        // お気に入りリストを書き込む
        writeFavoriteIds(favoriteIds);
      }
      res.end();
    })().catch(next);
  })
  // お気に入り解除
  .delete((req, res, next) => {
    (async () => {
      const { id } = req.params;
      // 現時点のお気に入りリストを読み込み
      const favoriteIds = await readFavoriteIds();
      const indexOfId = favoriteIds.indexOf(id);
      if (indexOfId !== -1) {
        // パラメータに指定されたIDが現時点のお気に入りにあった場合
        // 指定されたIDを削除したものをお気に入りリストに書き込む
        writeFavoriteIds(favoriteIds.filter((favoriteId) => (favoriteId !== id)));
      }
      res.end();
    })().catch(next);
  });

module.exports = router;