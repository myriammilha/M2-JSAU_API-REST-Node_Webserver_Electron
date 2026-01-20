import { handleSearchFile } from '../src/renderer';

describe('Tests for handleSearchFile', () => {
  beforeEach(() => {
    // Simuler le DOM pour les tests
    document.body.innerHTML = `
      <input id="search" value="testfile.txt">
      <button id="search-btn"></button>
      <p id="search-result"></p>
    `;

    // Mock de l'objet `window.api`
    window.api = {
      searchFile: jest.fn(),
    };
  });

  it('should display a success message when the file is found', async () => {
    // Simuler une réponse réussie de l'API
    window.api.searchFile.mockResolvedValueOnce();

    // Appeler la fonction
    await handleSearchFile();

    // Vérifier si la fonction a été appelée avec le bon argument
    expect(window.api.searchFile).toHaveBeenCalledWith('testfile.txt');

    // Vérifier si le message de succès a été affiché
    expect(document.getElementById('search-result').textContent).toBe(
      'Le fichier "testfile.txt" a été trouvé.'
    );
  });

  it('should display an error message when the file is not found', async () => {
    // Simuler une erreur de l'API
    const error = new Error('Fichier introuvable.');
    window.api.searchFile.mockRejectedValueOnce(error);

    // Appeler la fonction
    await handleSearchFile();

    // Vérifier si le message d'erreur a été affiché
    expect(document.getElementById('search-result').textContent).toBe(
      'Fichier introuvable.'
    );
  });
});
