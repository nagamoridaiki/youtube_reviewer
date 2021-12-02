import React from 'react';
import { FavoriteButtonPresenter as FavoriteButton } from '.';

export default { title: 'molecules/FavoriteButton' };

export const isNotFavorite = () => <FavoriteButton />;
export const isFavorite = () => <FavoriteButton isFavorite />;
