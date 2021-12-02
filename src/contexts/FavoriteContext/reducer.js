export default (state, action) => {
    switch (action.type) {
      case 'init': {
        // お気に入りリストの初期化
        const { ids } = action;
        // actionに渡されたidsで初期化する
        // また、initialized:trueを設定して初期化されたことを設定しておく
        return { ids, initialized: true };
      }
      case 'add': {
        // お気に入りリストへの追加
        // actionに渡された動画IDを追加する
        const { ids } = state;
        const { id } = action;
        const index = ids.indexOf(id);
        if (index !== -1) {
          // 既に存在するidならstateを変更しない
          return state;
        }
        ids.push(id);
        return { ...state, ids };
      }
      case 'remove': {
        // お気に入りリストから削除
        // actionに渡された動画IDを削除する
        const { ids } = state;
        const { id } = action;
        const index = ids.indexOf(id);
        if (index === -1) {
          // 存在しないidならstateを変更しない
          return state;
        }
        ids.splice(index, 1);
        return { ...state, ids };
      }
      default:
        throw new Error(`${action.type} is not defined.`);
    }
};
