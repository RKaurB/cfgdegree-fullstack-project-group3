# Garden Buddy Backend Reference

## Overview

This document provides a quick reference for the Garden Buddy backend. It is intended to support frontend development, backend integration, and testing.

For architecture, scheduling logic, Firestore data structures, and external (Perenual) API research, see:

- `docs/scheduling-task-generation-design.md`
- `docs/perenual-api-research.md`

**Note:** This document was created during the backend integration phase of the project. Some later additions (e.g. the task management endpoints) are not included here, but are documented in the project `README`.


## Base URL

Local development:

`http://localhost:3000`


## Route Summary

| Method   | Endpoint                           | Purpose                                   |
|----------|------------------------------------|-------------------------------------------|
| POST     | `/register`                        | Create User account                       |
| POST     | `/login`                           | Authenticate User                         |
| POST     | `/signout`                         | Sign out current User                     |
| GET      | `/api/plants/search?q={name}`      | Search for plants                         |
| GET      | `/api/plants/{id}`                 | Get plant details                         |
| POST     | `/garden/AddNewPlant`              | Save plant and generate tasks             |
| GET      | `/garden/GetAllSavedPlantList`     | Get all saved plants                      |
| GET      | `/garden/GetSavedPlant/{id}`       | Get a single saved plant                  |
| DELETE   | `/garden/RemovePlantFromList/{id}` | Delete a saved plant and its linked tasks |



## Typical User flow

1. Register or login
2. Search for a plant
3. Save the plant to the Garden
4. Care tasks are generated automatically
5. View saved plants on the Garden dashboard
6. Delete a plant and remove linked tasks


## Authentication

### Register

#### Request

POST `/register`

#### JSON body

```
{
    "name": "Rachel",
    "email": "rachel@example.com",
    "password": "Password123"
}
```

#### Success response

```
{
    "status": 201,
    "message": "Account is created"
}
```

### Login

#### Request

POST `/login`

#### JSON body

```
{
    "email": "rachel@example.com",
    "password": "Password123"
}
```

#### Success response

```
{
    "status": 200,
    "name": "Rachel",
    "email": "rachel@email.com",
    "ID": "<firebase-token>",
    "UID": "<firebase-user-id>",
    "message": "Login Successfully"
}
```

### Sign out

#### Request

POST `/signout`

#### Success response

```
{
    "status": 200,
    "message": "User Sign Out Successful"
}
```


## Plant Search

Plant data is retrieved from the Perenual API through backend endpoints.

### Search Plants

#### Request

GET `/api/plants/search?q={plantName}`

#### Example

GET `/api/plants/search?q=carrot`

#### Returns

A list of matching plants from the Perenual API.


### Get Plant Details

#### Request

GET `/api/plants/{id}`

#### Example

GET `/api/plants/2320`

#### Returns

Detailed plant information, including plant type, care information, image, and description.


## Saved Plants

Saved plants are stored in Firestore `PlantSaved` collection.

### Add Plant

#### Request

POST `/garden/AddNewPlant`

#### Body

```
{
    "userId": "user1",
    "plantApiId": 2320,
    "commonName": "carrot",
    "scientificName": "Daucus carota",
    "imageURL": "image-url",
    "plantType": "Vegetable"
}
```

#### What happens?

1. Plant is saved to the Firestore `PlantSaved` collection
2. Current date is generated automatically
3. Care tasks are generated
4. Tasks are saved to the Firestore `Task` collection
5. Tasks are linked using the Firestore `PlantSaved` doc ID (`savedPlantID`)

Task generation is handled by `Backend/Services/SchedulingService.js`

### Get All Saved Plants

#### Request

GET `/garden/GetAllSavedPlantList`

#### Returns

All saved plants belonging to the current User.

### Get Single Saved Plant

#### Request

GET `/garden/GetSavedPlant/{id}`

#### Example

GET `/garden/GetSavedPlant/plant1`

#### Returns

A single saved plant belonging to the current User.

### Delete Saved Plant

#### Request

DELETE `/garden/RemovePlantFromList/{id}`

#### Example

DELETE `/garden/RemovePlantFromList/plant1`

#### What happens?

1. All linked tasks are deleted
2. The saved plant is deleted


## Firestore Collections

### PlantSaved

Stores plants added to a User's Garden.

#### Example

```
{
    "userId": "user1",
    "plantApiId": 2320,
    "commonName": "carrot",
    "scientificName": "Daucus carota",
    "plantType": "Vegetable",
    "imageURL": "image-url",
    "dateAdded": "2026-06-01"
}
```

### Task

Stores generated plant care tasks.

#### Example

```
{
    "userId": "user1",
    "savedPlantID": "savedPlant1",
    "commonName": "carrot",
    "taskName": "Check soil and water if dry",
    "frequencyDays": 1,
    "dueDate": "2026-06-02",
    "completed": false,
    "completedDate": null,
    "createdDate": "2026-06-01"
}
```

## Task Status

### Current backend support

- Generate tasks when a plant is saved
- Save tasks in Firestore, linked to saved plants
- Delete linked tasks when a plant is removed

### Not yet integrated

- Schedule page Firestore integration
- Task completion workflow
- Recurring task generation


## Frontend Integration

Frontend API helper functions are currently located in:

### Authentication

`Frontend/src/api/AuthAPI.js`

#### Functions

- `LoginAPI()`
- `RegisterAPI()`

### Saved Plants

`Frontend/src/api/SavedPlantAPI.js`

#### Functions

- `AddNewPlantToDashboard()`
- `GetSavedPlantList()`
- `GetAPlantINFO()`
- `RemovePlantFromGarden()`


## Key Backend files

| File                                    | Purpose                                              |
|-----------------------------------------|------------------------------------------------------|
| `Backend/server.js`                     | Main Express server and route registration           |
| `Backend/Routes/PlantRoutes.js`         | Plant search & details endpoints                     |
| `Backend/Routes/PlantSavedRoutes.js`    | Saved plant endpoints                                |
| `Backend/Scheme/PlantSaved.js`          | Plant save/delete logic and task generation          |
| `Backend/Scheme/Task.js`                | Task storage and task management logic               |
| `Backend/Services/SchedulingService.js` | Generates care tasks and due dates                   |
| `Backend/Database/Firebase.js`          | Firebase Authentication and Firestore helper methods |

