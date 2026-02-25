const favoriteController = require('../controllers/favorite.controller');

module.exports = [
  {
    method: 'GET',
    path: '/favorites',
    options: favoriteController.getMyFavorites,
  },
  {
    method: 'POST',
    path: '/favorites',
    options: favoriteController.addFavorite,
  },
  {
    method: 'DELETE',
    path: '/favoritess/{productId}',
    options: favoriteController.removeFavorite,
  },
];