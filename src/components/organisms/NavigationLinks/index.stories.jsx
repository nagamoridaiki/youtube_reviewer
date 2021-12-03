import React from 'react';
import { NavigationLinksPresenter as NavigationLinks } from '.';

export default { title: 'organisms/NavigationLinks' };

export const currentIsTop = () => <NavigationLinks currentPath="/" />;
export const currentIsFavorites = () => <NavigationLinks currentPath="/favorites" />;
export const currentIsPlayer = () => <NavigationLinks currentPath="/play/xxxx" />;
