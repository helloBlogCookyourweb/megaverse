const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Route handler for creating Polyanets
app.post('/api/polyanets', (req, res) => {
  const { row, column } = req.body;
  const newPolyanet = { row, column };
  
  // Log the request body
  console.log('POST request to /api/polyanets:', req.body);
  
  // Include the message in the response
  const responseMessage = 'Polyanet created successfully';
  res.status(200).json({ message: responseMessage, polyanet: newPolyanet });
});

// Route handler for retrieving a specific Polyanet by ID
app.get('/api/polyanets/:id', (req, res) => {
  const polyanetId = req.params.id;
  
  // Retrieve the Polyanet from the database or any other data source
  // For demonstration purposes, we'll just send a mock response
  const polyanet = {
    id: polyanetId,
    name: 'Sample Polyanet',
    // Other properties of the Polyanet
  };
  
  res.status(200).json({ message: 'GET request to /api/polyanets/:id successful', polyanet });
});

// Route handler for creating Saloons
app.post('/api/saloons', (req, res) => {
  const { row, column, color } = req.body;
  const newSaloon = { row, column, color };
  
  // Log the request body
  console.log('POST request to /api/saloons:', req.body);
  
  // Include the message in the response
  const responseMessage = 'Saloon created successfully';
  res.status(200).json({ message: responseMessage, saloon: newSaloon });
});

// Route handler to retrieve a specific saloon by ID
app.get('/api/saloons/:id', (req, res) => {
  const saloonId = req.params.id;
  
  // Retrieve the saloon from the database or any other data source
  // For demonstration purposes, we'll just send a mock response
  const saloon = {
    id: saloonId,
    name: 'Sample Saloon',
    color: 'blue',
    // Other properties of the saloon
  };
  
  res.status(200).json({ message: 'GET request to /api/saloons/:id successful', saloon });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
