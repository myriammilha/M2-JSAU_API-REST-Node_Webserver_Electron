jest.mock('electron', () => ({
    contextBridge: {
        exposeInMainWorld: jest.fn(),
    },
}));

const {contextBridge} = require('electron');
const nock = require('nock');
global.fetch = require('node-fetch');
const {exposeAPI} = require('../preload');

describe('Preload API Tests', () => {
    const API_BASE_URL = 'http://localhost:8081';

    beforeEach(() => {
        nock.cleanAll();
        jest.clearAllMocks();
        exposeAPI();
    });

    afterAll(() => {
        nock.cleanAll();
    });

    it('should throw an error if the file is not found', async() => {
        const fileName = 'nonexistent';

        // Mock pour simuler une réponse 404
        nock(API_BASE_URL)
            .get(`/search?text=${fileName}`)
            .reply(404);

        // Récupérer l'API exposée
        const api = contextBridge.exposeInMainWorld.mock.calls[0][1];

        // Vérifier qu'une erreur est levée
        await expect(api.searchFile(fileName)).rejects.toThrow(
            `Le fichier "${fileName}" est introuvable.`
        );
    });
});
