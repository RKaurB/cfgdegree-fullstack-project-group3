# Introducing Garden Buddy

## Project overview

*A full-stack gardening companion application built with React, Node.js, Express, and Firebase.*

Beginner gardeners often struggle to understand different plant requirements and remember plant care routines.

Garden Buddy helps users discover plants, build a personalised digital garden, and automatically generate plant care schedules. Users can search thousands of plants using the Perenual API, save favourites to their garden, and keep track of care tasks.


## Key features

- User registration and login using Firebase Authentication
- Secure protected routes
- Search for plants and view detailed plant information using the Perenual API
- Save plants to a personal digital garden
- Automatically generate care schedules based on plant type
- Track and complete plant care tasks
- Dashboard showing saved plants and garden overview
- Responsive React frontend


## Design

### Initial wireframe

The initial wireframe was created during the planning phase, to visualise the application's four main pages and overall User journey.

![Garden Buddy Wireframe](Frontend/src/assets/wireframe.png)

## Colour Palette
- 🟩 Forest Green `#3E5C34`
- 🌿 Sage Green `#8BAE78`
- 🟨 Sand Beige `#C9B99A`
- 🤍 Cream White `#FDF6EC`

![Palette](Frontend/src/assets/palette.png)


## Tech stack

### Frontend

- React
- React Router
- Redux Toolkit
- Bootstrap

### Backend

- Node.js
- Express

### Database & Authentication

- Firebase Authentication
- Cloud Firestore

### External API

- Perenual Plant API


## Project structure

```
.
├── Backend
│   ├── Auth
│   ├── Database
│   ├── Routes
│   ├── Scheme
│   ├── Services
│   ├── Tests
│   ├── server.js
│   └── package.json
├── docs
├── Frontend
│   ├── public
│   ├── src
│   │   ├── api
│   │   ├── assets
│   │   ├── components
│   │   ├── data
│   │   ├── feature
│   │   ├── pages
│   │   └── styles
│   ├── package.json
│   └── vite.config.js
├── package.json
└── README.md
```

The project is organised into separate frontend and backend folders. The `Frontend` contains the React user interface, reusable components, and API helper functions. The `Backend` contains the Express server, routes, business services, Firebase integration, and data models. The `docs` folder contains the project's planning, research, and technical documentation.

## Architecture

Garden Buddy uses a React frontend, a Node.js and Express backend, Firebase services, and the external Perenual API. The React frontend provides the user interface (including plant search, and plant/task management) and sends HTTP requests to the backend. The backend manages application logic, including plant management, API requests, and scheduling functionality. Plant data is retrieved from the Perenual API and passed through the backend before being displayed in the frontend. Firebase Authentication manages user accounts and login, while application data (including saved plants and generated care tasks) is stored in Cloud Firestore. The Scheduling Service generates plant care schedules/tasks using predefined care templates based on plant type.

![Project architecture diagram](./docs/images/architecture-diagram.png)


## Installation and Setup

### Prerequisites

Note that before running the project, you will need:

- Node.js
- npm
- A Firebase project with Authentication and Cloud Firestore enabled
- A Perenual API key
- Git

### 1. Clone the repository

`git clone https://github.com/RKaurB/cfgdegree-fullstack-project-group3.git`

`cd cfgdegree-fullstack-project-group3`

### 2. Install dependencies

#### Backend

From `/Backend`:
```
npm install
```

#### Frontend

From `/Frontend`:
```
npm install
```

### 3. Configure Firebase

Create a Firebase project and enable:

- Email/Password Authentication
- Cloud Firestore

### 4. Generate a Perenual API key

Register and generate a Perenual API key from:

https://perenual.com/docs/api


### 5. Create a `.env` file

Create a `.env` file containing the required environment variables.

#### Example (see `.env.example`)

