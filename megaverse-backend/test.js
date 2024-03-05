// test.js

const request = require('supertest');
const app = require('./server'); // Assuming your Express app is defined in server.js

describe('GET /', () => {
  it('should respond with 200 and welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Welcome to the Megaverse API. Mock server is running');
  });
});

describe('POST /api/polyanets', () => {
  it('should create polyanets and respond with 200', async () => {
    const mockMap = [[null, null, null], [null, null, null], [null, null, null]];
    const response = await request(app)
      .post('/api/polyanets')
      .send({ map: mockMap });
    expect(response.status).toBe(200);
   
  });
});

//test case for the GET /api/polyanets 

const placeholders = require('./placeholders');

describe('Polyanet Management', () => {
  beforeEach(() => {
    // Reset the state before each test
    placeholders.deleteAllPolyanets();
  });

  it('should create a new polyanet', () => {
    const row = 1;
    const column = 1;
    const type = 0; // Assuming type 0 represents a planet
    const newPolyanet = placeholders.createPolyanet(row, column, type);

    expect(newPolyanet).toBeDefined();
    expect(newPolyanet.id).toBe(1); // Since it's the first polyanet created
    expect(newPolyanet.type).toBe('🪐'); // Assuming '🪐' represents a planet
    expect(newPolyanet.row).toBe(row);
    expect(newPolyanet.column).toBe(column);

    const allPolyanets = placeholders.getAllPolyanets();
    expect(allPolyanets).toHaveLength(1);
    expect(allPolyanets[0]).toEqual(newPolyanet);
  });

  it('should delete an existing polyanet', () => {
    const row = 2;
    const column = 2;
    const type = 1; // Assuming type 1 represents a saloon
    const newPolyanet = placeholders.createPolyanet(row, column, type);

    let allPolyanets = placeholders.getAllPolyanets();
    expect(allPolyanets).toHaveLength(1);

    const deletedPolyanet = placeholders.deletePolyanetById(newPolyanet.id);
    expect(deletedPolyanet).toEqual(newPolyanet);

    allPolyanets = placeholders.getAllPolyanets();
    expect(allPolyanets).toHaveLength(0);
  });

  it('should update an existing polyanet', () => {
    const row = 3;
    const column = 3;
    const type = 2; // Assuming type 2 represents a comet
    const newType = 0; // Assuming type 0 represents a planet
    const newPolyanet = placeholders.createPolyanet(row, column, type);

    const updatedPolyanet = placeholders.updatePolyanetById(newPolyanet.id, { type: newType });
    expect(updatedPolyanet).toBeDefined();
    expect(updatedPolyanet.id).toBe(newPolyanet.id);
    expect(updatedPolyanet.type).toBe('🪐'); // Assuming '🪐' represents a planet

    const allPolyanets = placeholders.getAllPolyanets();
    expect(allPolyanets).toHaveLength(1);
    expect(allPolyanets[0]).toEqual(updatedPolyanet);
  });
});
