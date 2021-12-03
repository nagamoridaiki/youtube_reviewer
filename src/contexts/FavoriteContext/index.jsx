import React, { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import reducer from './reducer';

// React Contextの作成
const FavoriteContext = createContext();

const initialState = {
  favoriteIds: [],
};

// コンテキストプロバイダーコンポーネント
export const FavoriteProvider = ({ api, children }) => {
  // useReducerでreducer関数と初期値をセット
  const [state, dispatch] = useReducer(reducer, { ids: [] });
  const value = { state, dispatch };
  useEffect(() => {
    api.get().then(({ data }) => {
      dispatch({ type: 'init', ids: data });
    });
  }, []);

  return (
    // コンテキストプロバイダーとしてuseReducerのstateとdispatchをコンテキストに設定
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
};

FavoriteProvider.propTypes = {
  children: PropTypes.node.isRequired,
  api: PropTypes.shape({
    get: PropTypes.func,
  }),
};

FavoriteProvider.defaultProps = {
  api: {
    get: () => axios.get('/api/favorites'),
  },
};

export default FavoriteContext;