```
# Perenual API key
PERENUAL_API_KEY=your_perenual_api_key

# Firebase API key
FIREBASE_APIKEY=your_firebase_api_key
# Firebase configuration values (obtain from Firebase Console)
FIREBASE_APPID=your_firebase_app_id
FIREBASE_MeasurementID=your_firebase_measurement_id

# LOCAL BACKEND PORT
BACKEND_PORT=3000
```

### 6. Run the application

#### Start the backend:

From `/Backend`:
```
npm start
```

#### Start the frontend

From `/Frontend`:
```
npm run dev
```

The application should now be available in your browser.

### 7. Note
To run the Backend Jest Test file, if desired:
From `/Backend`
```
npm test
```

## API endpoints

### Authentication

| **Method**   | **Endpoint**                       | **Purpose**                               |
|--------------|------------------------------------|-------------------------------------------|
| POST         | `/register`                        | Register new User account                 |
| POST         | `/login`                           | Login                                     |
| POST         | `/signout`                         | Logout                                    |

### Plants

| **Method**   | **Endpoint**                       | **Purpose**                               |
|--------------|------------------------------------|-------------------------------------------|
| GET          | `/api/plants/search?q={name}`      | Search for plants                         |
| GET          | `/api/plants/{id}`                 | Get plant details                         |

### Saved Plants

| **Method**   | **Endpoint**                       | **Purpose**                               |
|--------------|------------------------------------|-------------------------------------------|
| POST         | `/garden/AddNewPlant`              | Save plant and generate tasks             |
| GET          | `/garden/GetAllSavedPlantList`     | Get all saved plants                      |
| GET          | `/garden/GetSavedPlant/{id}`       | Get a single saved plant                  |
| DELETE       | `/garden/RemovePlantFromList/{id}` | Delete a saved plant and its linked tasks |

### Tasks

| **Method**   | **Endpoint**                       | **Purpose**                               |
|--------------|------------------------------------|-------------------------------------------|
| GET          | `/tasks/GetAllTaskList`            | Get care tasks                            |
| PUT          | `/tasks/UpdateTaskCompletion/{id}` | Mark task complete                       |


## Potential future improvements

- Recurring task generation after completion
- Push/email reminders
- Improved dashboard analytics
- Nature/gardening-related quotes (random) displayed on Dashboard
- Weather API integration


## Team and contributions

This project was completed as part of the [Code First Girls](https://codefirstgirls.com/) Full-stack Development CFGdegree.

Our team consisted of:

- [Destiny](https://github.com/Destinyoko1)
- [Hayley](https://github.com/hreed129)
- [Iman](https://github.com/Iman-Jama1)
- [Julia](https://github.com/juliavolponi)
- [Ozioma](https://github.com/Omanoma)
- [Rachel](https://github.com/RKaurB)
- [Siti](https://github.com/Ctdahlya2019)


The key responsibilities of each team member are summarised below:

- Julia created the initial project wireframe and design, established the frontend architecture, and developed the Landing page, navbar, footer, helped with authentication integration, and created shared UI components.
- Siti developed the Dashboard page, created a reusable loading component, and fixed frontend bugs.
- Hayley contributed to the task scheduling functionality, including scheduling templates, due date calculations, and testing for PlantSaved. She also helped create the initial database model (ERD) during the planning phase.
- Ozioma led the Firebase backend integration, set up Firebase Authentication and Firestore, implemented the SavedPlant and Task models, backend endpoints, authentication flow, protected routes, and plant search functionality. She also resolved integration bugs and created the system architecture diagram.
- Destiny developed the Schedule page, implemented the backend task management endpoints, connected the Schedule page to backend task data, and implemented task completion functionality.
- Iman Jamal contributed to the frontend implementation of the Search page and plant discovery interface, including modal styling, and frontend feature integration.
- Rachel implemented the Perenual API integration, plant search and plant details services, helped develop the scheduling service, and integrated the scheduling functionality into the backend. She also carried out backend and integration testing, and produced the backend design and API documentation.
