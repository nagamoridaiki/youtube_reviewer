import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import TopPage from '~/components/pages/TopPage';
import PlayerPage from '~/components/pages/PlayerPage';
import FavoritePage from '~/components/pages/FavoritePage';
import NotFoundPage from '~/components/pages/NotFoundPage';

const AppRouting = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact title="トップ" component={TopPage} />
      <Route path="/play/:videoId" title="動画再生" component={PlayerPage} />
      <Route path="/favorites" title="お気に入り" component={FavoritePage} />
      <Route path="*" component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
);

export default AppRouting;
