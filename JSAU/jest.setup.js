global.window = {}; // Simule l'objet global `window`
window.api = {
  searchFile: jest.fn(), // Mock pour `searchFile`
  downloadFile: jest.fn(), // Mock pour `downloadFile`
  addToFavorites: jest.fn(), // Mock pour `addToFavorites`
  fetchFavorites: jest.fn(), // Mock pour `fetchFavorites`
  deleteFavorite: jest.fn(), // Mock pour `deleteFavorite`
};


 