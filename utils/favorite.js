const fs = require('fs');

const FAVORITE_IDS_FILE = './favoriteIds.json';

// お気に入りリストの読み込み
module.exports.readFavoriteIds = () => new Promise((resolve, reject) => {
  fs.readFile(FAVORITE_IDS_FILE, 'utf-8', (err, data) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(data ? JSON.parse(data) : []);
  });
});

// お気に入りリストへの書き込み
module.exports.writeFavoriteIds = (favoriteIds) => new Promise((resolve, reject) => {
  fs.writeFile(FAVORITE_IDS_FILE, JSON.stringify(favoriteIds), (err) => {
    if (err) {
      reject(err);
      return;
    }
    resolve();
  });
});
