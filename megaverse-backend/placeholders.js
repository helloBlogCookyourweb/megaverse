const EMPTY_POSITION = { type: "empty" };
let polyanets = [];
let saloons = [];
let comeths = [];

// Define constants for icons
const PLANET_ICON = '🪐';
const SALOON_ICON = '🔵';
const COMET_ICON_UP = '☄️';
const COMET_ICON_DOWN = '⬇️';
const MILKY_WAY_ICON = '🌌';

// Define colors
const COLORS = {
   white: '⚪',
   purple: '🟣',
   orange: '🟠',
   yellow: '🟡',
   green: '🟢',
   blue: '🔵' // Adding the color blue
};

// Function to get type icon emoji
function getTypeIcon(type) {
   if (type === null) {
       type = 3; // Set type to 3 if null
   }
  
   switch (type) {
       case 0:
           return PLANET_ICON; // Planet icon
       case 1:
           return SALOON_ICON; // Saloon icon (various colors)
       case 2:
           return getCometIcon("up"); // Comet icon (up)
       case 3:
           return MILKY_WAY_ICON; // Milky Way icon (default)
       default:
           return MILKY_WAY_ICON; // Default to Milky Way icon
   }
}

// Function to get color emoji
function getColorEmoji(color) {
   const emoji = COLORS[color];
   if (emoji === undefined) {
       const availableColors = Object.keys(COLORS).join(', ');
       throw new Error(`Color "${color}" is not correct or does not exist. Available colors are: ${availableColors}`);
   }
   return emoji;
}

// Function to get Comet icon (up or down)
function getCometIcon(direction) {
   return direction === "up" ? COMET_ICON_UP : COMET_ICON_DOWN;
}

// Function to create a Polyanet
function createPolyanet(row, column, type) {
   const newPolyanet = {
       id: polyanets.length + 1,
       type: getTypeIcon(type),
       row: row,
       column: column
   };
   polyanets.push(newPolyanet);
   return newPolyanet;
}

// Function to retrieve a Polyanet by ID
function getPolyanetById(polyanetId) {
   return polyanets.find(polyanet => polyanet.id === polyanetId);
}

// Function to retrieve all Polyanets
function getAllPolyanets() {
   return polyanets;
}

// Function to update a Polyanet by ID
function updatePolyanetById(polyanetId, newPolyanetData) {
   const updatedPolyanet = getPolyanetById(polyanetId);
   if (updatedPolyanet) {
       updatedPolyanet.type = getTypeIcon(newPolyanetData.type);
       updatedPolyanet.row = newPolyanetData.row !== undefined ? newPolyanetData.row : updatedPolyanet.row;
       updatedPolyanet.column = newPolyanetData.column !== undefined ? newPolyanetData.column : updatedPolyanet.column;
       updatedPolyanet.name = newPolyanetData.name !== undefined ? newPolyanetData.name : updatedPolyanet.name;
       // Update other properties as needed
       return updatedPolyanet;
   }
   return null;
}

// Function to delete a Polyanet by ID
function deletePolyanetById(polyanetId) {
   const index = polyanets.findIndex(polyanet => polyanet.id === polyanetId);
   if (index !== -1) {
       return polyanets.splice(index, 1)[0];
   }
   return null;
}

// Function to retrieve a Saloon by ID
function getSaloonById(saloonId) {
   return saloons.find(saloon => saloon.id === saloonId);
}

// Function to create a Saloon
function createSaloon(row, column, color) {
   // Check if there's already a saloon at the specified position
   const existingSaloon = saloons.find(saloon => saloon.row === row && saloon.column === column);
   if (existingSaloon) {
       throw new Error(`A saloon already exists at position (${row}, ${column}). You can only update or delete this saloon.`);
   }

   if (row < 1 || row > 11 || column < 1 || column > 11) {
       throw new Error('Row and column values must be within the grid bounds (1-11).');
   }

   if (!Object.keys(COLORS).includes(color)) {
       throw new Error(`Invalid color specified. Available colors are: ${Object.keys(COLORS).join(', ')}`);
   }

   const newSaloon = {
       id: saloons.length + 1,
       type: SALOON_ICON, // Using SALOON_ICON constant for consistency
       row: row,
       column: column,
       color: color
   };
   saloons.push(newSaloon);
   return newSaloon;
}


