const express = require('express');
const bodyParser = require('body-parser');
const {
   createPolyanet,
   getPolyanetById,
   getAllPolyanets,
   updatePolyanetById,
   deletePolyanetById,
   createSaloon,
   getSaloonById,
   updateSaloonById,
   getAllSaloons,
   createCometh,
   getComethById,
   updateComethById,
   getAllComeths,
   updateAllPolyanets,
   deleteAllPolyanets,
   EMPTY_POSITION
} = require('./placeholders');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
   res.send('Welcome to the Megaverse API. Mock server is running');
});

let isGridFull = false; // Variable to track if the grid is full

// Polyanets Endpoints
app.post('/api/polyanets', (req, res) => {
   if (!isGridFull) {
       const initialMap = req.body.map;
       const createdPolyanets = [];
       let addedPolyanets = 0;
       initialMap.forEach((row, rowIndex) => {
           if (rowIndex < 11) {
               row.forEach((cell, columnIndex) => {
                   if (columnIndex < 11) {
                       if (cell === null) {
                           const newPolyanet = createPolyanet(rowIndex + 1, columnIndex + 1, 3);
                           createdPolyanets.push(newPolyanet);
                           addedPolyanets++;
                       } else {
                           const newPolyanet = createPolyanet(rowIndex + 1, columnIndex + 1, cell.type);
                           createdPolyanets.push(newPolyanet);
                           addedPolyanets++;
                       }
                   }
               });
           }
       });
       if (addedPolyanets === 121) {
           isGridFull = true;
       }
       res.status(200).json({ message: 'Polyanets created successfully', polyanets: createdPolyanets });
   } else {
       res.status(400).json({ message: 'Cannot add more polyanets. Grid is already full.' });
   }
});

app.get('/api/polyanets/:id', (req, res) => {
   const polyanetId = parseInt(req.params.id);
   const polyanet = getPolyanetById(polyanetId);
   if (polyanet) {
       res.status(200).json({ message: 'Polyanet retrieved successfully', polyanet });
   } else {
       res.status(404).json({ message: 'Polyanet not found' });
   }
});

// Endpoint to retrieve all Polyanets
app.get('/api/polyanets', (req, res) => {
    const allPolyanets = getAllPolyanets();
    if (allPolyanets.length === 0) {
        // If there are no Polyanets available, respond with a message indicating so
        return res.status(200).json({ message: 'No Polyanets available', polyanets: [] });
    }
    // If there are Polyanets available, respond with the retrieved Polyanets
    res.status(200).json({ message: 'All Polyanets retrieved successfully', polyanets: allPolyanets });
});

app.put('/api/polyanets/:id', (req, res) => {
   const polyanetId = parseInt(req.params.id);
   const newPolyanetData = req.body;
   const updatedPolyanet = updatePolyanetById(polyanetId, newPolyanetData);
   if (updatedPolyanet) {
       res.status(200).json({ message: 'Polyanet updated successfully', polyanet: updatedPolyanet });
   } else {
       res.status(404).json({ message: 'Polyanet not found' });
   }
});

app.delete('/api/polyanets/:id', (req, res) => {
   const polyanetId = parseInt(req.params.id);
   const deletedPolyanet = deletePolyanetById(polyanetId);
   if (deletedPolyanet) {
       res.status(200).json({ message: 'Polyanet deleted successfully', polyanet: deletedPolyanet });
   } else {
       res.status(404).json({ message: 'Polyanet not found' });
   }
});

app.delete('/api/polyanets', (req, res) => {
   deleteAllPolyanets();
   isGridFull = false;
   res.status(200).json({ message: 'All Polyanets deleted successfully' });
});

// Saloons Endpoints
app.post('/api/saloons', (req, res) => {
   const { row, column, color } = req.body;
   try {
       const newSaloon = createSaloon(row, column, color);
       res.status(201).json({ message: 'Saloon created successfully', saloon: newSaloon });
   } catch (error) {
       res.status(400).json({ message: error.message });
   }
});

app.get('/api/saloons', (req, res) => {
   const allSaloons = getAllSaloons();
   res.status(200).json({ message: 'All Saloons retrieved successfully', saloons: allSaloons });
});

app.put('/api/saloons/:id', (req, res) => {
   const saloonId = parseInt(req.params.id);
   const newSaloonData = req.body;
   try {
       const updatedSaloon = updateSaloonById(saloonId, newSaloonData);
       res.status(200).json({ message: 'Saloon updated successfully', saloon: updatedSaloon });
   } catch (error) {
       res.status(404).json({ message: error.message });
   }
});

// Comeths Endpoints
app.post('/api/comeths', (req, res) => {
   const { direction } = req.body;
   const newCometh = createCometh(direction);
   if (newCometh) {
       res.status(201).json({ message: 'Cometh created successfully', cometh: newCometh });
   } else {
       res.status(400).json({ message: 'Invalid cometh creation request' });
   }
});

app.get('/api/comeths', (req, res) => {
   const allComeths = getAllComeths();
   res.status(200).json({ message: 'All Comeths retrieved successfully', comeths: allComeths });
});

app.put('/api/comeths/:id', (req, res) => {
   const comethId = parseInt(req.params.id);
   const newComethData = req.body;
   const updatedCometh = updateComethById(comethId, newComethData);
   if (updatedCometh) {
       res.status(200).json({ message: 'Cometh updated successfully', cometh: updatedCometh });
   } else {
       res.status(404).json({ message: 'Cometh not found' });
   }
});

// Define endpoint to get a Cometh by its ID
app.get('/api/comeths/:id', (req, res) => {
    const comethId = parseInt(req.params.id);
    const cometh = getComethById(comethId);
    if (cometh) {
        res.status(200).json({ message: 'Cometh retrieved successfully', cometh });
    } else {
        res.status(404).json({ message: 'Cometh not found' });
    }
 });

// Endpoint to update all Polyanets
app.put('/api/polyanets/', (req, res) => {
    const updatedMap = req.body.map;
    const updateResponse = updateAllPolyanets(updatedMap);
    if (updateResponse.polyanets.length > 0) {
        res.status(200).json({ message: 'All Polyanets updated successfully', polyanets: updateResponse.polyanets });
    } else {
        res.status(404).json({ message: 'No Polyanets available' });
    }
});

app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});
