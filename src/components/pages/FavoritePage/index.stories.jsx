import React from 'react';
import { FavoritePagePresenter as FavoritePage } from '.';
import sampleData from '~/components/organisms/VideosList/sampleData.json';

export default { title: 'pages/FavoritePage' };

export const favoritePage = () => <FavoritePage videos={sampleData} />;

export const loading = () => <FavoritePage loading />;
loading.story = { name: '取得中' };

export const noResult = () => <FavoritePage videos={[]} />;
noResult.story = { name: '結果が0件' };
