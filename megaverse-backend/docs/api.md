# Megaverse API Documentation

## Introduction

Welcome to the documentation for the Megaverse API. This API serves as a mock server for managing Polyanets, Saloons, and Comeths within the Megaverse universe. This document provides detailed information about the available endpoints, their functionalities, request parameters, and response formats.

## Taks to be completed
- Write unit tests for all endpoints to ensure their functionality and reliability.
- Imlement error handling for edge cases and unexpected inputs in the endpoints.
- Conduct integration testing to verify the interactions between different components of the system.
- Consider implementing authentication and authorization mechanisms to secure the API endpoints.
- Optimize performance where possible, especially for endpoints handling large amounts of data.
- Consider implementing logging to track and monitor API requests and responses.
- Review and finalize the API documentation to ensure it's comprehensive and up to date.

## Base URL

The base URL for accessing the Megaverse API is:

http://localhost:3000

## Endpoints

### Polyanets

#### Create a Polyanet

- **Endpoint:** `POST /api/polyanets`
- **Description:** Creates a new Polyanet or multiple Polyanets based on the provided map data.
- **Request Body:**
  - `map` (array): A 2D array representing the initial map of the Megaverse. Each element in the array represents a cell on the grid.
- **Response:**
  - `message` (string): A message indicating the status of the operation. Possible messages:
    - "Polyanets created successfully": Indicates that the Polyanets were created successfully.
    - "Cannot add more polyanets. Grid is already full.": Indicates that the grid is already full, and no more Polyanets can be added.
  - `polyanets` (array): An array containing the details of the created Polyanets.

#### Get a Polyanet by ID

- **Endpoint:** `GET /api/polyanets/:id`
- **Description:** Retrieves the details of a specific Polyanet based on its ID.
- **Response:**
  - `message` (string): A message indicating the status of the operation. Possible messages:
    - "Polyanet retrieved successfully": Indicates that the Polyanet was retrieved successfully.
    - "Polyanet not found": Indicates that the specified Polyanet ID does not exist.
  - `polyanet` (object): Details of the retrieved Polyanet.

#### Get All Polyanets

- **Endpoint:** `GET /api/polyanets`
- **Description:** Retrieves all Polyanets currently present in the Megaverse.
- **Response:**
  - `message` (string): A message indicating the status of the operation. Possible messages:
    - "All Polyanets retrieved successfully": Indicates that all Polyanets were retrieved successfully.
    - "No Polyanets available": Indicates that there are no Polyanets available in the Megaverse.
  - `polyanets` (array): An array containing the details of all retrieved Polyanets.

#### Update a Polyanet by ID

- **Endpoint:** `PUT /api/polyanets/:id`
- **Description:** Updates the details of a specific Polyanet based on its ID.
- **Request Body:** An object containing the updated data for the Polyanet.
- **Response:**
  - `message` (string): A message indicating the status of the operation. Possible messages:
    - "Polyanet updated successfully": Indicates that the Polyanet was updated successfully.
    - "Polyanet not found": Indicates that the specified Polyanet ID does not exist.
  - `polyanet` (object): Details of the updated Polyanet.

#### Delete a Polyanet by ID

- **Endpoint:** `DELETE /api/polyanets/:id`
- **Description:** Deletes a specific Polyanet based on its ID.
- **Response:**
  - `message` (string): A message indicating the status of the operation. Possible messages:
    - "Polyanet deleted successfully": Indicates that the Polyanet was deleted successfully.
    - "Polyanet not found": Indicates that the specified Polyanet ID does not exist.

#### Delete All Polyanets

- **Endpoint:** `DELETE /api/polyanets`
- **Description:** Deletes all Polyanets present in the Megaverse.
- **Response:**
  - `message` (string): A message indicating the status of the operation.
    - "All Polyanets deleted successfully": Indicates that all Polyanets were deleted successfully.

#### Update All Polyanets

- **Endpoint:** `PUT /api/polyanets/`
- **Description:** Updates the entire map of the Megaverse with new Polyanet data.
- **Request Body:**
  - `map` (array): A 2D array representing the updated map of the Megaverse.
- **Response:**
  - `message` (string): A message indicating the status of the operation. Possible messages:
    - "All Polyanets updated successfully": Indicates that all Polyanets were updated successfully.
    - "No Polyanets available": Indicates that there are no Polyanets available to update.

### Saloons

#### Create a Saloon

- **Endpoint:** `POST /api/saloons`
- **Description:** Creates a new Saloon at the specified position with the given color.
- **Request Body:**
  - `row` (number): The row position of the Saloon.
  - `column` (number): The column position of the Saloon.
  - `color` (string): The color of the Saloon (white, purple, orange, yellow, green, blue).
- **Response:**
  - `message` (string): A message indicating the status of the operation.
  - `saloon` (object): Details of the created Saloon.

### Get All Saloons

- **Endpoint:** `GET /api/saloons`
- **Description:** Retrieves all Saloons currently present in the Megaverse.
- **Response:**
  - `message` (string): A message indicating the status of the operation.
  - `saloons` (array): An array containing the details of all retrieved Saloons.

### Update a Saloon by ID

- **Endpoint:** `PUT /api/saloons/:id`
- **Description:** Updates the details of a specific Saloon based on its ID.
- **Request Body:** An object containing the updated data for the Saloon.
- **Response:**
  - `message` (string): A message indicating the status of the operation.
  - `saloon` (object): Details of the updated Saloon.

## Comeths

### Create a Cometh

- **Endpoint:** `POST /api/comeths`
- **Description:** Creates a new Cometh at the specified position with the given direction.
- **Request Body:**
  - `direction` (string): The direction of the Cometh (up, down, left, right).
- **Response:**
  - `message` (string): A message indicating the status of the operation.
  - `cometh` (object): Details of the created Cometh.

### Get All Comeths

- **Endpoint:** `GET /api/comeths`
- **Description:** Retrieves all Comeths currently present in the Megaverse.
- **Response:**
  - `message` (string): A message indicating the status of the operation.
  - `comeths` (array): An array containing the details of all retrieved Comeths.

### Update a Cometh by ID

- **Endpoint:** `PUT /api/comeths/:id`
- **Description:** Updates the details of a specific Cometh based on its ID.
- **Request Body:** An object containing the updated data for the Cometh.
- **Response:**
  - `message` (string): A message indicating the status of the operation.
  - `cometh` (object): Details of the updated Cometh.

### Get a Cometh by ID

- **Endpoint:** `GET /api/comeths/:id`
- **Description:** Retrieves the details of a specific Cometh based on its ID.
- **Response:**
  - `message` (string): A message indicating the status of the operation.
  - `cometh` (object): Details of the retrieved Cometh.