// Function to update a Saloon by ID
function updateSaloonById(saloonId, newSaloonData) {
   const updatedSaloon = getSaloonById(saloonId);
   if (!updatedSaloon) {
       throw new Error('Saloon not found.');
   }

   if (newSaloonData.color && !Object.keys(COLORS).includes(newSaloonData.color)) {
       throw new Error(`Invalid color specified. Available colors are: ${Object.keys(COLORS).join(', ')}`);
   }

   // Update saloon properties
   if (newSaloonData.color) {
       updatedSaloon.color = newSaloonData.color;
   }

   // You can update other properties as needed

   return updatedSaloon;
}

// Function to retrieve all Saloons
function getAllSaloons() {
   return saloons;
}

// Function to create a Comet
function createCometh(row, column, direction) {
   // Check if a Comet already exists at the specified position
   const existingCometh = comeths.find(cometh => cometh.row === row && cometh.column === column);
   if (existingCometh) {
       // If a Comet already exists at the specified position, return a warning message
       return { message: `A Comet already exists at position (${row}, ${column}). Please delete or update the existing Comet.` };
   }

   // Proceed with creating a new Comet if the position is available
   const newCometh = {
       id: comeths.length + 1,
       type: 'Cometh',
       direction: direction,
       row: row,
       column: column
   };
   comeths.push(newCometh);
   return newCometh;
}



// Function to retrieve a Comet by ID
function getComethById(comethId) {
   return comeths.find(cometh => cometh.id === comethId);
}

// Function to update a Comet by ID
function updateComethById(comethId, newComethData) {
   const updatedCometh = getComethById(comethId);
   if (updatedCometh) {
       updatedCometh.direction = newComethData.direction;
       // You can update other properties as needed
       return updatedCometh;
   }
   return null;
}

// Function to retrieve all Comets
function getAllComeths() {
   return { message: "All Comeths retrieved successfully", comeths: comeths.map(cometh => ({ id: cometh.id, type: cometh.type, row: cometh.row, column: cometh.column, direction: cometh.direction })) };
}



// Function to update all Polyanets
function updateAllPolyanets(updatedMap) {
   let updated = false; // Variable to track if any updates were made
   // Iterate over the provided map data
   for (let i = 0; i < updatedMap.length; i++) {
       for (let j = 0; j < updatedMap[i].length; j++) {
           const newPolyanetType = updatedMap[i][j].type;
           const polyanetToUpdate = polyanets.find(polyanet => polyanet.row === i + 1 && polyanet.column === j + 1);
           if (polyanetToUpdate) {
               if (newPolyanetType === "empty") {
                   // Set the type to 3, which represents an empty space
                   polyanetToUpdate.type = getTypeIcon(3);
                   updated = true; // Set the flag to true as an update is made
               } else if (polyanetToUpdate.type !== getTypeIcon(newPolyanetType)) {
                   // Update only if the new type is different from the existing type
                   polyanetToUpdate.type = getTypeIcon(newPolyanetType);
                   updated = true; // Set the flag to true as an update is made
               }
           }
       }
   }
   if (!updated) {
       // If no updates were made, return a message indicating no Polyanets were available for update
       return { message: "No Polyanets available for update", polyanets: [] };
   } else {
       // If updates were made, return the updated Polyanets
       return { message: "All Polyanets updated successfully", polyanets: polyanets };
   }
}





// Function to delete all Polyanets
function deleteAllPolyanets() {
   polyanets = [];
}

module.exports = {
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
};
